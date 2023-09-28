import {useParams} from 'react-router-dom'
export default function StepPage(){
    const params = useParams();
    return <> STEPPAGE {params.user} : {params.project} : {params.step}</>
}