import {useParams} from 'react-router-dom'
export default function UserPage(){
    const params = useParams();
    return <>USERPAGE {params.user}</>
}