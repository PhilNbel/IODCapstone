import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Box } from "@mui/material";
import Field from './Field';

export default function Skill({skillInfo}){//similar to Field. Check Field for more info
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

    let bg = (skillInfo.field.color)?{backgroundColor:skillInfo.color}:{backgroundColor:randomColor()};

    const skillText = (<Box sx={{...bg, whiteSpace:"nowrap", padding:"0 0.5rem", margin:"0 0.1rem", lineHeight:"1.8", borderRadius:"1rem/50%"}}>
                {skillInfo.name}
            </Box>)

    return (<Box>{/*Skill component*/}
            <Tooltip
                title={
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                        <Box sx={{color:"black"}}>
                        {/*Tells the field name too to ease comprehension*/}
                        {/*TO NOTE: multiple skills may have the same name if their field differ*/}

                            <Field fieldInfo={skillInfo.field}/>
                            {">"}
                            {skillText}
                        </Box>
                        {skillInfo.description}
                    </Box>
                }
            >
                {skillText}
            </Tooltip>
        </Box>)           
}