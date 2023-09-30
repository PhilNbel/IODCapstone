import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useEffect, useState } from 'react';
import readThat from "../hooks/readThat"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';


export default function BrowsePage(){
    const fullList = readThat("project")
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
            <Box maxWidth="md" key={index} width="16rem" height="10rem" sx={{backgroundColor:theme.colors[3], color:theme.colors[4], borderRadius:"13px", margin:"1rem 2rem"}}>
                <Typography>
                    {project.name}
                </Typography>
                <FieldAdder canAdd="false" list={project.fields}/>
            </Box>
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
                <Box sx={{display:"flex"}}>
                    {filterList.map((project, index)=>format(project, index))}
                </Box>
            </Box>
}