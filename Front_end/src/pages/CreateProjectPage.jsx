import { Box, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { Button } from "@mui/base";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";

export default function CreateProjectPage(){
    let user = useUserContext();
    let creator = user.currentUser.nickName;

    async function createProject(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let newProject = {
            type: data.get("type"),
            name: data.get("name"),
            description: data.get("description"),
            isPrivate: data.get("isPrivate"),
            isOpen: data.get("isOpen"),
            creator: creator,
            altDescription: data.get("altDescription"),
            budget: data.get("budget"),
            budgetIsShared: data.get("budgetIsShared"),
        };
        createNew('project',newProject)
    }

    return (<Box component="form">
        <Box>
            <Typography>Type: </Typography>
            <FormLabel id="project-type"> Project type </FormLabel>
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
        <Box>
            <Typography>Name: </Typography>
            <TextField variant="standard" name="name"></TextField>
        </Box>
        <Box>
            <Typography>Description: </Typography>
            <TextField variant="standard" name="description"></TextField>
        </Box>
        <Box>
            <Checkbox name="isPrivate"></Checkbox>
            <Typography>(Do you want random people to see this?)</Typography>
        </Box>
        <Box>
            <Typography>Name: </Typography>
            <TextField variant="standard" name="altDescription"></TextField>
        </Box>
        <Box>
            <Typography>Budget: </Typography>
            <NumberInput
                name="budget"
                slotProps={{
                    incrementButton: {
                    children: '▴',
                    },
                    decrementButton: {
                    children: '▾',
                    },
                }}
                />
        </Box>
        <Box>
            <Checkbox name="budgetIsShared"></Checkbox>
        </Box>
        <Box>
            <Checkbox label="Open"></Checkbox>
            <Typography>(An open project let any user become a member without prior administrator approval)</Typography>
        </Box>
        <Button onClick={createProject}>Submit</Button>
    </Box>)
}