import React, { useState, useContext } from "react";
import { useCookies } from 'react-cookie'

const UserContext = React.createContext();

export const UserProvider = (props) => {//provides a user context

  const [cookies, setCookie, removeCookie] = useCookies(['user']); // get cookies and helper functions. empty array is dependencies
  const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {}); // default user object, read from cookies if possible
  //gets the current user from cookies if there exists some, creates an empty user otherwise 

  const handleUpdateUser = (user) => {
    if (user.nickName) {//as the user is initialized as an empty object,
      //it exists so we need to check if it has a property instead of checking it's existence
    
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
