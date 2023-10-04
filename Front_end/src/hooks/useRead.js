import { useState,useEffect } from "react";
let path = "/api"

// hooks are usually named exports rather than default
export default function useRead(table, entity="", initialValue = []) {
  // state variable for holding fetched json data
  const [data, setData] = useState(initialValue);

  console.log('fetching '+table)
  useEffect(() => {
    console.log(`${path}/${encodeURI(table)}/${encodeURI(entity)}`)

    fetch(`${path}/${encodeURI(table)}/${encodeURI(entity)}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      setData(json);
    })
  }, []); 
  // return the data fetched from the given path
  return data;
}