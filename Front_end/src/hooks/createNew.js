import { useState,useEffect } from "react";
let path = "http://localhost:8080/api"

// hooks are usually named exports rather than default
export default function createNew(table, body, initialValue = []) {

  // state variable for holding fetched json data
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    let ignore = false;
    fetch(`${path}/${table}s/create`,{
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body:JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });

    // cleanup function, in case url changes before complete
    return () => {
    ignore = true;
    };
  }, []); // re-run effect if url changes

  // return the data fetched from the given url
  return data;
}