import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Filter from '../components/Filter';
import { useState } from 'react';
import readThat from "../hooks/readThat"
import { useMyThemeContext } from '../contexts/MyThemeContext';

function format(project,index){
    return (
        <Container maxWidth="md" key={index}>
            {project.name}
        </Container>
    )
}

export default function BrowsePage(){
    const [projectList,setProjectList] = useState(readThat("project"));
   const theme = useMyThemeContext();

    return <Box
                width="90vw"
                sx={{
                    minHeight:"90vh",
                    borderRadius:"25px",
                    backgroundColor:theme.colors[2],
                    marginLeft: 'auto',
                    boxSizing: 'border-box',
                    marginRight: 'auto',
                    display: 'block',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    minHeight: '90vh',
                    borderRadius: '25px'
                }}
            >
                <Filter list={projectList} handler={setProjectList}/>
                <Box sx={{display:"block"}}>
                    {projectList.map((project, index)=>format(project, index))}
                </Box>
            </Box>
}