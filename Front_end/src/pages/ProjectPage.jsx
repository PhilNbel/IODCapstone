import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { projectTitle, stepBox,taskBox } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { useState } from 'react';
import ProjectTabs from '../components/ProjectTabs';
import MembersPage from './MembersPage';
import deleteItem from '../helpers/deleteItem';
import { useNavigate } from 'react-router-dom';


export default function ProjectPage({project,page="project"}){//shows the project and it's details
    //displays a different page depending on the value of page

    const [currPage,setCurrPage] = useState(page)
    const navigate = useNavigate();
    let user = useUserContext();
    let theme = useMyThemeContext();
    
    async function deleteProject(){//deletes the current project and moves out of the page
        await deleteItem("users/"+project.creator,project.name)
        navigate("/projects")
    }

    function format(step){
        let bgColor = {//background map
            "toDo":"rgba(50,50,50,0.6)",
            "inProgress":"rgba(150,150,50,0.6)",
            "isDone":"rgba(50,150,50,0.6)",
        }

        let theme = useMyThemeContext();
        return <Box key={step.name} sx={{...stepBox, backgroundColor:theme.colors[0]}}>
            {/*formatted step*/}
                
                <Button onClick={()=>navigate(("/"+project.creator+"/"+project.name+"/"+step.name))} style={{justifyContent:'stretch',width:"100%",backgroundColor:bgColor[step.status],color:theme.colors[4]}}>
                    <Typography sx={{fontSize:28,textAlign:"start",padding:"0.5rem 1rem"}}>
                        {step.name}
                    </Typography>
                </Button>
                { step.tasks.map( (task)=>{
                    
                    return <Box key={step.name+" : "+task.name} sx={taskBox}>
                        <Typography style={{padding:"0 2rem 2rem 1rem", borderRadius:"8px",backgroundColor:bgColor[task.status]}}>
                            {task.name}
                        </Typography>
                        {(!task.assigned)?"No user assigned":task.assigned.map((assignee) => <Avatar href={assignee.image}> </Avatar>)}
                    </Box>
                }) }
            </Box>
    }
    
    function detail(project){
    
        return <Box width="90vw" minHeight="75vh" sx={{display:"flex",flexDirection:"row", backgroundColor:theme.colors[2],color:theme.colors[4]}}>
            {/*detailed project*/}

                <Box sx={{width:"50%", display:"flex",justifyContent:"center"}}>
                    <Box sx={{width:"96%",height:"98%", display:"flex", flexDirection:"column", borderRadius:"13px",backgroundColor:theme.colors[3]}}>
                        <Box sx={{display:"flex",justifyContent:"center", paddingY:"3rem"}}>
                            <Typography sx={projectTitle}>
                                {project.name}
                            </Typography>
                            {(project.budget && project.budgetIsShared)?<LinearProgress color="success" variant="determinate" value={project.spending/project.budget} />:<></>}
                        </Box>
                        <Box sx={{display:"flex",justifyContent:"center"}}>
                            { ( !project.isPrivate || project.members.map(user=>user.nickName).indexOf(user.currentUser.nickName)!=-1 )? project.description : project.altDescription }
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width:"50%", display:"flex", flexDirection:"column"}}>
                    { project.steps.map((step)=>format(step)) }
                    
                    {(project.creator==user.currentUser.nickName)?
                        <Button style={{color:theme.colors[4]}}>
                        {/*a button to add more steps*/}

                            <Typography style={{padding:"0 2rem 2rem 1rem", borderRadius:"8px",fontSize:60}}>
                                +
                            </Typography>
                        </Button>:<></>
                    }
                </Box>
            </Box>
    }
    
    return <Box sx={{display:"flex",flexDirection:"column"}}>
        {/*ProjectPage component*/}

            <ProjectTabs handler={setCurrPage}/>
            {(currPage == "members")?
                <MembersPage memberList={project.members}/>
                :
                <>
                    {(project.name)?detail(project):<></>}
                </>
            }
            {(project.creator==user.currentUser.nickName)?
            <Box sx={{display:"flex",justifyContent:"center"}}>
                <Button onClick={deleteProject} style={{backgroundColor:'red',color:"black"}}>Delete project</Button>
            </Box>:<></>
            }
    </Box>


}