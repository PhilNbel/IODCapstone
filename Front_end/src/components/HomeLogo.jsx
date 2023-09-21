import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { logoStyle } from '../MUIStyles';

export default function HomeLogo(){
    return <Container>
            <Container> <h1>EOVIA</h1> </Container>
            <Box> <i>We make your dreams come true</i></Box>
        </Container>
}