import {useParams} from 'react-router-dom'
import readThat from '../hooks/readThat';
import FieldAdder from '../components/FieldAdder';
export default function UserPage(){
    //const params = useParams();
    return <FieldAdder canAdd={false}/>
}