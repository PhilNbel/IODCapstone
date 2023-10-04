import { Container } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignPage(){
    let salt = import.meta.env.VITE_SALT;
    return (
        <Container maxWidth='xl' sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"stretch",
            marginBottom:'5vh',
            '@media screen and (max-width:900px)': {
                flexDirection:'column',
                alignItems:"inherit",
                marginBottom:'0'
            },
            '@media screen and (max-height:1000px)': {
                marginBottom:'0',
                height:"80vh"
            }
          }}>
            <SignIn salt={salt}/>
            <SignUp salt={salt}/>
        </Container>
    )
}