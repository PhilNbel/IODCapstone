let path = "/api"

// hooks are usually named exports rather than default
export default function deleteItem(table, entity, body={}) {

  return fetch(`${path}/${table}/${entity}`,{
      headers: {
        "Content-Type": "application/json"
      },
      method: 'DELETE',
      body:JSON.stringify(body)
    })
    .then((response) => response.json())
}