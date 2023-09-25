import { useState,useEffect } from "react";
let path = "http://localhost:8080/api"

// hooks are usually named exports rather than default
export default function deleteItem(table, entity, body, initialValue = []) {

  // state variable for holding fetched json data
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    fetch(`${path}/${table}s/${entity}`,{
      headers: {
        "Content-Type": "application/json"
      },
      method: 'DELETE',
      body:JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });

  }, []); // re-run effect if url changes

  // return the data fetched from the given url
  return data;
}