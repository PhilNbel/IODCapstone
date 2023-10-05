import { Avatar } from "@mui/material";

export default function UserAvatar({user}){//creates an avatar with a user's image or their color and initial
  
    return (user.image)?
        <Avatar alt={user.nickName} src={user.image}/>
      :
        <Avatar sx={{ bgcolor: user.color}}>{user.nickName.toUpperCase().charAt(0)}</Avatar>
      
  }