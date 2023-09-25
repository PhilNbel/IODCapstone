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

    toInsert(){
        let keys = Object.keys(this);
        let values = Object.values(this);

        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")}) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")})`;
    }

     getSet(){
        let keys = Object.keys(this)
        let values = Object.values(this);
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
        console.log(toReadName)
        let details = await connection.promise().query(`SELECT name,description,fieldID FROM Skills WHERE name = "${toReadName}"`)[0][0];
        let fieldInfo = await connection.promise().query(`SELECT name,description FROM Fields WHERE fieldID = "${details.fieldID}"`)[0][0];
        return  {name:details.name,description:details.description,field:{name:fieldInfo.name,description:fieldInfo.description}}
    };

    static async readAll(constraint = null) {
        let query = "SELECT Skills.name, Skills.description, Fields.name AS field FROM Skills JOIN Fields ON Skills.fieldID=Fields.fieldID";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = Skill.init(toUpdate[0]).getSet()
        return connection.promise().query("UPDATE Skills SET "+set+" WHERE name = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                console.log(err);
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