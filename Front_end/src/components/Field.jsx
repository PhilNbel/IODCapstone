import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { fieldStyle } from "../MUIStyles"
import { Box } from "@mui/material";

export default function Field({fieldInfo}){
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
        
    let Detail = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }));

    let bg = (fieldInfo.color)?{backgroundColor:fieldInfo.color}:{backgroundColor:randomColor()};

    const FieldText = <>
            <Box sx={{...fieldStyle, ...bg, right:"5px"}}/>
            <Box sx={{...bg, whiteSpace:"nowrap", margin:"0 1rem", zIndex:3}}>
                {fieldInfo.name}
            </Box>
            <Box sx={{...fieldStyle, ...bg, left:"5px"}}/>
        </>

    return <Box>
            <Detail
                title={
                    <React.Fragment>
                        {fieldInfo.detail}
                    </React.Fragment>
                }
                sx={{position:"relative"}}
            >
                <FieldText/>
            </Detail>
        </Box>           
}