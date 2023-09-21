import { Box, TextField, Button, Typography } from "@mui/material";
import { homeLogo1,homeLogo2 } from '../MUIStyles';

export default function SignIn(){
    function login(){

    }

    return <Box sx={{width:"45%", height:"60%", display:"block", backgroundColor:"#623E11", color:"#FFEBCD"}}>
        <Box sx={{display:"block", margin: "30% 0"}}>
            <Typography
                variant="h2"
                noWrap
                sx={{display:"inline",...homeLogo1}}
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
        <TextField id="log-email" label="Standard" variant="standard" type="email" />
        <TextField id="log-password" label="Standard" variant="standard" type="password" />
        <Button onClick={login}>Log In</Button>
    </Box>
}