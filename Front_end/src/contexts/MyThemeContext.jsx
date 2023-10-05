import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";

const MyThemeContext = React.createContext();

export const defaultTheme = [
                          "#37A978" //NavButtons/clear buttons
                          ,"#1B1B1B" //Dark text on clear surfaces
                          ,"#623E11" //General background
                          ,"#77491E" //Project background
                          ,"#FFEBCD" //Clear text on dark surfaces
                        ]

export const MyThemeProvider = (props) => {
  let user = useUserContext()
  let currColors = (user.currentUser.theme)?user.currentUser.theme:defaultTheme

  const [colors, setColors] = useState(currColors);

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
