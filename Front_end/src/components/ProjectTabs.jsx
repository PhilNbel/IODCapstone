import { Box, Button } from "@mui/material";
import { useMyThemeContext } from "../contexts/MyThemeContext";
export default function ProjectTabs({handler}){
    let theme = useMyThemeContext()
    return <Box>
        <Button onClick={()=>handler("project")} style={{width:"50%",borderBottomRightRadius:"0",borderBottomLeftRadius:"0",backgroundColor:theme.colors[2],color:theme.colors[4]}}>
            Project
        </Button>
        <Button onClick={()=>handler("members")} style={{width:"50%",borderBottomRightRadius:"0",borderBottomLeftRadius:"0",backgroundColor:theme.colors[3],color:theme.colors[4]}}>
            Members
        </Button>
    </Box>
}