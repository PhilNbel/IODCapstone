import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useState } from 'react';
import useRead from "../hooks/useRead"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';
import { useNavigate } from 'react-router-dom';
import { longProject } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';
import UserAvatar from '../components/UserAvatar';


export default function UserProjectsPage(){

    let user=useUserContext();

    const navigate = useNavigate();
    const fullList = useRead("projects") // runs side effect to load projects data into fullList

    const newList = (fullList.data)?[...fullList.data]:[]; // based on fullList, which will be empty initially and then populated on re-render after running the effect
    const [filterList, setFilterList] = useState(null);
    let reducedList = newList.filter(project=>project.members.map(member=>member.nickName).indexOf(user.currentUser.nickName)!=-1)
    if (!filterList && newList.length > 0) setFilterList(reducedList);

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
//        console.log(isDone+"/"+toDo+isDone)
        return toDo
    }


    function format(project,index){
        return (
            <Button key={index} onClick={()=>navigate('/'+project.creator+'/'+project.name)} sx={{...longProject, backgroundColor:theme.colors[3], color:theme.colors[4]}}>
                <Box sx={{width:"90%",display:"flex", flexDirection:"column"}}>
                    <Typography sx={{marginBottom:"4rem"}}>
                        {project.name}
                    </Typography>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Box sx={{display:"flex", flexDirection:"column"}}>
                            <Box sx={{display:"flex", flexDirection:"row",justifyContent:"start"}}>
                                {project.members.map((user)=><UserAvatar key={project.name+":"+user.nickName} user={user}/>)}
                            </Box>
                            <Box sx={{marginY:"4rem"}}>
                                <FieldAdder canAdd={false} list={project.fields}/>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
                            <Typography>
                                {project.members[project.members.map((member)=>member.nickName).indexOf(user.currentUser.nickName)].role}
                            </Typography>
                            <Typography>
                                Tasks left to do: {getProgress(project)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {/* <CircularProgress variant="determinate" color='success' value={getProgress(project)}/> */}
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
                <Filter list={reducedList} handler={setFilterList}/>
                <Box sx={{display:"flex", flexWrap:'wrap',justifyContent:'center'}}>
                    {(filterList)?filterList.map((project, index)=>format(project, index)):<CircularProgress/>}
                </Box>
                    <Button onClick={()=>navigate("/create")} >Create new project</Button>
            </Box>
}