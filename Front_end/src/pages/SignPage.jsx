import { Container } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignPage(){
    return <>
        <Container sx={{display:"flex", height: "80vh"}}>
            <SignIn/>
            <SignUp/>
        </Container>
    </>
}