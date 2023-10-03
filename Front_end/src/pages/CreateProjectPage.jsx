import { Checkbox } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

export default function CreateProjectPage(){
    let user = useUserContext();
    let creator = user.currentUser.nickName;

    return (<>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Name: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Type: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Description: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Private: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box>
        <Box sx={{...userField,color:theme.colors[1]}}>
            <Typography>Budget: </Typography>
            <TextField value={newNickName} onChange={(e)=>updateValue(setNewNickName,e)}></TextField>
        </Box><Box sx={{...userField,color:theme.colors[1]}}>
            <Checkbox label="Open"></Checkbox>
            <Typography>(An open project let any user become a member without prior administrator approval)</Typography>
        </Box>
    </>)
}