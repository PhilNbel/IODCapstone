export default function StepPage({step}){
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