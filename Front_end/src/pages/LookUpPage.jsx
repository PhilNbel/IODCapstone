import {useParams} from 'react-router-dom'
import readThat from '../hooks/readThat';
import UserPage from "./UserPage";
import PageNotFound from "./PageNotFound"

export default function LookUpPage(){
    const params = useParams();
    const user = readThat("user",params.user);
    let currUser = (!user.result)?{}:user;
    return <>
        {(currUser.result==200)?<UserPage user={currUser.data}/>:<PageNotFound/>}
    </>
}