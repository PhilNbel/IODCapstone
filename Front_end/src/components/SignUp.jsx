import { Box, TextField, Button, Typography } from "@mui/material";
import { title,signUpField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import createNew from "../helpers/createNew";
import * as Bcrypt from "bcryptjs";

export default function SignUp({salt}){//second half of the Sign page
    
    const theme = useMyThemeContext();

    function explain(json){//tells the user about the result of their user creation attempt
        console.log(json)
        if(json.result==200)
            alert(json.message + ", you can now log in")
        else
            alert("An error occurred when trying to create a new user")
    }
        
    function createUser(e){//creates a new user from the form information
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if(data.get("nick")=="")//we avoid creating a user with an empty username
            return
        let hash = Bcrypt.hashSync(data.get("password"), salt);
        let newUser = {//prepares the object
            firstName:data.get("first"),
            lastName:data.get("last"),
            nickName:data.get("nick"),
            email:data.get("email"),
            password:hash
        };
        createNew('user',newUser).then((json)=>explain(json))//sends it
    }

    return <Box sx={{//SignUp component
                width:"55%",
                display:"flex",
                backgroundColor:theme.colors[3],
                color:theme.colors[4],
                flexDirection:"column",
                padding: "5vh 0 10vh 0",
                borderTopRightRadius:"25px",
                borderBottomRightRadius:"25px",
                '@media screen and (max-width:900px)': {
                    width:"90%", //as the components moves on top of each other instead of next to, they change width
                    boxSizing:'content-box',
                    borderTopRightRadius:"0",
                    borderBottomLeftRadius:"25px"
        }
                }}>
            <Box sx={{display:"flex", margin: "10% 0 5% 0",position: "relative", justifyContent :"center"}}>
            {/*The Sign up title*/}

                <Typography
                            variant="h2"
                            noWrap
                            sx={{
                                position:"absolute",
                                left:"4px",
                                ...title,
                                '@media screen and (max-width:900px)': {
                                    display:"none"
                                }
                            }}
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
            {/*The form with all it's fields*/}

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
                {/*The button to send it*/}

            </Box>
        </Box>
}