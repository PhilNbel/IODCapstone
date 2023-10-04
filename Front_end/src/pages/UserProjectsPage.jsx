import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useEffect, useState } from 'react';
import readThat from "../hooks/useRead"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Button, Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';
import { useNavigate } from 'react-router-dom';
import { shortProject } from '../MUIStyles';


export default function UserProjectsPage(){

    const navigate = useNavigate();
    const fullList = readThat("projects")
    const [projectList,setProjectList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const newList = (fullList.data)?[...fullList.data]:[];

    //if(newList.length!=0)
    useEffect(()=>{
        if(projectList.length==0)
            setProjectList(newList)
        setFilterList(newList)
    },[projectList])
    const theme = useMyThemeContext();

    function format(project,index){
        return (
            <Button key={index} onClick={()=>navigate('/'+project.creator+'/'+project.name)} sx={{...shortProject, backgroundColor:theme.colors[3], color:theme.colors[4]}}>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Typography>
                        {project.name}
                    </Typography>
                    <Box>
                        <FieldAdder canAdd={false} list={project.fields}/>
                    </Box>
                </Box>
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
                <Filter list={projectList} handler={setFilterList}/>
                <Box sx={{display:"flex", flexWrap:'wrap',justifyContent:'center'}}>
                    {filterList.map((project, index)=>format(project, index))}
                </Box>
                    <Button onClick={()=>navigate("/create")} >Create new project</Button>
            </Box>
}