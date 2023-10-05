import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { addButton, browse, browseBox } from '../MUIStyles';

export default function AddSkillDialog({displayHandler,addHandler, skillList}){
//currently displays all skills instead of only the ones fron one field
//check AddDialog for more details as it behaves identically for now

    const [currList,setCurrList] = useState(skillList)
    const [currSkill,setCurrSkill] = useState(<></>)

    function lighten(e){ //reduces currList depending on currName
        setCurrName(e.target.value)
        console.log(e.target.value)
        setCurrList(skillList.filter((skill)=>skill.name.toLowerCase().startsWith(e.target.value.toLowerCase())))
    }

    let displayList = [...currList]

    const [currName,setCurrName] = useState("")

    const bg={backgroundColor:"#214CE3"}
    return <Dialog //AddSkillDialog component
            open={true}
            onClose={()=>displayHandler(false)} height="12vh">
                <DialogContent
                    sx={{padding:0}}>
                    <Box sx={{height:"1.5rem",borderBottom:"5px solid black"}}>
                    </Box>
                    <Box height="20vh"
                        minWidth="20vw"
                        maxWidth="35vw"
                        sx={browseBox} >
                            <Box height="100%" width="75%" sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
                                <Box height="83%" sx={{flexDirection:"column", overflowY:"scroll"}}>
                                    {displayList.sort((skill1,skill2)=>(skill1.name>skill2.name)?1:-1).map((skill,index)=>(
                                        <Tooltip title={skill.description} key={"AFB"+index} >
                                            <Button onClick={()=>setCurrName(skill.name)} sx={{...browse, backgroundColor:skill.color}}>
                                                {skill.name}
                                            </Button>
                                        </Tooltip>)
                                    )}
                                </Box>
                                <TextField variant={"standard"} value={currName} onChange={lighten} sx={{maxHeight:"2vh"}}></TextField>
                            </Box>
                            <Button
                                onClick={()=>addHandler(displayList.find(skill=>skill.name==currName))}
                                sx={{
                                    ...addButton,
                                    ...bg
                                }}>
                                    Add
                                </Button>
                        </Box>
                    
                </DialogContent>
            </Dialog>
}