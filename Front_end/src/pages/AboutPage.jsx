import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { about,presentation } from '../MUIStyles';

export default function AboutPage(){
    return <>
        <Container><Typography
                variant="p"
                sx={{...about, color:"inherit"}}
            >
                ABOUT
            </Typography>
        </Container>
        <Container>
            <Typography
                variant="p"
                sx={{...presentation, color:"inherit"}}
            >
            Eovia is the continuation of a project for IoD graduation made in 2023. It uses MySQL, Vite, React and MUI<br/><br/>If you have no idea of what is it you just read, and you think you would like to learn more, click on “Learn more” and try your luck!<br/><br/>It is made to let people connect through projects and entice self development. If you want a better introduction, go to the home page by clicking here or on the “Eovia” button on the top left corner of the page<br/><br/>All rights and ideas from P.Hennebelle
            </Typography>
        </Container>
    </>
}