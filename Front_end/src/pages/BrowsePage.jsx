import Box from '@mui/material/Box';
import Filter from '../components/Filter';
import { useEffect, useState } from 'react';
import useRead from "../hooks/useRead"
import { useMyThemeContext } from '../contexts/MyThemeContext';
import { Button, CircularProgress, Typography } from '@mui/material';
import FieldAdder from '../components/FieldAdder';
import { useNavigate } from 'react-router-dom';
import { shortProject } from '../MUIStyles';


export default function BrowsePage(){

    const navigate = useNavigate();
    const fullList = useRead("projects")

    const newList = (fullList.data)?[...fullList.data]:[];
    const [filterList, setFilterList] = useState(newList);
    //useEffect(()=>setFilterList(newList),[newList])
    console.log(filterList)
    //if(newList.length!=0)
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
                <CircularProgress variant="determinate" value={30} />
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
                <Filter list={newList} handler={setFilterList}/>
                <Box sx={{display:"flex", flexWrap:'wrap',justifyContent:'center'}}>
                    {filterList.map((project, index)=>format(project, index))}
                </Box>
            </Box>
}