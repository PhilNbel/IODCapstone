let path = "/api"

// hooks are usually named exports rather than default
export default function updateData(table, entity, body, initialValue = []) {

    return fetch(`${path}/${table}/${entity}`,{
      headers: {
        "Content-Type": "application/json"
      },
      method: 'UPDATE',
      body:JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
}