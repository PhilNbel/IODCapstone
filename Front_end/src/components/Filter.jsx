import { Box, Button, FormControl, InputLabel, Radio, RadioGroup, Select, MenuItem, FormLabel , FormControlLabel } from "@mui/material";

import { useRef, useState } from "react";

export default function Filter({list, handler}){//Returns a component where you can filter the list passed as argument by name, field, type or status
    const [settings, setSettings] = useState((<>Init</>));
    const [filterType, setFilterType] = useState("");
    const [radioVal, setRadioVal] = useState();
    const initList = [...list];

    function changeRadio(event){
        setRadioVal(event.target.value)
    }

    function changeSettings(event){
        setFilterType(event.target.value);
        switch (event.target.value){
            case "type":
                setSettings(<>
                    <FormLabel id="project-type"> Project type </FormLabel>
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
            default:
                setSettings((<>DefaultSwitch</>))
                break;
        }

    }

    function modifyList(){
        switch (filterType){
            case "type":
                console.log(radioVal)
                let newList = list.filter((project)=>project.type == radioVal); 
                console.log(newList)
                handler([])
                break;
            default:
                setSettings((<></>))
                break;
        }
    }
    function reset(){
        handler(initList);
        list = [...initList];
    }

    return (<Box sx={{display:"flex", justifyContent:"space-between"}}>
            <FormControl fullWidth sx={{display:"inline-block"}}>
                <InputLabel id="filter-type">Type</InputLabel>
                <Select
                    labelId="filter-type"
                    id="demo-simple-select"
                    label="Type"
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
                    <MenuItem value={"status"}>
                        Status
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{display:"inline-block"}}>
                {settings}
                <Button type="submit" onClick={modifyList}>
                    Submit
                </Button>
            </FormControl>
            <Button onClick={reset}>
                Reset
            </Button>
        </Box>
    )
}