import React, { useState, useContext } from "react";

const MyThemeContext = React.createContext();

export const MyThemeProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState({});

  const handleUpdateTheme = (Theme) => {
    setCurrentTheme(Theme);
  };

  return (
    <MyThemeContext.Provider value={{ currentTheme, handleUpdateTheme }}>
      {props.children}
    </MyThemeContext.Provider>
  );
};

export const useMyThemeContext = () => {
  return useContext(MyThemeContext);
};
