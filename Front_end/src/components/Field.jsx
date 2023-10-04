import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Box } from "@mui/material";
import { useMyThemeContext } from '../contexts/MyThemeContext';

export default function Field({fieldInfo}){
    const theme = useMyThemeContext();
    function randomColor(){
        let red = Math.floor(Math.random()*256).toString(16)
        let green = Math.floor(Math.random()*256).toString(16)
        let blue = Math.floor(Math.random()*256).toString(16)
        if(red.length==1)
            red="0"+red
        if(green.length==1)
            green="0"+green
        if(blue.length==1)
            blue="0"+blue
        return "#"+red+green+blue
    }

    let bg = (fieldInfo.color)?{backgroundColor:fieldInfo.color}:{backgroundColor:randomColor()};

    const fieldText = (<Box sx={{...bg, whiteSpace:"nowrap", padding:"0 0.5rem", margin:"0 0.1rem", lineHeight:"1.8", borderRadius:"1rem/50%",color:theme.colors[1]}}>
                {fieldInfo.name}
            </Box>)

    return (<Box>
            <Tooltip
                title={
                    <React.Fragment>
                        {fieldInfo.description}
                    </React.Fragment>
                }
            >
                {fieldText}
            </Tooltip>
        </Box>)           
}