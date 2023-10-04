import { Container } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignPage(){
    let salt = import.meta.env.VITE_SALT;
    return (
        <Container maxWidth='xl' sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"calc(100vh - 64px)",
            maxHeight:"800px",
            marginBottom:'5vh',
            '@media screen and (max-width:900px)': {
                flexDirection:'column'
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