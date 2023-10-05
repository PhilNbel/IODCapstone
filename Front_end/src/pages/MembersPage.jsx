import { Box, Typography } from "@mui/material";
import UserAvatar from "../components/UserAvatar";
import SkillAdder from "../components/SkillAdder";
import { memberCore } from "../MUIStyles";
import { useMyThemeContext } from "../contexts/MyThemeContext";

export default function MembersPage({memberList}){ //display all the members of the project,
    //their skills and their role

    let theme = useMyThemeContext()

    return (//MembersPage component
        <Box width="90vw" minHeight="75vh" sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", backgroundColor:theme.colors[3],color:theme.colors[4]}}>
            {
            memberList.map((member)=><Box key={member.nickName} sx={{display:"flex",alignItems:"center"}}>
                <Box sx={{padding:"2rem",display:"flex",alignItems:"center"}}>
                    <Box sx={{margin:"1rem"}}>
                        <UserAvatar user={member}/>
                    </Box>
                    <Box sx={memberCore}>
                        <Typography>{member.nickName}</Typography>
                        <SkillAdder canAdd={false} list={member.masters}/>
                    </Box>
                </Box>
                <Typography>{member.role}</Typography>
            </Box>)
            }
        </Box>
    )
}