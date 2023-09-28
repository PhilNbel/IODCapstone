import { Container } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignPage(){
    let salt = import.meta.env.VITE_SALT;
    return <>{
        <Container sx={{display:"flex",'@media screen and (max-width:768px)': {
            flexDirection:'column'
          }}}>
            <SignIn salt={salt}/>
            <SignUp salt={salt}/>
        </Container>
        }
    </>
}