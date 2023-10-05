let connection = require("../db_run");
let Fields = require("./field")

class Skill {

    constructor(name, description, fieldID) {
        this.name = name;
        this.description = description;
        this.fieldID = fieldID
    }

    static async init({name, description, field}){
        let id = await Fields.getFieldInfoName("fieldID",field);
        if(id)
            return new Skill(name, description, id);
        else
            throw new Error("No field with name "+field+" found");
    }

    //Formatting methods

        //[allKeys] VALUES [allValues] for create
    toInsert(){
        let keys = Object.keys(this);
        let values = Object.values(this);
        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")}) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")})`;
    }

        //all [key = value] for update
    getSet(){
        //if passed a fieldID, ignores it
        let keys = Object.keys(this)
        let values = Object.values(this);
        keys = keys.filter((key)=>key!="fieldID")
        values = values.filter((value)=>value!=this.fieldID)
        if(keys.length==0)
            throw new Error("Error: Empty body")
        let result = keys[0]+" = \""+values[0]+'\"'
        for(let i=1;i<keys.length;i++){
            result+= `, ${keys[i]} = "${values[i]}"`
        }
        return result;
    }

    //CRUD operations
    
    static async create(newSkill) {
        let skillToInsert = await Skill.init(newSkill)
        return connection.promise().query("INSERT INTO Skills"+ skillToInsert.toInsert());
    };

    static async readOne(toReadName) {
        let details = await connection.promise().query(`SELECT name,description,fieldID FROM Skills WHERE name = "${toReadName}"`);
        if(details[0].length == 0)
            throw new Error("No field with name "+toReadName)
        let fieldInfo = await connection.promise().query(`SELECT name,description,color FROM Fields WHERE fieldID = "${details[0][0].fieldID}"`);
        return  {name:details[0][0].name,description:details[0][0].description,color:fieldInfo[0][0].color,field:{name:fieldInfo[0][0].name,description:fieldInfo[0][0].description,color:fieldInfo[0][0].color}}
    };

    static async readAll(constraint = null) {
        let query = "SELECT Skills.name, Skills.description, Fields.color AS color, Fields.name AS field FROM Skills JOIN Fields ON Skills.fieldID=Fields.fieldID";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let skill = await Skill.init(toUpdate[0])
        let set = skill.getSet()
        return connection.promise().query("UPDATE Skills SET "+set+" WHERE name = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                throw new Error("No Skill corresponding to this name")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Skills WHERE name = \""+bountyName+"\"").then((result)=>({deletedRows:result[0].affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications
    static addInterest(SkillName, fieldName){

    }

    static addMastery(SkillName, skillName){

    }
}

module.exports = Skill