import { Box, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { Button } from "@mui/base";
import { useMyThemeContext } from "../contexts/MyThemeContext";
import { useState } from "react";
import { title } from "../MUIStyles";
import createNew from "../helpers/createNew";
import { useNavigate } from "react-router-dom";

export default function CreateProjectPage(){//the page to create a new project
    let user = useUserContext();
    let theme = useMyThemeContext();
    let navigate = useNavigate();

    const [budget, setBudget] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    let creator = user.currentUser.nickName;

    async function createProject(e){

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        if(data.get("name")=="")//prevents the creation of a project with an empty name
            return  //otherwise 
        
        let newProject = {//packs the project with minimal information
            type: data.get("type"),
            name: data.get("name"),
            description: data.get("description"),
            isPrivate: (isPrivate)?1:0,
            isOpen: (data.get("isOpen")=="true")?1:0,
            creator: creator,
        };

        //add more information if needed

        if(isPrivate)
            newProject={ ...newProject ,altDescription: data.get("altDescription"),}
        if(budget)
            newProject={
                ...newProject,
                budget: budget,
                budgetIsShared: (data.get("budgetIsShared")=="true")?1:0,
            }

        createNew('project',newProject).then((res)=>{
            if(res.result==200)//if the project is created, we display it
                navigate("/"+creator+"/"+data.get("name"))
        }).catch(err=>alert(err.message))
        
    }

    return (<Box component="form" onSubmit={createProject} sx={{ maxWidth:"90%", minHeight:'86vh', padding:'1rem', borderRadius:'35px', justifyContent:'start',display:"flex", flexDirection:"column", backgroundColor:theme.colors[2]}}>
        {/*CreateProjectPage component*/}
        
        <Box sx={{margin:"5rem 1rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Typography sx={title}>Creating new project: </Typography>
            <TextField variant="standard" name="name"></TextField>
        </Box>
        <Box sx={{margin:"3rem 1rem", display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Typography sx={{padding:"0 0.5rem"}}>Type: </Typography>
            <RadioGroup
                aria-labelledby="project-type"
                name="type"
                row
                >
                <FormControlLabel value="Hobby" control={<Radio />} label="Hobby" />
                <FormControlLabel value="Serious" control={<Radio />} label="Serious" />
                <FormControlLabel value="Professional" control={<Radio />} label="Professional" />
            </RadioGroup>
        </Box>
        <Box sx={{margin:"3rem 1rem"}}>
            <Typography>Description: </Typography>
            <TextField variant="standard" name="description" sx={{width:"100%"}}></TextField>
        </Box>
        <Box sx={{margin:"3rem 1rem",display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <Typography>Private</Typography>
                <Checkbox value={isPrivate} onChange={(e)=>setIsPrivate(e.target.checked)}/>
                <Typography>(Do you want random people to see this?)</Typography>
            </Box>
            {(isPrivate)?
            //only choose altDescription if the project is private

                <Box sx={{margin:"1rem 3rem"}}>
                    <Typography>Public description: </Typography>
                    <TextField variant="standard" name="altDescription" sx={{width:"100%"}}></TextField>
                </Box>
                :
                <></>
            }
        </Box>
        <Box sx={{margin:"3rem 1rem", display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Typography>Budget: </Typography>
            <input value={budget} min={0} onChange={(e)=>setBudget(e.target.value)} type="number" style={{padding:"0.2rem 0.5rem"}}></input>
            {(budget)?
            //only choose to shared the budget or not if there is one

            <>
                <Checkbox name="budgetIsShared" sx={{maxHeight:"100%"}}/>
                <Typography>Share budget</Typography>
            </>
            :<></>}
        </Box>
        <Box sx={{margin:"3rem 1rem",display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Typography>Open</Typography>
            <Checkbox label="Open"/>
            <Typography>(An open project let any user become a member without prior administrator approval)</Typography>
        </Box>
        <Box sx={{margin:"3rem 1rem",display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Button type="submit" style={{backgroundColor:theme.colors[0],color:theme.colors[1]}}>Submit</Button>
        </Box>
    </Box>)
}