import FieldAdder from '../components/FieldAdder';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { userField } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { useUserContext } from '../contexts/UserContext';
import { Button } from '@mui/base';
import readThat from '../hooks/useRead';
import updateData from '../helpers/updateData';

function EditBox({user,handler}){
    let details = readThat('users',user.nickName)//set token for more info
    let newUser = (details.data)?details.data:{firstName:"test"}
    console.log(newUser)
    const theme = useMyThemeContext();
    const [newFirstName,setNewFirstName] = useState('')
    const [newLastName,setNewLastName] = useState('')
    const [newNickName,setNewNickName] = useState('')
    const [newMail,setNewMail] = useState('')
    const [newInterests,setNewInterests] = useState([])
    useEffect(()=>{
        setNewFirstName(newUser.firstName)
        setNewLastName(newUser.lastName)
        setNewNickName(newUser.nickName)
        setNewMail((newUser.email)?newUser.email:"")
        setNewInterests(newUser.interests)
    },[newUser])
    const [changeTheme,setChangeTheme] = useState(false)
    const [newTheme,setNewTheme] = useState(theme)

    function updateUser(){
        updateData('users',user.nickName,body)
    }

    function updateValue(handler,event){
        handler(event.target.value)
    }

    function removeFromList(field){
        setNewInterests(newInterests.filter((currField)=>currField.name!=field.name))
    }
    function addToList(field){
        if(!newInterests.find(currField=>currField.name==field.name))
            setNewInterests([...newInterests,field])
    }

    return <Box sx={{display:"flex",flexDirection:"column", justifyContent:'center'}}>
        
        <Box sx={{color:theme.colors[1], flexDirection:"column"}}>
            <Button style={{width:'16vw',backgroundColor:"transparent"}}>
                {(user.image)?<Avatar alt={user.nickName} src={user.image} sx={{
                    height:"auto",
                    width:'100%',
                    aspectRatio :"1 / 1"
                }}/>:<Avatar sx={{
                    height:"auto",
                    width:'100%',
                    aspectRatio :"1 / 1", backgroundColor:user.color}}>{user.nickName.toUpperCase().charAt(0)}</Avatar>}
            </Button>
            <Box sx={userField}>
                <TextField variant="standard" value={newFirstName} onChange={(e)=>updateValue(setNewFirstName,e)}></TextField>
                <TextField variant="standard" value={newLastName} onChange={(e)=>updateValue(setNewLastName,e)}></TextField>
            </Box>
        </Box>
        
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Username: </Typography>
            <TextField variant="standard" value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Email: </Typography>
            <TextField variant="standard" value={newMail} onChange={(e)=>updateValue(setNewMail,e)}></TextField>
        </Box>

        <Box sx={{...userField,flexDirection:"column",color:theme.colors[1]}}>
            <Typography width="100%" sx={{textAlign:"start "}}>Fields of interest: </Typography>
            <FieldAdder canAdd={true} list={newInterests} remHandler={removeFromList} addHandler={addToList}/>
        </Box>

        <Box> <Button onClick={()=>setChangeTheme(!changeTheme)} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit theme </Button>
            {
                (changeTheme)?<Box>
                    <input type="color" name="primary"/>
                    <input type="color" name="secondary"/>
                    <input type="color" name="ternary"/>
                    <input type="color" name="quaternary"/>
                    <input type="color" name="quinary"/>
                </Box>:<></>
            }
        </Box>
        <Button onClick={()=>handler(false)} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit </Button>
    </Box>
}

function DisplayBox({user,handler}){
    const theme = useMyThemeContext();
    const userContext = useUserContext();
    console.log(theme)

    return <Box sx={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{width:'16vw', flexDirection:"column", margin:"2rem",color:theme.colors[1]}}>
            {(user.image)?<Avatar alt={user.nickName} src={user.image} sx={{
                height:"auto",
                width:'100%',
                aspectRatio :"1 / 1"
            }}/>:<Avatar sx={{
                height:"auto",
                width:'100%',
                aspectRatio :"1 / 1", backgroundColor:user.color}}>{user.nickName.toUpperCase().charAt(0)}</Avatar>}
            <Typography> {user.nickName} </Typography>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{...userField,color:theme.colors[1]}}>
                <Typography>Email:{(user.email)?user.email:""} </Typography>
            </Box>
            <Box sx={{...userField,flexDirection:"column",color:theme.colors[1]}}>
                <Typography width="100%" sx={{textAlign:"start "}}>Fields of interest: </Typography>
                <FieldAdder canAdd={false} list={user.interests}/>
            </Box>
        </Box>
        <Box>
            {(userContext.currentUser.nickName == user.nickName)?<Button onClick={()=>handler(true)} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit </Button>:<></>}
        </Box>
    </Box>

}

export default function UserPage({user}){
    const theme = useMyThemeContext();
    console.log(user)
    const [editMode,setEditMode] = useState(false)

    return <Container sx={{ maxWidth:"90%", minHeight:'86vh', padding:'3rem', borderRadius:'35px', justifyContent:'center',display:"flex", backgroundColor:theme.colors[0]}}>
        {(editMode)?<EditBox user={user} handler={setEditMode}/>:<DisplayBox user={user} handler={setEditMode}/>}
    </Container>
}