import { Avatar, Box, Container, Typography } from "@mui/material";
import UserAvatar from "../components/UserAvatar";

export default function MembersPage({memberList}){
    return <Container>
        <Box>
            {
            memberList.map((member)=><Box>
                <Box>
                    <UserAvatar user={member}/>
                    <Box>
                        <Typography>{member.nickName}</Typography>
                        {/* <SkillAdder></SkillAdder> */}
                    </Box>
                </Box>
                <Typography>{member.role}</Typography>
            </Box>)
            }
        </Box>
    </Container>
}