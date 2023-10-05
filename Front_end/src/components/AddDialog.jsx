import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { addButton, browse, browseBox } from '../MUIStyles';

export default function AddDialog({displayHandler,addHandler,fromSkills, fieldList}){

    const [currList,setCurrList] = useState(fieldList)
    let displayList = [...currList]
    const [currName,setCurrName] = useState("")

    function lighten(e){ //reduces currList depending on currName
        setCurrName(e.target.value)
        console.log(e.target.value)
        setCurrList(fieldList.filter((field)=>field.name.toLowerCase().startsWith(e.target.value.toLowerCase())))
    }

    return <Dialog //AddDialog component. Is equivalent to a AddFieldDialog component
            open={true}
            onClose={()=>displayHandler(false)} height="12vh">
                <DialogContent
                    sx={{padding:0}}>
                        {/* creates a dialog with a box*/}
                    <Box height="20vh"
                        minWidth="20vw"
                        maxWidth="35vw"
                        sx={browseBox} >
                            <Box height="100%" width="75%" sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
                            {/*field selection*/}
                                
                                <Box height="83%" sx={{flexDirection:"column", overflowY:"scroll"}}>
                                {/*field list*/}

                                    {displayList.sort((field1,field2)=>(field1.name>field2.name)?1:-1).map((field,index)=>(
                                        <Tooltip title={field.description} key={"AFB"+index} >
                                        {/*tooltip to detail the field even in the selection list*/}

                                            <Button onClick={()=>setCurrName(field.name)} sx={{...browse, backgroundColor:field.color}}>
                                            {/*when clicked, updates currName with the corresponding field's name*/}

                                                {field.name}
                                            </Button>
                                        </Tooltip>)
                                    )}
                                </Box>
                                <TextField variant={"standard"} value={currName} onChange={lighten} sx={{maxHeight:"2vh"}}/>
                                {/*to manually type, edit or look for a field*/}

                                
                            </Box>
                            <Button
                                onClick={()=>{addHandler(displayList.find(field=>field.name==currName));displayHandler(false)}}
                                sx={{
                                    ...addButton,
                                    backgroundColor:"#214CE3"
                                }}>
                                    {(!fromSkills)?"Add":"Change"}
                            </Button>
                            {/* when pressed adds the field with the corresponding name and closes the dialog box */}
                        </Box>
                    
                </DialogContent>
            </Dialog>
}