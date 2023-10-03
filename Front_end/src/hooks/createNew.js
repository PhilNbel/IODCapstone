let path = "http://localhost:5000/api"

// hooks are usually named exports rather than default
export default function createNew(table, body, initialValue = []) {
  return fetch(`${path}/${table}s/create`,{
    headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body:JSON.stringify(body)
    })
    .then((response) => response.json())
}