import {useParams} from 'react-router-dom'
import readThat from '../hooks/readThat';
import FieldAdder from '../components/FieldAdder';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
export default function UserPage(){
    const params = useParams();
    const user = readThat("user",params.user);
    let currUser = (user.length==0)?{}:user.data;
    console.log(currUser)
    const [newMail,setNewMail] = useState(currUser.email)

    function updateMail(e){
        setNewMail(e.target.value)
    }
    return <Box sx={{display:"flex",flexDirection:"column"}}>
        <Box>
            <Typography></Typography>
            <TextField value={newMail} onChange={updateMail}></TextField>
        </Box>
        <FieldAdder canAdd={true} list={currUser.masters}/>
    </Box>
}