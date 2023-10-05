# TailwindReactDataTable
This component still being development, and surely has an issue. open contribution for free developer :")

#issue 
- Pagination Has not completed yet
- Searching data manualy define on parent function
- Actions Cant handle Event Listener yet

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

#More Options
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

>Handle BelongsTo RelationShip
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


