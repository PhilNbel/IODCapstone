import { useState,useEffect } from "react";
let path = "http://localhost:5000/api"

// hooks are usually named exports rather than default
export default function readThat(table, entity="", initialValue = []) {

  // state variable for holding fetched json data
  const [data, setData] = useState(initialValue);
  useEffect(() => {
    fetch(`${path}/${table}s/${entity}`)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
  }, []); // re-run effect if url changes
  // return the data fetched from the given
  return data;
}