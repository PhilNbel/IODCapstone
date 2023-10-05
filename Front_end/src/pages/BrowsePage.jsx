import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useState } from 'react';
import useRead from "../hooks/useRead"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Button, CircularProgress, Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';
import { useNavigate } from 'react-router-dom';
import { shortProject } from '../MUIStyles';
import UserAvatar from '../components/UserAvatar';


export default function BrowsePage(){//shows all the projects and gives a brief overview 

    const navigate = useNavigate();
    const fullList = useRead("projects") // runs side effect to load projects data into fullList

    const newList = (fullList.data)?[...fullList.data]:[]; // based on fullList, which will be empty initially and then populated on re-render after running the effect
    const [filterList, setFilterList] = useState(null);
    if (!filterList && newList.length > 0) setFilterList(newList);
    //as we are displaying all the projects, newList won't be empty once initialized

    const theme = useMyThemeContext();

    // function getProgress(project){
    //      //to let users see how much progression the project has reached until now
    //
    //     let toDo = 0;
    //     let isDone = 0;
    //     project.steps.forEach(
    //         (step)=>step.tasks.forEach((task)=>{
    //             if(task.status=="isDone")
    //                 isDone++
    //             else
    //                 toDo++
    //         })
    //     )
    //     return (isDone+toDo==0)?100:(isDone/isDone+toDo)*100
    // }

    function format(project,index){//returns an overview of the project passed as an argument
        return (
            <Button key={index} onClick={()=>navigate('/'+project.creator+'/'+project.name)} sx={{...shortProject, backgroundColor:theme.colors[3], color:theme.colors[4]}}>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography sx={{marginBottom:"4rem"}}>
                        {project.name}
                    </Typography>
                    <Box sx={{display:"flex", flexDirection:"row",justifyContent:"center"}}>
                        {project.members.map((user)=><UserAvatar key={project.name+":"+user.nickName} user={user}/>)}
                    </Box>
                    <Box sx={{marginY:"4rem"}}>
                        <FieldAdder canAdd={false} list={project.fields}/>
                    </Box>
                </Box>
                {/* <CircularProgress variant="determinate" color='success' value={getProgress(project)}/> */}
            </Button>
            
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
            {/*BrowsePage component*/}

                <Filter list={newList} handler={setFilterList}/>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Box sx={{display:"flex", flexWrap:'wrap', justifyContent:"flex-start"}}>
                    {/*displays the project overviews or a loading image if the projects have not loaded yet*/}

                       {(filterList)?filterList.map((project, index)=>format(project, index)):<CircularProgress/>}
                    </Box>
                </Box>
            </Box>
}