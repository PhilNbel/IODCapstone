import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useEffect, useState } from 'react';
import readThat from "../hooks/useRead"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';
import { useNavigate } from 'react-router-dom';
import { longProject } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';


export default function UserProjectsPage(){

    let user=useUserContext();

    const navigate = useNavigate();
    const fullList = readThat("projects")
    const [projectList,setProjectList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const newList = (fullList.data)?[...fullList.data].filter((project)=>project.members.indexOf(user.currentUser.nickName)):[];

    //if(newList.length!=0)
    useEffect(()=>{
        if(projectList.length==0)
            setProjectList(newList)
        setFilterList(newList)
    },[projectList])
    const theme = useMyThemeContext();

    function getProgress(project){
        let toDo = 0;
        let isDone = 0;
        project.steps.forEach(
            (step)=>step.tasks.forEach((task)=>{
                if(task.status=="isDone")
                    isDone++
                else
                    toDo++
            })
        )
        console.log(isDone+"/"+toDo)
        return (toDo==0)?100:(isDone/toDo)*100
    }


    function format(project,index){
        return (
            <Button key={index} onClick={()=>navigate('/'+project.creator+'/'+project.name)} sx={{...longProject, backgroundColor:theme.colors[3], color:theme.colors[4]}}>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography sx={{marginBottom:"4rem"}}>
                        {project.name}
                    </Typography>
                    <Box sx={{marginY:"4rem"}}>
                        <FieldAdder canAdd={false} list={project.fields}/>
                    </Box>
                </Box>
                <Stack sx={{color:"white"}}>
                    <CircularProgress variant="determinate" color='success' value={getProgress(project)}>
                        <CircularProgress variant="determinate" color='inherit' value={100}/>
                    </CircularProgress>
                </Stack>
            </Button>
            //On hover, display dark transparent 
            
        )
    }
    return <Box
                width="90vw"
                sx={{
                    minHeight:"90vh",
                    borderRadius:"25px",
                    backgroundColor:theme.colors[2],
                    marginLeft: 'auto',
                    boxSizing: 'border-box',
                    marginRight: 'auto',
                    display: 'block'
                }}
            >
                <Filter list={projectList} handler={setFilterList}/>
                <Box sx={{display:"flex", flexWrap:'wrap',justifyContent:'center'}}>
                    {filterList.map((project, index)=>format(project, index))}
                </Box>
                    <Button onClick={()=>navigate("/create")} >Create new project</Button>
            </Box>
}