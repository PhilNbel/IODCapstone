import readThat from '../hooks/useRead';
import Field from '../components/Field';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import AddDialog from './AddDialog';

export function AddFieldButton ({fromSkills, notIn, handler}){
    const theme = useMyThemeContext();
    const [showFinder,setShowFinder] = useState(false)
    const fullList = readThat("fields")
    let fieldList = (!fullList.data)?[]:fullList.data.filter((field)=>notIn.map(field=>field.name).indexOf(field.name)==-1) //We only keep the fields that the user does not have 

    return <>
        {(!showFinder)?<Button
            onClick={()=>{setShowFinder(true)}}//TODO: Change a boolean to display FieldFinder or not
            style={{backgroundColor:"transparent", color:theme.colors[1],borderRadius:"50%", padding:0,height:"25px", width:"25px", minWidth:0, minHeight:0}}>
        +
        </Button>:<AddDialog displayHandler={setShowFinder} addHandler={handler} fromSkills={fromSkills} fieldList={fieldList}/>}
    </>
}

export default function FieldAdder({canAdd = false,list=[],remHandler,addHandler}){
    return <>
        <Box sx={{flexWrap:"wrap"}}>
        { (!list)?
            "Loading"
            :
            list.sort((field1,field2)=>field1.name>field2.name)
            .map((field,index)=><Button key={index} onClick={()=>{remHandler(field)}}><Field fieldInfo={field}/></Button>)}
        {(!canAdd)?<></>:<AddFieldButton fromSkills={false} notIn={list} handler={addHandler}/>}
        </Box>

    </>
}