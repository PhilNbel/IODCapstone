import { Box, TextField, Button, Typography } from "@mui/material";
import { title, logInField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import { useUserContext } from "../contexts/UserContext";
import * as Bcrypt from "bcryptjs";

export default function SignIn(){

    const theme = useMyThemeContext();
    const user = useUserContext();
    async function login(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('http://localhost:8080/api/users/'+data.get("username"))
        fetch('http://localhost:8080/api/users/'+data.get("username"))
            .then((result)=>result.json())
            .then((mayBeUser)=>{
                console.log(mayBeUser)
                
                var salt = Bcrypt.genSaltSync(10);
                var hash = Bcrypt.hashSync(data.get("password"), salt);
                
                let isUser = (mayBeUser.password == hash)
                if(isUser)
                    user.setCurrentUser(mayBeUser);
            }).catch((err)=>console.log(err.message))
    }

    return <Box component="form" onSubmit={login} sx={{width:"55%", height:"70%", display:"flex", backgroundColor:theme.colors[0], color:theme.colors[1]}}>
        <Box sx={{display:"flex", margin: "20% 0"}}>
            <Typography
                variant="h2"
                noWrap
                sx={{alignContent:"center",...title}}
            >
            Log in
            </Typography>
            <Typography
                        variant="h2"
                        noWrap
                        sx={{
                            alignContent:"right",
                            ...title
                        }}
                    >
                    O
            </Typography>
        </Box>
        <Box sx={{display:"block"}}>
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