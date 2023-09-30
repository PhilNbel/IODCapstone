import { Box, TextField, Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { title, logInField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import { useUserContext } from "../contexts/UserContext";
import * as Bcrypt from "bcryptjs";

export default function SignIn({salt}){

    const theme = useMyThemeContext();
    const user = useUserContext();
    const navigate = useNavigate();
    async function login(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        fetch('http://localhost:8080/api/users/'+data.get("username"))
            .then((result)=>result.json())
            .then((mayBeUser)=>{
                if(mayBeUser.result == 500)
                    alert("Username does not exist")
                else
                    mayBeUser = mayBeUser.data
                let hash = Bcrypt.hashSync(data.get("password"), salt);
                
                let isUser = (mayBeUser.password == hash)
                if(isUser){
                    user.handleUpdateUser(mayBeUser);
                    navigate("/")
                }else{
                    alert("Username and password do not match")
                }
            }).catch((err)=>console.log(err.message))
    }

    return <Box sx={{
        width:"55%",
        display:"flex",
        backgroundColor:theme.colors[0],
        color:theme.colors[1],
        flexDirection:"column",
        padding: "5vh 0 10vh 0",
        borderTopLeftRadius:"25px",
        borderBottomLeftRadius:"25px",
        '@media screen and (max-width:768px)': {
            borderTopLeftRadius:"25px",
            borderBottomLeftRadius:"25px",
        }
    }}>
        <Box sx={{
            display:"flex",
            margin: "10% 0 20% 0",
            position:"relative",
            justifyContent :"center"
            }}>
            <Typography
                variant="h2"
                noWrap
                sx={title}
            >
            Log in
            </Typography>
            <Typography
                        variant="h2"
                        noWrap
                        sx={{
                            position:"absolute",
                            right:0,
                            ...title
                        }}
                    >
                    O
            </Typography>
        </Box>
        <Box component="form" onSubmit={login} sx={{display:"block"}}>
            <Box sx={{...logInField, color:theme.colors[1]}}>
                <TextField name="username" label="Username ([first name]-[last name] by default)" variant="standard" type="text" />
            </Box>
            <Box sx={{...logInField, color:theme.colors[1]}}>
                <TextField name="password" label="Password" variant="standard" type="password" />
            </Box>
            <Button type="submit">Log In</Button>
        </Box>
    </Box>
}