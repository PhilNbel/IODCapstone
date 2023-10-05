import readThat from '../hooks/useRead';
import Skill from '../components/Skill';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useMyThemeContext } from '../contexts/MyThemeContext';
import AddSkillDialog from './AddSkillDialog';

export function AddSkillButton ({notIn=[], handler}){//similar to FieldAdder. Consult FieldAdder for more details
    const theme = useMyThemeContext();
    const [showFinder,setShowFinder] = useState(false)
    const fullList = readThat("skills")
    let skillList = (!fullList.data)?[]:fullList.data.filter((skill)=>notIn.map(skill=>skill.name).indexOf(skill.name)==-1) //We only keep the skills that the user does not have 

    return <>{/*AddSkillButton component*/}
        {(!showFinder)?<Button
            onClick={()=>{setShowFinder(true)}}
            style={{backgroundColor:"transparent", color:theme.colors[1],borderRadius:"50%", padding:0,height:"25px", width:"25px", minWidth:0, minHeight:0}}>
        +
        </Button>:<AddSkillDialog displayHandler={setShowFinder} addHandler={handler} skillList={skillList}/>}
    </>
}

export default function SkillAdder({canAdd = false,list=[],remHandler,addHandler}){
    return (//SkillAdder component
        <Box sx={{flexWrap:"wrap", color:"black"}}>
            { (!list)?
                "Loading"
                :
                list.sort((skill1,skill2)=>(skill1.name>skill2.name)?1:-1)
                //orders the skill list

                .map((skill,index)=>
                        {return (canAdd)?
                        //returns a button to remove them if the list can be edited
                            <Button key={index} onClick={()=>{remHandler(skill)}}>
                                <Skill skillInfo={skill}/>
                            </Button>
                            :
                            <Skill key={index} skillInfo={skill}/>
                        }
                    )}
            {(!canAdd)?<></>:<AddSkillButton fromSkills={false} notIn={list} handler={addHandler}/>}
        </Box>
    )
}