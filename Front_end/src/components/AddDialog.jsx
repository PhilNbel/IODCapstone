import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { addButton, browse, browseBox } from '../MUIStyles';

export default function AddDialog({displayHandler,addHandler,fromSkills, fieldList}){

    const [currList,setCurrList] = useState(fieldList)

    function lighten(e){
        setCurrName(e.target.value)
        console.log(e.target.value)
        setCurrList(fieldList.filter((field)=>field.name.toLowerCase().startsWith(e.target.value.toLowerCase())))
    }

    let displayList = [...currList]

    const [currName,setCurrName] = useState("")

    const bg={backgroundColor:"#214CE3"} //TODO Make into a Dialog
    return <Dialog
            open={true}
            onClose={()=>displayHandler(false)} height="12vh">
                <DialogContent
                    sx={{padding:0}}>
                    <Box height="20vh"
                        minWidth="20vw"
                        maxWidth="35vw"
                        sx={browseBox} >
                            <Box height="100%" width="75%" sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
                                <Box height="83%" sx={{flexDirection:"column", overflowY:"scroll"}}>
                                    {displayList.sort((field1,field2)=>(field1.name>field2.name)?1:-1).map((field,index)=>(
                                        <Tooltip title={field.description} key={"AFB"+index} >
                                            <Button onClick={()=>setCurrName(field.name)} sx={{...browse, backgroundColor:field.color}}>
                                                {field.name}
                                            </Button>
                                        </Tooltip>)
                                    )}
                                </Box>
                                <TextField variant={"standard"} value={currName} onChange={lighten} sx={{maxHeight:"2vh"}}></TextField>
                            </Box>
                            <Button
                                onClick={()=>addHandler(displayList.find(field=>field.name==currName))}
                                sx={{
                                    ...addButton,
                                    ...bg
                                }}>
                                    {(!fromSkills)?"Add":"Change"}
                                </Button>
                        </Box>
                    
                </DialogContent>
            </Dialog>
}