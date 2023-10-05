import { useState,useEffect } from "react";
let path = "/api"

export default function useRead(table, entity="", initialValue = []) {

  const [data, setData] = useState(initialValue);

  useEffect(() => {
    fetch(`${path}/${encodeURI(table)}/${encodeURI(entity)}`)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
  }, []); 
  return data;
}