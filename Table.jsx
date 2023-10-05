import React from "react";
import Pagination from "./Pagination";
import Button from "./Button";

// const styleFetchMorph = ({ style }) => {
//     return <>{style === "list" ? <></> : <></>}</>;
// };

// const hasRelationShip = (relationship = "BELONGS_TO") => {
//     return <></>;
// };

const TableData = ({ columns, rowData }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {columns.map((column, index) => (
                <td className="px-6 py-4 text-center" key={index}>
                    {/* Has own relationship ? like Belonsto */}
                    {column.relationship ? (
                        // fetct array on object
                        <ul>
                            {column.relationship.related === "HAS_MANY" ? (
                                <>
                                    {rowData[column.key].map(
                                        (value, indexValue) => (
                                            <li>
                                                {column.relationship.targetKeys.map(
                                                    (key, keyIndex) =>
                                                        column.relationship
                                                            .formatValue ? (
                                                            <span
                                                                key={keyIndex}
                                                            >
                                                                {column.relationship.formatValue(
                                                                    value[key]
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <span
                                                                key={keyIndex}
                                                            >
                                                                {value[key]}
                                                            </span>
                                                        )
                                                )}
                                            </li>
                                        )
                                    )}
                                </>
                            ) : // TODO: Handle MorphTO
                            column.relationship.related === "MORPH_TO" ? (
                                <>{console.log(rowData[column.key])}</>
                            ) : (
                                <></>
                            )}
                        </ul>
                    ) : // BelongsTo
                    column.key.includes(".") ? (
                        column.key
                            .split(".")
                            .reduce((acc, curr) => acc && acc[curr], rowData)
                    ) : // No Has Relationship
                    column.formatValue ? (
                        <span key={index}>{rowData[column.key]}</span>
                    ) : (
                        <span key={index}>{rowData[column.key]}</span>
                    )}
                </td>
            ))}
        </tr>
    );
};

/**
 *
 * @param {columns} <ArrayObject></ArrayObject>
 * {header: String, key: String}
 * @param {rowData} <PayLoad></PayLoad>
 * any
 * @param {actions} <Button></Button>
 * rendering content
 * @returns
 */

const Table = ({ columns, rowData, actions, onSearch }) => {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    const columnsWithNumbering = [{ header: "#", key: "_number" }, ...columns];

    const dataWithNumbering = rowData.map((value, index) => {
        let modifiedActions = actions;

        if (modifiedActions) {
            modifiedActions = React.cloneElement(actions, {
                // check when children is has 1 => then is not array
                children: Array.isArray(actions.props.children)
                    ? actions.props.children.map((child, i) => {
                          if (child.props.isLink !== undefined) {
                              let originalHref = child.props.href;
                              // href to arrays
                              let regexHref = originalHref.match(/\/[^/]+/g);

                              // found href string {value.payload} and replace find with data
                              let newHref = regexHref.map((item) => {
                                  return item.replace(
                                      /{([^}]+)}/g,
                                      (match, captureGroup) => {
                                          // Found the data
                                          
                                          let payload = captureGroup
                                              .split(".")
                                              .reduce(
                                                  (obj, key) => obj && obj[key],
                                                  value
                                              );

                                          return payload !== undefined
                                              ? payload
                                              : match;
                                      }
                                  );
                              });

                              const { isLink, href, ...newAttribute } =
                                  child.props;

                              return (
                                  <Button
                                      key={i}
                                      isLink={true}
                                      href={newHref.reduce(
                                          (accumulator, currentValue) => {
                                              return accumulator + currentValue;
                                          },
                                          ""
                                      )}
                                      {...newAttribute}
                                  >
                                      {child.props.children}
                                  </Button>
                              );
                          }

                        //   an action has a event handler
                          if (
                              child.props.dataValue !== undefined &&
                              child.props.onClick !== undefined
                          ) {
                        
                            let result = ""
                            //   is data value contain (.)
                            if(child.props.dataValue.includes('.')) {
                                let keys = child.props.dataValue.split('.');
                                result =  keys[0];
                                for (let inIndex = 1; inIndex < keys.length; inIndex++) {
                                    result += value + '[' + keys[inIndex] + ']'; 
                                }
                            }else {
                                
                                result = value[child.props.dataValue];

                            }

                            const { dataValue, ...newAttribute } =
                            child.props;

                            return (
                                <Button
                                    dataValue={result}
                                    {...newAttribute}
                                >
                                    {child.props.children}
                                </Button>
                            )
                          }

                          return child;
                      })
                    : React.Children.map(
                          actions.props.children,
                          (child, key) => {
                              if (typeof child === "object" && child !== null) {
                                  if (
                                      child.props &&
                                      child.props.isLink !== undefined
                                  ) {
                                      let originalHref = child.props.href;
                                      // href to arrays
                                      let regexHref =
                                          originalHref.match(/\/[^/]+/g);

                                      // found href string {value.payload} and replace find with data
                                      let newHref = regexHref.map((item) => {
                                          return item.replace(
                                              /{([^}]+)}/g,
                                              (match, captureGroup) => {
                                                  // Found the data
                                                  let payload = captureGroup
                                                      .split(".")
                                                      .reduce(
                                                          (obj, key) =>
                                                              obj && obj[key],
                                                          value
                                                      );

                                                  return payload !== undefined
                                                      ? payload
                                                      : match;
                                              }
                                          );
                                      });
                                      const { isLink, href, ...newAttribute } =
                                          child.props;

                                      return (
                                          <Button
                                              key={key}
                                              isLink={true}
                                              href={newHref.reduce(
                                                  (
                                                      accumulator,
                                                      currentValue
                                                  ) => {
                                                      return (
                                                          accumulator +
                                                          currentValue
                                                      );
                                                  },
                                                  ""
                                              )}
                                              {...newAttribute}
                                          >
                                              {child.props.children}
                                          </Button>
                                      );
                                  }
                              }
                              return child;
                          }
                      ),
            });
        }

        return {
            ...value,
            _number: index + 1,
            ...((value.actions !== false) | (value.actions == undefined) && {
                actions: modifiedActions,
            }),
        };
    });

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {onSearch && (
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
                        <label for="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for users"
                                onChange={(e) => handleSearchChange(e)}
                            />
                        </div>
                    </div>
                )}

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columnsWithNumbering.map((column, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center"
                                    key={index}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataWithNumbering.map((rowData, index) => (
                            <TableData
                                key={index}
                                columns={columnsWithNumbering}
                                rowData={rowData}
                                actions={actions}
                            ></TableData>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end py-4 px-2">
                    <Pagination></Pagination>
                </div>
            </div>
        </>
    );
};

export default Table;
