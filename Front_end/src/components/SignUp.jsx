import { Box, TextField, Button, Typography } from "@mui/material";
import { title,signUpField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import createNew from "../hooks/createNew";
import * as Bcrypt from "bcryptjs";

export default function SignUp({salt}){
    
    const theme = useMyThemeContext();

    function createUser(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        //var salt = Bcrypt.genSaltSync(10);
        console.log(salt)
        let hash = Bcrypt.hashSync(data.get("password"), salt);
        let newUser = {
            firstName:data.get("first"),
            lastName:data.get("last"),
            nickName:data.get("nick"),
            email:data.get("email"),
            password:hash
        };
        console.log(newUser)
        createNew('user',newUser).then((json)=>alert(JSON.stringify(json)))
    }

    return <Box sx={{width:"55%", display:"flex", backgroundColor:theme.colors[3], color:theme.colors[4],flexDirection:"column", padding: "5vh 0 10vh 0", borderTopRightRadius:"25px", borderBottomRightRadius:"25px"}}>
            <Box sx={{display:"flex", margin: "10% 0 5% 0",position: "relative", justifyContent :"center"}}>
                <Typography
                            variant="h2"
                            noWrap
                            sx={{position:"absolute",left:"4px", ...title}}
                        >
                        R
                </Typography>

                <Typography
                    variant="h2"
                    noWrap
                    sx={title}
                >
                Sign up
                </Typography>
            </Box>
            <Box component="form" onSubmit={createUser} sx={{display:"block"}}>
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
        </Box>
}