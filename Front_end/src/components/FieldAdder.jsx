import readThat from '../hooks/useRead';
import Field from '../components/Field';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import AddDialog from './AddDialog';

export function AddFieldButton ({fromSkills, notIn=[], handler}){
    //displays a button to add more fields or a dialog if clicked

    const theme = useMyThemeContext();
    const [showFinder,setShowFinder] = useState(false)
    const fullList = readThat("fields")
    let fieldList = (!fullList.data)?[]:fullList.data.filter((field)=>notIn.map(field=>field.name).indexOf(field.name)==-1) //We only keep the fields that the user does not have 

    return <>{/*AddFieldButton component*/}
        {(!showFinder)?<Button
            onClick={()=>{setShowFinder(true)}}//TODO: Change a boolean to display FieldFinder or not
            style={{backgroundColor:"transparent", color:theme.colors[1],borderRadius:"50%", padding:0,height:"25px", width:"25px", minWidth:0, minHeight:0}}>
        +
        </Button>:<AddDialog displayHandler={setShowFinder} addHandler={handler} fromSkills={fromSkills} fieldList={fieldList}/>}
    </>
}

export default function FieldAdder({canAdd = false,list=[],remHandler,addHandler}){
    //returns a list of Field components and if canAdd is true, add an AddFieldButton
    return (//FieldAdder component
        <Box sx={{flexWrap:"wrap",color:"black"}}>
            { (!list)?
                "Loading"
                :
                list.sort((field1,field2)=>(field1.name>field2.name)?1:-1)
                .map((field,index)=>
                        {return (canAdd)?
                            <Button key={index} onClick={()=>{remHandler(field)}}>
                            {/*if the list can be modified, we can remove fields by clicking them*/}

                                <Field fieldInfo={field}/>
                            </Button>
                            :
                            <Field key={index} fieldInfo={field}/>
                        }
                    )}
            {(!canAdd)?<></>:<AddFieldButton fromSkills={false} notIn={list} handler={addHandler}/>}
        </Box>
    )
}