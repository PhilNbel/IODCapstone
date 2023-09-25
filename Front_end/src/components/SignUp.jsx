import { Box, TextField, Button, Typography } from "@mui/material";
import { title } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import { useRef } from "react";
import createNew from "../hooks/createNew";

export default function SignUp(){
    
    const theme = useMyThemeContext();

    const first = useRef();
    const last = useRef();
    const email = useRef();
    const password = useRef();

    function createUser(){
        let newUser = {
            firstName:first.value,
            lastName:last.value,
            email:email.value,
            password:password.value
        };
        createNew('user',newUser).then((result)=>result.json()).then((json)=>console.log(json))
    }

    return <Box sx={{width:"45%", height:"60%", display:"block", backgroundColor:theme.colors[3], color:theme.colors[4]}}>
            <Box sx={{display:"block", margin: "30% 0"}}>
                <Typography
                            variant="h2"
                            noWrap
                            sx={{
                                display:"inline",
                                position: "relative",
                                right:"19%"
                            }}
                        >
                        R
                </Typography>

                <Typography
                    variant="h2"
                    noWrap
                    sx={{display:"inline", ...title}}
                >
                Sign up
                </Typography>
            </Box>
            <Box sx={{display:"block"}}>
                <TextField ref={first} label="Standard" variant="standard" />
                <TextField ref={last} label="Standard" variant="standard" />
                <TextField ref={email} label="Standard" variant="standard" type="email" />
                <TextField ref={password} label="Standard" variant="standard" type="password" />
                <Button onClick={createUser}>Log In</Button>
            </Box>
        </Box>
}