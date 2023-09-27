import { Box, TextField, Button, Typography } from "@mui/material";
import { title,signUpField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import createNew from "../hooks/createNew";
import * as Bcrypt from "bcryptjs";

export default function SignUp(){
    
    const theme = useMyThemeContext();

    function createUser(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        var salt = Bcrypt.genSaltSync(10);
        var hash = Bcrypt.hashSync(data.get("password"), salt);
        let newUser = {
            firstName:data.get("first"),
            lastName:data.get("last"),
            nickName:data.get("nick"),
            email:data.get("email"),
            password:hash
        };
        console.log(newUser)
        createNew('user',newUser).then((json)=>console.log(json))
    }

    return <Box component="form" onSubmit={createUser} sx={{width:"55%", height:"70%", display:"block", backgroundColor:theme.colors[3], color:theme.colors[4]}}>
            <Box sx={{display:"block", margin: "20% 0 10% 0"}}>
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
            <Box sx={{...signUpField, color:theme.colors[4]}}>
                <TextField  name="first" label="First name" variant="standard" />
            </Box>
            <Box sx={{...signUpField, color:theme.colors[4]}}>
                <TextField name="last" label="Last name" variant="standard" />
            </Box>
            <Box sx={{...signUpField, color:theme.colors[4]}}>
                <TextField name="nick" label="Pseudo" variant="standard" />
            </Box>
            <Box sx={{...signUpField, color:theme.colors[4]}}>
                <TextField name="email" label="Email address" variant="standard" type="email" />
            </Box>
            <Box sx={{...signUpField, color:theme.colors[4]}}>
                <TextField name="password" label="Password" variant="standard" type="password" />
            </Box>
            <Button type="submit" sx={{backgroundColor:theme.colors[0],color:theme.colors[1]}}>Sign up</Button>
           
        </Box>
}