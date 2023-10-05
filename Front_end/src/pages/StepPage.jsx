import { Avatar, Box, Button, Typography } from '@mui/material';
import { stepBox } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { useState } from 'react';
import ProjectTabs from '../components/ProjectTabs';
import MembersPage from './MembersPage';
import deleteItem from '../helpers/deleteItem';
import { useNavigate } from 'react-router-dom';

export default function StepPage({project, step}){
    let bgColor = {
        "toDo":"rgba(50,50,50,0.6)",
        "inProgress":"rgba(150,150,50,0.6)",
        "isDone":"rgba(50,150,50,0.6)",
    }
    let theme = useMyThemeContext();
    let user = useUserContext()
    let navigate = useNavigate();

    function createTask(){

    }
    
    function deleteStep(){

    }

    function format(step){
        return  <Box key={step.name} sx={{...stepBox, height:"70vh", backgroundColor:theme.colors[0]}}>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{fontSize:28,textAlign:"start",padding:"0.5rem 1rem",borderRadius:"8px",backgroundColor:bgColor[step.status]}}>
                        {step.name}
                    </Typography>
                    <Box>
                        <Typography sx={{fontSize:20,textAlign:"start",padding:"0.5rem 0 0 5rem",borderRadius:"8px"}}>
                            {step.description}
                        </Typography>
                    </Box>
                </Box>
                { step.tasks.map( (task)=>{
                    
                    return <Box key={step.name+" : "+task.name} sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box sx={{display:"flex",flexDirection:"column", marginY:"3rem"}}>
                            <Typography style={{padding:"1rem 2rem", borderRadius:"8px",backgroundColor:bgColor[task.status]}}>
                                {task.name}
                            </Typography>
                            <Box>
                                <Typography sx={{textAlign:"start",padding:"0.5rem 0 0 5rem",borderRadius:"8px"}}>
                                    {task.description}
                                </Typography>
                            </Box>
                        </Box>
                        {(!task.assigned)?"No user assigned":task.assigned.map((assignee) => <Avatar href={assignee.image}> </Avatar>)}
                    </Box>
                }) }
                <Button onClick={()=>createTask()}>
                    <Typography style={{padding:"0 2rem 2rem 1rem", borderRadius:"8px",fontSize:60}}>
                        +
                    </Typography>
                </Button>
            </Box>
            
            {(project.creator==user.currentUser.nickName)?
            <Box sx={{display:"flex",justifyContent:"center"}}>
                <Button onClick={deleteStep} style={{backgroundColor:'red',color:"black"}}>Delete step</Button>
            </Box>:<></>
        }
        </Box>
    }

    const [currPage,setCurrPage] = useState("step")

    return <Box width="90vw" minHeight="75vh" sx={{display:"flex",flexDirection:"column", backgroundColor:theme.colors[2],color:theme.colors[4]}}>

        <ProjectTabs handler={setCurrPage}/>
        {(currPage == "members")?
            <MembersPage memberList={project.members}/>
            :
            <>
                {
                    (currPage=="step")?
                        format(step)
                        :
                        navigate("/"+project.creator+"/"+project.name)
                }
            </>
        }
        
    </Box>
}