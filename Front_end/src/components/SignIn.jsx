import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { title, logInField } from '../MUIStyles';
import { useMyThemeContext } from "../contexts/MyThemeContext";
import { useUserContext } from "../contexts/UserContext";
import * as Bcrypt from "bcryptjs";

export default function SignIn({salt}){//first half of the Sign page

    const theme = useMyThemeContext();
    const user = useUserContext();
    const navigate = useNavigate();

    async function login(e){//compares form information and database information
        //changes the user,theme and cookies(through user) if they correspond

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        fetch('/api/users/'+data.get("username"))
            .then((result)=>result.json())
            .then((mayBeUser)=>{
                if(mayBeUser.result == 500)//checks if the user exists or not
                    alert("Username does not exist")
                else
                    mayBeUser = mayBeUser.data

                let hash = Bcrypt.hashSync(data.get("password"), salt);
                let isUser = (mayBeUser.password == hash)
                //compares the database hash and the hashed password
                //As salt is stored in the .env, they correspond if the password is the same

                if(isUser){
                    //if they are the same, the user logs in successfully
                    user.handleUpdateUser(mayBeUser);
                    navigate("/")
                    window.location.reload();
                }else{
                    //otherwise, we warn the user
                    alert("Username and password do not match")
                }
            })
            .catch((err)=>alert(err.message))//should not happen
    }

    return <Box sx={{//SignIn component
            width:"55%",
            display:"flex",
            backgroundColor:theme.colors[0],
            color:theme.colors[1],
            flexDirection:"column",
            padding: "5vh 0 10vh 0",
            borderTopLeftRadius:"25px",
            borderBottomLeftRadius:"25px",
            '@media screen and (max-width:900px)': {
                boxSizing:'content-box',
                width:"90%", //as the components moves on top of each other instead of next to, they change width
                borderTopLeftRadius:"25px",
                borderTopRightRadius:"25px",
                borderBottomLeftRadius:"0"
            }
        }}>
            <Box sx={{
                display:"flex",
                margin: "10% 0 20% 0",
                position:"relative",
                justifyContent :"center"
                }}>
            {/*The Log in title*/}

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
                                right:"0",
                                ...title,
                                '@media screen and (max-width:900px)': {
                                    display:"none"
                                }
                            }}
                        >
                        O
                </Typography>
            </Box>
            <Box component="form" onSubmit={login} sx={{display:"block"}}>
            {/*The form to log in*/}

                <Box sx={{...logInField, color:theme.colors[1]}}>
                    <TextField name="username" label="Username ([first name]-[last name] by default)" variant="standard" type="text" />
                </Box>
                <Box sx={{...logInField, color:theme.colors[1]}}>
                    <TextField name="password" label="Password" variant="standard" type="password" />
                </Box>
                <Button type="submit">Log In</Button>
                {/*The button to log in*/}

            </Box>
        </Box>
}