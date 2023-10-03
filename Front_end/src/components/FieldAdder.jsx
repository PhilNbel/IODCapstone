import readThat from '../hooks/readThat';
import Field from '../components/Field';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import AddDialog from './AddDialog';

export function AddFieldButton ({fromSkills, notIn}){
    const theme = useMyThemeContext();
    const [showFinder,setShowFinder] = useState(false)
    const fullList = readThat("field")
    let fieldList = (!fullList.data)?[]:fullList.data.filter((field)=>notIn.map(field=>field.name).indexOf(field.name)==-1) //We only keep the fields that the user does not have 

    return <>
        {(!showFinder)?<Button
            onClick={()=>{setShowFinder(true)}}//TODO: Change a boolean to display FieldFinder or not
            sx={{backgroundColor:"transparent", color:theme.colors[1],borderRadius:"50%", padding:0,height:"25px", width:"25px", minWidth:0, minHeight:0}}>
        +
        </Button>:<AddDialog handler={setShowFinder} fromSkills={fromSkills} fieldList={fieldList}/>}
    </>
}

export default function FieldAdder({canAdd = false,list=[]}){
    return <>
        <Box sx={{flexWrap:"wrap"}}>
        { (!list)?"Loading":list.map((field,index)=><Field key={index} fieldInfo={field}/>)}
        {(!canAdd)?<></>:<AddFieldButton fromSkills={false} notIn={list}/>}
        </Box>

    </>
}