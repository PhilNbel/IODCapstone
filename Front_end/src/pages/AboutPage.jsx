import * as React from 'react';
import { Box, Container, Typography } from "@mui/material";
import { about,presentation } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';

export default function AboutPage(){//Pretty simple, returns a
    const theme = useMyThemeContext();

    return <Container maxWidth="96%" sx={{ height:'86vh',borderRadius:'13px' ,backgroundColor:theme.colors[2]}}>
        {/*AboutPage component*/}
        
            <Box
                    padding="5rem" >
                <Typography
                    variant="h2"
                    fontSize="5vw"
                    sx={{...about, color:theme.colors[4]}}
                >
                    ABOUT
                </Typography>
            </Box>
            <Box
                    padding="3rem" >
                <Typography
                    component="p"
                    sx={{...presentation, color:theme.colors[4]}}
                >
                Eovia is the continuation of a project for IoD graduation made in 2023. It uses MySQL, Vite, React and MUI<br/><br/>If you have no idea of what is it you just read, and you think you would like to learn more, click on “Learn more” and try your luck!<br/><br/>It is made to let people connect through projects and entice self development. If you want a better introduction, go to the home page by clicking here or on the “Eovia” button on the top left corner of the page<br/><br/>All rights and ideas from P.Hennebelle
                </Typography>
            </Box>
        </Container>
}