import readThat from '../hooks/readThat';
import Field from '../components/Field';
import { Button } from '@mui/material';
import { useState } from 'react';


export function AddFieldButton (){

    const [adder,setAdder] = useState(PlusButton)

    let FieldFinder = <></>

    const PlusButton = <Button onClick={setAdder(FieldFinder)} sx={{backgroundColor:"transparent",color}}>
        +
        </Button>

    FieldFinder = <Box>
        {fieldList.map((field,index)=><Field key={index} fieldInfo={field}/>)}
    </Box>

    return <>
        {adder}
    </>
}

export default function FieldAdder({canAdd}){
    const fieldList = readThat('field').data
    console.log(fieldList)
    return <>
        {(!fieldList)?"Loading":<Field fieldInfo={fieldList[0]}/>/*fieldList.map((field,index)=><Field key={index} fieldInfo={field}/>)*/}
    </>
}