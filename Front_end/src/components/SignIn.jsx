import { Box, TextField, Button, Typography } from "@mui/material";
import { title } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import readThat from "../hooks/readThat";
import { useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
const crypto = require('crypto');

export default function SignIn(){

    const theme = useMyThemeContext();
    const user = useUserContext();
    let username = useRef();
    let password = useRef();

    function login(){
        let mayBeUser = readThat('user',username.value);
        let hash = crypto.createHash(sha512).update(words).digest(password.value);
        let isUser = (mayBeUser.password == hash)
        if(isUser)
            user.setCurrentUser(mayBeUser);
    }

    return <Box sx={{width:"45%", height:"60%", display:"block", backgroundColor:theme.colors[0], color:theme.colors[1]}}>
        <Box sx={{display:"block", margin: "30% 0"}}>
            <Typography
                variant="h2"
                noWrap
                sx={{display:"inline",...title}}
            >
            Log in
            </Typography>
            <Typography
                        variant="h2"
                        noWrap
                        sx={{display:"inline",
                            position: "relative",
                            left:"22%"
                        }}
                    >
                    O
            </Typography>
        </Box>
        <TextField ref={username} label="Username (email if not specified)" variant="standard" type="text" />
        <TextField ref={password} label="Password" variant="standard" type="password" />
        <Button onClick={login}>Log In</Button>
    </Box>
}