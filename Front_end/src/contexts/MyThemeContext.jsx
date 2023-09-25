import React, { useState, useContext } from "react";

const MyThemeContext = React.createContext();

export const MyThemeProvider = (props) => {
  const [colors, setColors] = useState(
      [
         "#37A978" //NavButtons/clear buttons
        ,"#1B1B1B" //Dark text on clear surfaces
        ,"#623E11" //General background
        ,"#77491E" //Project background
        ,"#FFEBCD" //Clear text on dark surfaces
      ]
    );


  const updateTheme = (Theme) => {
    setColors(Theme);
  };

  return (
    <MyThemeContext.Provider value={{ colors, updateTheme }}>
      {props.children}
    </MyThemeContext.Provider>
  );
};

export const useMyThemeContext = () => {
  return useContext(MyThemeContext);
};
