import React, { useState, useContext } from "react";
import { useCookies } from 'react-cookie' // first do 'npm install react-cookie', see https://www.npmjs.com/package/react-cookie

const UserContext = React.createContext();

export const UserProvider = (props) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']); // get cookies and helper functions. empty array is dependencies

  // const localStorageUser = JSON.parse(localStorage.getItem('user')); // alternative to cookies using localStorage

  // store the current user in state at the top level
  const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {}); // default user object, read from cookies if possible
  
  const handleUpdateUser = (user) => {
    if (user.nickName) {
        setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 * 3})
    } else {
        removeCookie('user')
    }        
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
