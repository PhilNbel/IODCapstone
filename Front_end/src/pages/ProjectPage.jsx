import { Avatar, Box, LinearProgress, Typography } from '@mui/material';
import { projectTitle, stepBox,taskBox } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';
import { useMyThemeContext } from '../contexts/MyThemeContext';

function format(step){
    let theme = useMyThemeContext();
    return <Box sx={stepBox}>
            <Typography>
                {step.name}
            </Typography>
        { step.tasks.map( (task)=> <Box sx={{...taskBox, backgroundColor:theme.colors[0]}}>
                <Typography>
                    {task.name}
                </Typography>
                {(!task.assigned)?"No user assigned":task.assigned.map((assignee) => <Avatar href={assignee.image}> </Avatar>)}
            </Box> ) }
    </Box>
}

function detail(project){
    let user = useUserContext();
    let theme = useMyThemeContext();

    return <Box width="90vw" height="75vh" sx={{display:"flex",flexDirection:"row", backgroundColor:theme.colors[3],color:theme.colors[4]}}>
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
        <Box sx={{width:"50%", display:"flex", flexDirection:"column"}}>
            { project.steps.map((step)=>format(step)) }
        </Box>
    </Box>
}

export default function ProjectPage({project}){
    return <Box>
        {(project.name)?detail(project):<></>}
    </Box>


}