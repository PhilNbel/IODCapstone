import { Box, TextField, Button, Typography } from "@mui/material";
import { homeLogo1,homeLogo2 } from '../MUIStyles';

export default function SignUp(){
    function createUser(){

    }

    return <Box sx={{width:"45%", height:"60%", display:"block", backgroundColor:"#37A978", color:"#1B1B1B"}}>
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
                sx={{display:"inline", ...homeLogo1}}
            >
            Sign up
            </Typography>
        </Box>
        <TextField id="first" label="Standard" variant="standard" />
        <TextField id="last" label="Standard" variant="standard" />
        <TextField id="new-email" label="Standard" variant="standard" type="email" />
        <TextField id="new-password" label="Standard" variant="standard" type="password" />
        <Button onClick={createUser}>Log In</Button>
    </Box>
}