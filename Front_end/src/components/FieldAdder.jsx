import readThat from '../hooks/readThat';
import Field from '../components/Field';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { addButton, browse, browseBox } from '../MUIStyles';

export function AddFieldButton (fromSkills, notIn){
    const theme = useMyThemeContext();

    const [currName,setCurrName] = useState("")
    const [adder,setAdder] = useState(<PlusButton/>)//We set the button as a state to change it to a box later

    const fullList = readThat("field")
    let fieldList = (fullList)?[]:fullList.filter((field)=>notIn.indexOf(field)==-1) //We only keep the fields that the user does not have 
    let currList = [...fieldList]

    function lighten(e){
        setCurrName(e.target.value)
        currList = fieldList.filter((field)=>field.name.startsWith(e.target.value))
    }

    function PlusButton(){
        return <Button
            onClick={()=>setAdder(<FieldFinder/>)}
            sx={{backgroundColor:"transparent", color:theme.colors[1],borderRadius:"50%", padding:0,height:"25px", width:"25px", minWidth:0, minHeight:0}}>
        +
        </Button>
    }

    function FieldFinder(){
        const bg={backgroundColor:"#214CE3"} //TODO Make into a Dialog
        return <Box height="12vh" width="20vw" sx={browseBox}>
                <Box height="100%" width="85%" sx={{display:"flex",flexDirection:"column"}}>
                    <Box height="80%" sx={{}}>
                        {currList.map((field,index)=><Button key={"AFB"+index} sx={browse}>{field.name}</Button>)}
                    </Box>
                    <TextField value={currName} onChange={lighten}></TextField>
                </Box>
                    <Button sx={{...addButton, margin:"0 1rem",...bg, whiteSpace:"nowrap", padding:"0 0.5rem", margin:"0 0.1rem", lineHeight:"1.8", borderRadius:"1rem/50%"}}>{(fromSkills)?"Add":"Change"}</Button>
                </Box>
    }
    return <>
        {adder}
    </>
}

export default function FieldAdder({canAdd,list}){
    return <>
        <Box sx={{flexWrap:"wrap"}}>
        { (!list)?"Loading":list.map((field,index)=><Field key={index} fieldInfo={field}/>)}
        {(!canAdd)?<></>:<AddFieldButton fromSkills={false} notIn={list}/>}
        </Box>

    </>
}