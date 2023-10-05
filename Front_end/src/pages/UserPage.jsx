import FieldAdder from '../components/FieldAdder';
import SkillAdder from '../components/SkillAdder';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { userField } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { useUserContext } from '../contexts/UserContext';
import { Button } from '@mui/base';
import readThat from '../hooks/useRead';
import updateData from '../helpers/updateData';
import * as Bcrypt from "bcryptjs";

function EditBox({user,handler}){//allows a user to update their information
    let salt = import.meta.env.VITE_SALT;
    let details = readThat('users',user.nickName)//set token for more info
    let currUser = (details.data)?details.data:{
        firstName:'',
        lastName:'',
        nickName:'',
        email:'',
        interests:[]
    }
    const theme = useMyThemeContext();
    const [newFirstName,setNewFirstName] = useState('')
    const [newLastName,setNewLastName] = useState('')
    const [newNickName,setNewNickName] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newMail,setNewMail] = useState('')
    const [newInterests,setNewInterests] = useState([])
    const [newMasteries,setNewMasteries] = useState([])

    //update those fields when currUser is finished loading
    useEffect(()=>{
        setNewFirstName(currUser.firstName)
        setNewLastName(currUser.lastName)
        setNewNickName(currUser.nickName)
        setNewMail((currUser.email)?currUser.email:"")
        setNewInterests(currUser.interests)
        setNewMasteries(currUser.masters)
    },[currUser])

    const [changeTheme,setChangeTheme] = useState(false)
    const [newTheme,setNewTheme] = useState(theme.colors)

    function updateUser(event){//packs the user info and updates it
        
        const data = new FormData(event.currentTarget);
        let body={
            firstName:data.get("first"),
            lastName:data.get("last"),
            nickName:data.get("nick"),
            email:data.get("mail"),
            fields:newInterests
        }
        if(changeTheme){
            body={...body,theme:newTheme}
            theme.updateTheme(newTheme)
        }else
            theme.updateTheme(currUser.theme)
        if(data.get("password")!=""){
            body={...body,password:Bcrypt.hashSync(data.get("password"), salt)}
        }
        updateData('users',user.nickName,body)
    }

    //updates one of the values of the form

    function updateValue(handler,event){
        handler(event.target.value)
    }

    function removeFromFieldList(field){
        setNewInterests(newInterests.filter((currField)=>currField.name!=field.name))
    }
    function addToFieldList(field){
        if(!newInterests.find(currField=>currField.name==field.name))
            setNewInterests([...newInterests,field])
    }
    function removeFromSkillList(skill){
        setNewMasteries(newMasteries.filter((currSkill)=>currSkill.name!=skill.name))
    }
    function addToSkillList(skill){
        if(!newMasteries.find(currSkill=>currSkill.name==skill.name))
            setNewMasteries([...newMasteries,skill])
    }

    //changes one of the newTheme colors

    function changeColor(e,i){
        let copy = [...newTheme];
        copy[i]=e.target.value;
        setNewTheme(copy)
    }

    return <Box component="form" onSubmit={(e)=>{e.preventDefault();updateUser(e);handler(false)}}>
        {/*EditBox component*/}
                
                <Box sx={{color:theme.colors[1], flexDirection:"column"}}>
                    <Button style={{width:'16vw',backgroundColor:"transparent", marginTop:"5rem"}}>
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
                        <TextField name="first" variant="standard" value={newFirstName} onChange={(e)=>updateValue(setNewFirstName,e)}></TextField>
                        <TextField name="last" variant="standard" value={newLastName} onChange={(e)=>updateValue(setNewLastName,e)}></TextField>
                    </Box>
                </Box>
                
                <Box sx={{...userField,display:"flex",flexDirection:"row", justifyContent:"flex-start",color:theme.colors[1]}}>
                    <Typography>Username: </Typography>
                    <TextField name="nick" variant="standard" value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)} sx={{color:theme.colors[4]}}></TextField>
                </Box>

                <Box sx={{...userField,display:"flex",flexDirection:"row", justifyContent:"flex-start",color:theme.colors[1]}}>
                    <Typography>Password: </Typography>
                    <TextField name="password" variant="standard" type='password' value={newPassword} onChange={(e)=>updateValue(setNewPassword,e)} sx={{color:theme.colors[4]}}></TextField>
                </Box>
                
                <Box sx={{...userField,display:"flex",flexDirection:"row", justifyContent:"flex-start",color:theme.colors[1]}}>
                    <Typography>Email: </Typography>
                    <TextField name="mail" variant="standard" value={newMail} onChange={(e)=>updateValue(setNewMail,e)} sx={{color:theme.colors[4]}}></TextField>
                </Box>

                <Box sx={{...userField,flexDirection:"column",color:theme.colors[1]}}>
                    <Typography width="100%" sx={{textAlign:"start "}}>Fields of interest: </Typography>
                    <FieldAdder canAdd={true} list={newInterests} remHandler={removeFromFieldList} addHandler={addToFieldList}/>
                </Box>
                <Box sx={{...userField,flexDirection:"column",color:theme.colors[1]}}>
                    <Typography width="100%" sx={{textAlign:"start "}}>Skills mastered: </Typography>
                    <SkillAdder canAdd={true} list={newMasteries} remHandler={removeFromSkillList} addHandler={addToSkillList}/>
                </Box>

                <Box sx={{...userField,display:"flex", flexDirection:"row"}}>
                    <Button onClick={()=>{setChangeTheme(!changeTheme);theme.updateTheme(currUser.theme)}} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit theme </Button>
                    {/*Show the colors only if we are editing the theme*/}

                    {//
                        (changeTheme)?<Box>
                            <Box padding="0 2rem">
                                <input type="color" name="primary" value={newTheme[0]} onChange={(e)=>changeColor(e,0)}/>
                                <input type="color" name="secondary" value={newTheme[1]} onChange={(e)=>changeColor(e,1)}/>
                                <input type="color" name="ternary" value={newTheme[2]} onChange={(e)=>changeColor(e,2)}/>
                                <input type="color" name="quaternary" value={newTheme[3]} onChange={(e)=>changeColor(e,3)}/>
                                <input type="color" name="quinary" value={newTheme[4]} onChange={(e)=>changeColor(e,4)}/>
                            </Box>
                            <Button onClick={()=>theme.updateTheme(newTheme)} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}>Preview</Button>
                            {/*Lets the user have a preview by changing the theme context. Is reverted if not saved*/}

                        </Box>:<></>
                    }
                </Box>
                <Box sx={userField}>
                    <Button type='submit' style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit </Button>
                </Box>
            </Box>
}

