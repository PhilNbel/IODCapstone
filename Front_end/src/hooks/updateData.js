import { useState,useEffect } from "react";
let path = "http://localhost:5000/api"

// hooks are usually named exports rather than default
export default function updateData(table, entity, body, initialValue = []) {

    return fetch(`${path}/${table}s/${entity}`,{
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