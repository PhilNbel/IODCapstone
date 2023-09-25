import * as React from 'react';
import { Box, Container, Typography } from "@mui/material";
import { about,presentation } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { NavLink } from 'react-router-dom';

export default function PageNotFound(){
    const theme = useMyThemeContext();

    return <>
            <Container sx={{display:"block"}}>
                <Box
                        padding="5rem" >
                    <Typography
                        variant="p"
                        fontSize="5rem"
                        sx={{...about, color:theme.colors[4]}}
                    >
                        Wrong path
                    </Typography>
                </Box>
                <Box
                        padding="3rem" >
                    <Typography
                        variant="p"
                        fontSize="1.5rem"
                        sx={{...presentation, color:theme.colors[4]}}
                    >
                    It seems that you lost your way to your destination. You should probably <NavLink to="/"> return where your dreams began </NavLink>, or maybe ask the world-tree to <NavLink to="/browse">peer into someone else's dream</NavLink>
                    </Typography>
                </Box>
            </Container>
        </>
}