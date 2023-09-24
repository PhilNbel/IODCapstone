let connection = require("../db_run");

class Field {

    constructor({name, description}) {
        this.name = name;
        this.fieldID = null;
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

    //Remote getters
    
    static async getFieldInfoName(info,name){ //to get and info with the name
        let queryRes = await connection.promise().query(`SELECT ${info} FROM Fields WHERE name = "${name}"`)
        if(queryRes[0].length!=0)
            return queryRes[0][0][info]
        return null
    }

    static async getFieldInfoID(info,id){ //to get an info with the id
        await connection.promise().query(`SELECT ${info} FROM Fields WHERE fieldID = "${id}"`)[0][0][info]
        return
    }


    //CRUD operations
    
    static async create(newField) {
        let fieldToInsert = new Field(newField)
        return connection.promise().query("INSERT INTO Fields"+ fieldToInsert.toInsert()).then((result)=>({result :result, insertName:fieldToInsert.name}));
    };

    static async readOne(toReadName) {
        let part1 = await connection.promise().query(`SELECT name,description FROM Fields WHERE name = "${toReadName}"`);
        let part2 = await connection.promise().query(`SELECT Skills.name,Skills.description FROM Skills JOIN Fields ON Skills.fieldID=Fields.fieldID WHERE Fields.name = "${toReadName}"`)

        return {...part1[0][0], skills:part2[0]}
    };

    static async readAll(constraint = null) {
        let query = "SELECT name,description FROM Fields";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = Field.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Fields SET "+set+" WHERE name = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                throw new Error("No Field corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Fields WHERE name = \""+bountyName+"\"").then((result)=>({deletedRows:result[0].affectedRows, deletedName:bountyName}));
    };     

}

module.exports = Field