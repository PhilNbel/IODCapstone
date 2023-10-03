import {useParams} from 'react-router-dom'
import readThat from '../hooks/readThat';
import PageNotFound from './PageNotFound';
import { Avatar, Box, LinearProgress, Typography } from '@mui/material';
import { projectTitle, stepBox } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';

function format(step){
    return <Box sx={stepBox}>
        { step.tasks.map( (task)=> <Box>
                <Typography>
                    {task.name}
                </Typography>
                {task.assigned.map((assignee) => <Avatar href={assignee.image}> </Avatar>)}
            </Box> ) }
    </Box>
}

function detail(project){
    let user = useUserContext();

    if(project.result==500)
        return <PageNotFound/>
    return <Box sx={{display:"flex",flexDirection:"row"}}>
        <Box sx={{width:"50%", display:"flex", flexDirection:"column"}}>
            <Box>
                <Typography sx={projectTitle}>
                    {project.name}
                </Typography>
                {(project.budget && project.budgetIsShared)?<LinearProgress color="success" variant="determinate" value={project.spending/project.budget} />:<></>}
            </Box>
            <Box>
                { ( !project.isPrivate || project.members.map(user=>user.nickName).indexOf(user.currentUser.nickName)!=-1 )? project.description : project.altDescription }
            </Box>
        </Box>
        <Box sx={{width:"50%"}}>
            { project.steps.map((step)=>format(step)) }
        </Box>
    </Box>
}

export default function ProjectPage(){
    const params = useParams();
    let projectInfo = readThat(params.user+'/'+params.project)
    return <Box>
        {(projectInfo.result)?detail(projectInfo):<></>}
    </Box>


}