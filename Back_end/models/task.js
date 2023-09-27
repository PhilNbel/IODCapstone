let connection = require("../db_run");

class Task {

    constructor({name, description, status, stepID, userID=null, skillID=null}) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.stepID = stepID;
        if(userID)
            this.userID = userID;
        if(skillID)
            this.skillID = skillID;
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
        if(keys.length==0)
            throw new Error("Error: Empty body")
        let result = keys[0]+" = \""+values[0]+'\"'
        for(let i=1;i<keys.length;i++){
            result+= `, ${keys[i]} = "${values[i]}"`
        }
        return result;
    }

    //CRUD operations
    
    static async create(newTask) {
        let TaskToInsert = new Task(newTask)
        return connection.promise().query("INSERT INTO Tasks"+ TaskToInsert.toInsert()).then((result)=>({result :result, name:TaskToInsert.nickName}));
    };

    static async read(stepName,projectName,creator) {
        let prep = await connection.promise().query(`SELECT Steps.stepID FROM Projects JOIN Steps ON Steps.projectID=Projects.projectID JOIN Users ON Projects.creator=Users.userID WHERE Users.nickName = "${creator}" AND Projects.name = "${projectName} AND Steps.name = "${stepName}"`)
        let query = "SELECT Tasks.name, Tasks.description FROM Tasks JOIN Steps ON Tasks.stepID=Steps.stepID WHERE Steps.stepID = "+prep[0][0].stepID;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = Task.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Tasks SET "+set+" WHERE name = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                console.log(err);
                throw new Error("No Task corresponding to this ID")
            });
    };    
    
    static async destroy(toDestroy) {
//        return connection.promise().query("DELETE FROM Tasks WHERE name = \""+bountyName+"\"").then((result)=>({deletedRows:result.affectedRows, deletedName:bountyName}));;
        return "destroy Task"
    };     

}

module.exports = Task