function DisplayBox({user,handler}){//displays the public user info
    const theme = useMyThemeContext();
    const userContext = useUserContext();

    return <Box sx={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        {/*DisplayBox component*/}

            <Box sx={{width:'16vw', flexDirection:"column", marginTop:"5rem",color:theme.colors[1]}}>
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
                <Box sx={{...userField,flexDirection:"column",color:theme.colors[1]}}>
                    <Typography width="100%" sx={{textAlign:"start "}}>Skills mastered: </Typography>
                    <SkillAdder canAdd={false} list={user.masters}/>
                </Box>
            </Box>
            <Box>
                {(userContext.currentUser.nickName == user.nickName)?<Button onClick={()=>handler(true)} style={{backgroundColor:theme.colors[3],color:theme.colors[4]}}> Edit </Button>:<></>}
            </Box>
        </Box>

}

export default function UserPage({user}){ //display DisplayBox. If the user is the current user,
    //display a button to switch to EditBox

    const theme = useMyThemeContext();
    const [editMode,setEditMode] = useState(false)

    return <Container sx={{ maxWidth:"90%", minHeight:'86vh', padding:'1rem', borderRadius:'35px', justifyContent:'center',display:"flex", backgroundColor:theme.colors[2]}}>
        {/*UserPage component*/}

            <Box sx={{width:"96%",display:"flex",justifyContent:"center", borderRadius:'25px',backgroundColor:theme.colors[0]}}>
                {(editMode)?<EditBox user={user} handler={setEditMode}/>:<DisplayBox user={user} handler={setEditMode}/>}
            </Box>
        </Container>
}