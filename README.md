# TailwindReactDataTable
I created this repo because at that time I couldn't find a React datatable that supported Tailwind
Fell free to use this component, don't forget to start the

# Feature
- Searching data
- Pagination 
- Actions with event handler
- Using Tailwind For Styling, Fell Free To Custom Style
- RelationShip OneToOne
- RelationShip HasMany

# How to use 
>Define Column
>
`const columns = [
        { header: "Phone", key: "user" }
    ];`
>Define Actions
>
   `const actions = ( <><button className="w-6 h-6">click me</button></>);`

>Call Table
>
`<Table actions="actions" columns="columns" rowData="yourPayloads"></Table>`

# More Options
>Handle HasMany RelationShip
>
`const columns = [
{ 
                        header: "Comment", 
                        key: "comments",
                        relationship: {
                                related: 'HAS_MANY',
                                targetKeys: ['comment']
                        }
                }
        ];`

>Handle OneToOne RelationShip
>
`const columns = [
{ 
                        header: "Product", 
                        key: "product.image"
                }
        ];`
>Handle FormatValue Relationship
>
`relationship: {
                formatValue: (value) => {
                    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
                }
            }`

> Give A Route on Your action links
>
`const actions = ( <><button className="w-6 h-6" isLink={true} href="/invoice/{yourPayload.key}/detail">click me</button></>);`

> Give Event On Action Table
>1. define attribute dataValue & onClick
>   
`const actions = ( <><button className="w-6 h-6" dataValue="yourKeysTableField" onClick={(e) => handleDataValue(e)}>click me</button></>);`
>3. define function
>   
`const handleDataValue = (e) => {
    console.log(e.target.getAttribute('data-value'));
}`

> Define pagination itemsPerPage
>
> `<Table itemsPerPage={10}></Table>`


