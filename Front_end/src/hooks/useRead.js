import { useState,useEffect } from "react";
let path = "/api"

// hooks are usually named exports rather than default
export default function useRead(table, entity="", initialValue = []) {
  // state variable for holding fetched json data
  console.log(`${path}/${encodeURI(table)}/${encodeURI(entity)}`)
  const [data, setData] = useState(initialValue);
  useEffect(() => {
    fetch(`${path}/${encodeURI(table)}/${encodeURI(entity)}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      setData(json);
    })
  }, []); // re-run effect if url changes
  // return the data fetched from the given
  return data;
}