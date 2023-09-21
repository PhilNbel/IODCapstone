import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Filter from '../components/Filter';
import { useState } from 'react';
import readThat from "../hooks/readThat"

function format(project,index){
    return (
        <Container maxWidth="md" key={index}>
            {project.name}
        </Container>
    )
}

export default function BrowsePage(){
    const [projectList,setProjectList] = useState(readThat("Projects"));
    return <>
        <Filter list={projectList} handler={setProjectList}/>
        <Container sx={{display:"block"}}>
            {projectList.map((project, index)=>format(project, index))}
        </Container>
    </>
}