let connection = require("../db_run");
let Fields = require("./field")

class Skill {

    constructor(name, description, fieldID) {
        this.name = name;
        this.description = description;
        this.field = fieldID
    }

    async init({name, description, fieldName}){
        let id = Fields.getFieldInfoName("fieldID",fieldName);
        if(id)
            return new Skill(name, description, id);
        else
            throw new Error("No such field");
    }

    //Formatting methods

    toInsert(){
        let keys = Object.keys(this);
        let values = Object.values(this);

        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")}) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")})`;
    }

    static getSet(req_body){
        let keys = Object.keys(req_body)
        let values = Object.values(req_body);
        let result = keys[0]+" = \""+values[0]+'\"'
        for(let i=1;i<keys.length;i++){
            result+= `, ${keys[i]} = "${values[i]}"`
        }
        return result;
    }

    //CRUD operations
    
    static async create(newSkill) {
        let skillToInsert = init(newSkill)
        return connection.promise().query("INSERT INTO Skills"+ skillToInsert.toInsert());
    };

    static async readOne(toReadName) {
        let details = await connection.promise().query(`SELECT name,description,fieldID FROM Skills WHERE name = "${toReadName}"`)[0][0];
        let fieldInfo
        return
    };

    static async readAll(constraint = null) {
        let query = "SELECT nickName FROM Skills";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = Skill.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Skills SET "+set+" WHERE nickName = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                console.log(err);
                throw new Error("No Skill corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Skills WHERE nickName = \""+bountyName+"\"").then((result)=>({deletedRows:result.affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications
    static addInterest(SkillName, fieldName){

    }

    static addMastery(SkillName, skillName){

    }
}

module.exports = Skill