import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeLogo from '../components/HomeLogo';
import { presentation } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';

export default function HomePage(){//Home page
    const theme = useMyThemeContext();
    return <Container maxWidth="96%" sx={{ height:'86vh',borderRadius:'13px' ,backgroundColor:theme.colors[2]}}>
    {/*HomePage component*/}
    
        <HomeLogo/>
        <Container maxWidth={false}>
            <Typography
                variant="p"
                sx={{...presentation, color:theme.colors[4]}}
            >
                Welcome to Eovia, a website where you can share your skills and knowledge to help other realize their projects, whether they are professional endeavours, fun side projects or a serious hobby idea or share your projects and invite others to help you with them <br/><br/> Choose if you want it to be public or private, online or in person, the budget you wish to invest and the type of project, write a short description and flesh out your ideas and wait for people to join you <br/><br/> Make friends, find project you like, learn new skills, prove yourself and grow as a person with Eovia
            </Typography>
        </Container>
        
    </Container>
}