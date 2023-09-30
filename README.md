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
