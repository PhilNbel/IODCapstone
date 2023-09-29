import {useParams} from 'react-router-dom'
export default function ProjectPage(){
    const params = useParams();
    return <> PROJECTPAGE {params.user} : {params.project}</>
}