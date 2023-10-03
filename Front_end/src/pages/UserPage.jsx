import FieldAdder from '../components/FieldAdder';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { userField } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';

function ModifyUser({user}){
    const theme = useMyThemeContext();
    const [newFirstName,setNewFirstName] = useState(user.firstName)
    const [newLastName,setNewLastName] = useState(user.lastName)
    const [newNickName,setNewNickName] = useState(user.nickName)
    const [newMail,setNewMail] = useState((user.email)?user.email:"")

    function updateValue(handler,event){
        handler(event.target.value)
    }
    return <Box sx={{display:"flex",flexDirection:"column"}}>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <TextField value={newFirstName} onChange={(e)=>updateValue(setNewFirstName,e)}></TextField>
            <TextField value={newLastName} onChange={(e)=>updateValue(setNewLastName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Username: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Email: </Typography>
            <TextField value={newMail} onChange={(e)=>updateValue(setNewMail,e)}></TextField>
        </Box>
        <FieldAdder canAdd={true} list={user.interests}/>
    </Box>
}

export default function UserPage({user}){
    const theme = useMyThemeContext();
    console.log(user)

    return <Box sx={{display:"flex",flexDirection:"column"}}>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Username: </Typography>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Email:{(user.email)?user.email:""} </Typography>
        </Box>
        <FieldAdder canAdd={true} list={user.interests}/>
    </Box>
}