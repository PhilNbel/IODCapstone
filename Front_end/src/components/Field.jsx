import { useState } from "react";
import readThat from "../hooks/readThat";
import {fieldStyle} from "../MUIStyles"

function Field({name}){
    const [popUp, setPopUp] = useState(<></>)
    function display(field){
        
        function detail(){
            setPopUp(
                <Box
                    sx={{
                        position:"relative",
                        left:"55%",
                        bottom:"55%"
                    }}
                    >
                    {field.description}
                </Box>
                )
        }
        let style = (field.color)?{...fieldStyle, backgroundColor:field.color}:fieldStyle;

        return <Box sx={style} onHover={detail}>
                {field.name}
                {popUp}
            </Box>
    }

    let details = readThat('field', name).then((field)=>display(field))

}