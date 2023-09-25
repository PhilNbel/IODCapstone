import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { homeLogo1,homeLogo2 } from '../MUIStyles';

export default function HomeLogo(){
    return <Container sx={{padding:"3rem 0"}}>
            <Container>
                <Typography
                    variant="h1"
                    noWrap
                    sx={homeLogo1}
                >
                EOVIA
                </Typography>
          </Container>
            <Box> 
                <Typography
            variant="h6"
            noWrap
            textAlign={'right'}
            sx={{...homeLogo2, color:"inherit"}}
          >
            We make your dreams come true
          </Typography>
          </Box>
        </Container>
}