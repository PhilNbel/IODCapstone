let connection = require("../db_run");
let Users = require("./user")

class Step {

    constructor({name, description, status, projectID}) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.projectID = projectID;
    }
    
    static async init(newProject){
        let keys = Object.keys(newProject)
        let createdProject = {};
        keys.forEach(async (key)=>{
            if(!key)//In case the key is null or false, the constructor will pick it up. It also let us get rid of undefined values (that would be inputted through the request)
                return 
            if(key=="creator")
                createdProject[creatorID] = await Users.getUserInfoName("id",newProject[key]);
            else
                createdProject[key] = newProject[key] 
        });
        return new Step(createdProject)
    }

    //Formatting methods

        //[allKeys] VALUES [allValues] for create
    toInsert(){
        let keys = Object.keys(this);
        let values = Object.values(this);

        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")}) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")})`;
    }

        //all [key = value] for update
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
    
    static async create(newStep) {
        let StepToInsert = new Step(newStep)
        return connection.promise().query("INSERT INTO Steps"+ StepToInsert.toInsert()).then((result)=>({result :result, name:StepToInsert.nickName}));
    };

    static async readOne(toReadName,project,creator) {
        let queryRes = await connection.promise().query(`SELECT projectID FROM Projects JOIN Users ON Projects.creatorID=Users.userID WHERE Projects.name = "${project}" AND Users.nickName="${creator}"`)
        if(queryRes[0].length==0)
            throw new Error("Project does not exist")
        let projectId = queryRes[0][0].projectID
        let part1 = await connection.promise().query(`SELECT name,description,status FROM Steps WHERE name = "${toReadName}" AND projectID=${projectId}`);
        if(part1[0].length==0)
            throw new Error("No Such step")
        let part2 = await connection.promise().query(`SELECT Tasks.name,Tasks.description,Tasks.status FROM Tasks JOIN Steps ON Tasks.stepID=Steps.stepID WHERE Steps.name = "${toReadName}" AND Steps.projectID=${projectId}`)
        return {...part1[0][0], tasks:part2[0]}
    };

    static async readAll(project, creator, constraint = null) {
        let queryRes = await connection.promise().query(`SELECT projectID FROM Projects JOIN Users ON Projects.creatorID=Users.userID WHERE Projects.name = "${project}" AND Users.nickName="${creator}"`)
        if(queryRes[0].length==0)
            throw new Error("Project does not exist")
        let projectId = queryRes[0][0].projectID
        let query = "SELECT name FROM Steps WHERE projectID ="+projectId;
        if(constraint)
            query+= " AND "+constraint;
        return connection.promise().query(query).then( (nameList)=>Promise.all( nameList[0].map((stepName)=>Step.readOne(stepName.name,project,creator)) ) )
    };     

    static async update(toUpdate) {
        let set = Step.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Steps SET "+set+" WHERE nickName = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                throw new Error("No Step corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Steps WHERE nickName = \""+bountyName+"\"").then((result)=>({deletedRows:result.affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications
    static addInterest(StepName, fieldName){

    }

    static addMastery(StepName, skillName){

    }
}

module.exports = Step