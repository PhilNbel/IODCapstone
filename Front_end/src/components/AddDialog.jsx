import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { addButton, browse, browseBox } from '../MUIStyles';

export default function AddDialog({handler,fromSkills, fieldList}){

    const [currList,setCurrList] = useState(fieldList)

    function lighten(e){
        setCurrName(e.target.value)
        console.log(e.target.value)
        setCurrList(fieldList.filter((field)=>field.name.toLowerCase().startsWith(e.target.value.toLowerCase())))
    }


    const [currName,setCurrName] = useState("")

    const bg={backgroundColor:"#214CE3"} //TODO Make into a Dialog
    return <Dialog
            open={true}
            onClose={()=>handler(false)} height="12vh">
                <DialogContent
                    sx={{padding:0}}>
                    <Box height="20vh"
                        minWidth="20vw"
                        maxWidth="35vw"
                        sx={browseBox} >
                            <Box height="100%" width="75%" sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
                                <Box height="83%" sx={{flexDirection:"column", overflowY:"scroll"}}>
                                    {currList.map((field,index)=>(
                                        <Tooltip title={field.description} key={"AFB"+index} >
                                            <Button onClick={()=>setCurrName(field.name)} sx={{...browse, backgroundColor:field.color}}>
                                                {field.name}
                                            </Button>
                                        </Tooltip>)
                                    )}
                                </Box>
                                <TextField variant={"standard"} value={currName} onChange={lighten} sx={{maxHeight:"2vh"}}></TextField>
                            </Box>
                            <Button sx={{...addButton,...bg, whiteSpace:"nowrap", padding:"0 0.5rem", margin:"0 0.1rem", lineHeight:"1.8", borderRadius:"1rem/50%"}}>{(!fromSkills)?"Add":"Change"}</Button>
                        </Box>
                    
                </DialogContent>
            </Dialog>
}