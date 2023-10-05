import {useParams} from 'react-router-dom'
import useRead from '../hooks/useRead';
import PageNotFound from "./PageNotFound"
import UserPage from './UserPage';
import ProjectPage from './ProjectPage';
import StepPage from './StepPage';

export default function LookUpPage({type}){
    const params = useParams();
    let toLook = type
    let res = {}
    let child = <></>

    if(toLook == "user"){
        res = useRead("users",params.user);
        child = <UserPage user={res.data}/>
    }

    if(toLook == "project"){
        res = useRead("users/"+params.user,params.project);
        child = <ProjectPage project={res.data}/>
    }
    if(toLook == "step"){
        res = useRead("users/"+params.user+"/",params.project);
        let step = (res.result==200)?res.data.steps[res.data.steps.map(step=>step.name).indexOf(params.step)]:{}
        child = <StepPage project={res.data} step={step}/>
    }

    return <>
        {(res.result==200)?child:<PageNotFound/>}
    </>
}