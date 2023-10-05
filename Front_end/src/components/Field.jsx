import * as React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Box } from "@mui/material";
import { useMyThemeContext } from '../contexts/MyThemeContext';

export default function Field({fieldInfo}){
    //Oblong component with a name, a color and a tooltip
    
    const theme = useMyThemeContext();

    function randomColor(){//shouldn't be called
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
    //defines the background color as random by default to avoid rendering errors

    const fieldText = (<Box sx={{...bg, whiteSpace:"nowrap", padding:"0 0.5rem", margin:"0 0.1rem", lineHeight:"1.8", borderRadius:"1rem/50%",color:theme.colors[1]}}>
                {fieldInfo.name}
            </Box>)//displayed element
            

    return (<Box>{/*Field component*/}
            <Tooltip
                title={
                    <Box>
                        {fieldText}
                        {fieldInfo.description}
                    </Box>
                }
            >{/*element description*/}

                {fieldText}
            </Tooltip>
        </Box>)           
}