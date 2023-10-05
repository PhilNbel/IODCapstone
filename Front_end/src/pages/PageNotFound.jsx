import * as React from 'react';
import { Box, Container, Typography } from "@mui/material";
import { about,presentation } from '../MUIStyles';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { NavLink } from 'react-router-dom';

export default function PageNotFound(){//displayed if you have lost your way
    const theme = useMyThemeContext();

    return  <Container maxWidth="96%" sx={{ height:'86vh',borderRadius:'13px' ,backgroundColor:theme.colors[2]}}>
        {/*PageNotFound component*/}

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
                It seems that you lost your way to your destination. You should probably <NavLink to="/" style={{textDecoration:"underline","&:hover":{textDecoration:"none"}}}> return where your dream began</NavLink>, or maybe ask the world-tree to <NavLink to="/browse" style={{textDecoration:"underline",":hover":{textDecoration:"none"}}}>peer into someone else's dream</NavLink>
                {/*the hover effects on the NavLink stubbornly refuse to work*/}

                </Typography>
            </Box>
        </Container>
}