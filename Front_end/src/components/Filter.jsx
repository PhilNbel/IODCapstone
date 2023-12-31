import { Box, Button, FormControl, InputLabel, Radio, RadioGroup, Select, MenuItem, FormLabel , FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import FieldAdder from "./FieldAdder";
import { useMyThemeContext } from "../contexts/MyThemeContext";

export default function Filter({list, handler}){//Returns a component where you can filter the list passed as argument by name, field, type or status

    let theme=useMyThemeContext()
    const [filterType, setFilterType] = useState("name");
    const [radioVal, setRadioVal] = useState("Hobby");
    const [nameVal, setNameVal] = useState("");
    const [settings, setSettings] = useState((<>
        <FormLabel id="project-name"> Project name: </FormLabel>
        <TextField variant="standard" value={nameVal} onChange={(e)=>setNameVal(e.target.value)} sx={{backgroundColor:"#D9D9D9"}}/>
    </>));
    const [fieldList, setFieldList] = useState([]);
    const initList = (list)?[...list]:[];

    function changeRadio(event){
        setRadioVal(event.target.value)
    }

    //functions to edit the field list we are filtering by (for the FieldAdder)
    function remHandler(field){
        setFieldList(fieldList.filter((currField)=>currField.name!=field.name))
    }
    function addHandler(field){
        if(!fieldList.find(currField=>currField.name==field.name))
            setFieldList([...fieldList,field])
    }

    function changeSettings(event){ //changes the parameter we are filtering by
        //needs to be redrawn to update the state in it
        setFilterType(event.target.value);
        switch (event.target.value){
            case "type":
                setSettings(<>
                    <FormLabel id="project-type"> Project type : </FormLabel>
                    <RadioGroup
                        aria-labelledby="project-type"
                        name="radio-buttons-group"
                        onChange={changeRadio}
                        row
                        >
                        <FormControlLabel value="Hobby" control={<Radio />} label="Hobby" />
                        <FormControlLabel value="Serious" control={<Radio />} label="Serious" />
                        <FormControlLabel value="Professional" control={<Radio />} label="Professional" />
                    </RadioGroup>
                </>)
                break;
            case "name":
                setSettings(<>
                    <FormLabel id="project-name"> Project name: </FormLabel>
                    <TextField variant="standard" value={nameVal} onChange={(e)=>setNameVal(e.target.value)} sx={{backgroundColor:"#D9D9D9"}}/>
                </>)
                break;
            case "field":
                setSettings(<>
                    Contains: 
                    <FieldAdder canAdd={true} list={fieldList} remHandler={remHandler} addHandler={addHandler}/>    
                </>)
                break;
            default:
                setSettings((<></>))
                break;
        }

    }

    function modifyList(){//filters the list depending on filterType

        let newList =[]
        switch (filterType){
            case "type":
                newList = list.filter((project)=>project.type == radioVal);
                handler(newList);
                break;
            case "name":
                newList = list.filter((project)=>project.name.toLowerCase().startsWith(nameVal.toLowerCase()));
                handler(newList);
                break;
            case "field":
                newList = list.filter((project)=>fieldList.every((targetField)=>project.fields.map(field=>field.name).indexOf(targetField.name)!=-1));
                handler(newList);
                break;
            default:
                setSettings((<></>))
                break;
        }
    }

    function reset(){//resets the list to display all the projects
        handler(initList);
        list = [...initList];
    }

    return (<Box sx={{display:"flex", justifyContent:"space-between", padding:"1rem", alignContent:"center"}}>
            {/*Filter component*/}

            <FormControl sx={{width:"20%", marginX:"1rem"}}>
            {/*First form, to choose what we filter by*/}

                <InputLabel id="filter-type">Filter by</InputLabel>
                <Select
                    labelId="filter-type"
                    label="Type"
                    defaultValue="name"
                    value={filterType}
                    onChange={changeSettings}
                >
                    <MenuItem value={"name"}>
                        Name
                    </MenuItem>
                    <MenuItem value={"field"}>
                        Fields
                    </MenuItem>
                    <MenuItem value={"type"}>
                        Type
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            {/*Second form, to choose what we filter with*/}

                <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    {settings}
                </Box>
                <Button type="submit" onClick={modifyList} style={{backgroundColor:"#D9D9D9",color:theme.colors[1]}}>
                    Filter
                </Button>
            </FormControl>
            <Box sx={{height:"60%",padding:"0.6rem 1rem", display:"flex",alignItems:"center"}}>
                <Button onClick={reset} style={{backgroundColor:"#D9D9D9",color:theme.colors[1]}}>
                    {/*Reset button*/}

                    Reset
                </Button>
            </Box>
        </Box>
    )
}