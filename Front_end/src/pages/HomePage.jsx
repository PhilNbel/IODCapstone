import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeLogo from '../components/HomeLogo';
import { presentation } from '../MUIStyles';

export default function HomePage(){
    return <Container sx={{maxWidth:"1600px"}}>
        <HomeLogo/>
        <Container>
            <Typography
                variant="p"
                sx={{...presentation, color:"inherit"}}
            >
                Welcome to Eovia, a website where you can share your skills and knowledge to help other realize their projects, whether they are professional endeavours, fun side projects or a serious hobby idea or share your projects and invite others to help you with them <br/><br/> Choose if you want it to be public or private, online or in person, the budget you wish to invest and the type of project, write a short description and flesh out your ideas and wait for people to join you <br/><br/> Make friends, find project you like, learn new skills and grow as a person with Eovia
            </Typography>
        </Container>
        
    </Container>
}