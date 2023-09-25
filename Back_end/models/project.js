let connection = require("../db_run");
let Projects = require("./project")

class Project {

    constructor({type, name, description, isPrivate = false, altDescription = null, budget = null, showBudget = null, isOpen = false, creatorID}) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.isOpen = isOpen;
        this.creatorID = creatorID;
        if(altDescription)
            this.altDescription = altDescription;
        if(budget)
            this.budget = budget;
        if(showBudget)
            this.showBudget = showBudget;
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
        return new Project(createdProject)
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
    
    static async create(newProject) {
        let ProjectToInsert = new Project(newProject)
        return connection.promise().query("INSERT INTO Projects"+ ProjectToInsert.toInsert()).then((result)=>({result :result, name:ProjectToInsert.nickName}));
    };

    static async readOne(toReadName, creatorName) {
        let creatorID  = await Users.getUserInfoName("id",creatorName)
        let req1 = await connection.promise().query(`SELECT type, name, description, isPrivate, showBudget FROM Projects WHERE name = "${toReadName}" AND creatorID = ${creatorID}`);
        let part1 = req1[0][0];
        if(part1)
            throw new Error("")
        let req2 = await connection.promise().query(`SELECT ${(part1.isPrivate)?"altDescription,":""}${(part1.showBudget)?"budget,":""},isOpen FROM Projects WHERE name = "${toReadName}" AND creatorID = ${creatorID}`);
        let part2 = req2[0][0];
        return {...part1,...part2}
    };
    
    static async readOneAdmin(toReadName) {
        let creatorID  = await Users.getUserInfoName("id",creatorName)
        let req = await connection.promise().query(`SELECT type, name, description, isPrivate, altDescription, budget, showBudget, isOpen, creatorID FROM Projects WHERE nickName = "${toReadName}" AND creatorID = ${creatorID}`);
        return req[0][0]
    };
    
    static async readAll(constraint = null) {
        let query = "SELECT Projects.name, Users.name FROM Projects JOIN Users ON Users.userID=Projects.creatorID";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };

    static async update(toUpdate) {
        let set = Project.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Projects SET "+set+" WHERE nickName = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                console.log(err);
                throw new Error("No Project corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Projects WHERE nickName = \""+bountyName+"\"").then((result)=>({deletedRows:result.affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications
    static addInterest(ProjectName, fieldName){

    }

    static addMastery(ProjectName, skillName){

    }
}

module.exports = Project