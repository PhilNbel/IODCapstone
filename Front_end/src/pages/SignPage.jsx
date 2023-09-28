import { Container } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignPage(){
    let salt = import.meta.env.VITE_SALT;
    console.log(salt)
    return <>{
        <Container sx={{display:"flex"}}>
            <SignIn salt={salt}/>
            <SignUp salt={salt}/>
        </Container>
        }
    </>
}