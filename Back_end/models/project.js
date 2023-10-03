let connection = require("../db_run");
let Users = require("./user")
let Steps = require("./step")

class Project {

    constructor({type, name, description, isPrivate = false, altDescription = null, budget = null, budgetIsShared = null, isOpen = false, creatorID}) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.isOpen = isOpen;
        this.creatorID = creatorID;
        if(altDescription)
            this.altDescription = altDescription;
        if(budget!=null && budget!=undefined)
            this.budget = budget
        if(budgetIsShared!=null && budgetIsShared!=undefined)
            this.budgetIsShared = budgetIsShared
    }

    static async init(newProject){
        let keys = Object.keys(newProject)
        let createdProject = {};
        await Promise.all(keys.map(async (key)=>{
            if(!key)//In case the key is null or false, the constructor will pick it up. It also let us get rid of undefined values (that would be inputted through the request)
                return
            if(key=="creator")
                createdProject["creatorID"] = await Users.getUserInfoName("userID",newProject[key]);
            else
                createdProject[key] = newProject[key] 
        }));
        return new Project(createdProject)
    }
    
    //Remote getters

    static async getProjectInfoName(info,name){ //to get info with the name
        let queryRes = await connection.promise().query(`SELECT ${info} FROM Projects WHERE name = "${name}"`)
        if(queryRes[0].length!=0)
            return queryRes[0][0][info]
        return null
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
        let projectToInsert = await Project.init(newProject)
        return connection.promise().query("INSERT INTO Projects"+ projectToInsert.toInsert()).then((result)=>({result :result, name:projectToInsert.name}));
    };

    static async readOne(toReadName, creatorName) {
        let creatorID  = await Users.getUserInfoName("userID",creatorName)
        let req1 = await connection.promise().query(`SELECT type, name, description, isPrivate, budgetIsShared FROM Projects WHERE name = "${toReadName}" AND creatorID = ${creatorID}`);
        let part1 = req1[0][0];
        if(!part1)
            throw new Error("Cannot find project "+toReadName+" created by "+creatorName)
        let req2 = await connection.promise().query(`SELECT ${(part1.isPrivate)?"altDescription,":""}${(part1.budgetIsShared)?"budget,spending,":""}isOpen FROM Projects WHERE name = "${toReadName}" AND creatorID = ${creatorID}`);
        let part2 = req2[0][0];
        
        let part3 = await Steps.readAll(toReadName, creatorName)
        console.log(part3)
        
        let req4 = await connection.promise().query(`SELECT IsMember.role, Users.nickName, Users.image, Users.color FROM IsMember JOIN Users ON Users.userID=IsMember.userID JOIN Projects ON Projects.projectID=IsMember.projectID WHERE Projects.name = "${toReadName}" AND Projects.creatorID = ${creatorID}`);
        let part4 = req4[0]

        let req5 = await connection.promise().query(`SELECT Fields.name, Fields.description, Fields.color FROM TouchesOn JOIN Fields ON Fields.fieldID=TouchesOn.fieldID JOIN Projects ON Projects.projectID=TouchesOn.projectID WHERE Projects.name = "${toReadName}" AND Projects.creatorID = ${creatorID}`);
        let part5 = req5[0]
        
        return {...part1,...part2,steps:[...part3],members:[...part4],fields:[...part5]}
    };
    
    static async readOneAdmin(toReadName, creatorName) {
        let creatorID  = await Users.getUserInfoName("userID",creatorName)
        let req = await connection.promise().query(`SELECT type, name, description, isPrivate, altDescription, budget, spending, budgetIsShared, isOpen, creatorID FROM Projects WHERE name = "${toReadName}" AND creatorID = ${creatorID}`);
        let part1 = req[0][0]
        
        let req2 = await Steps.readAll(toReadName, creatorName)
        let part2 = req2[0]
         
        let req3 = await connection.promise().query(`SELECT IsMember.role, Users.nickName, Users.image, Users.color FROM IsMember JOIN Users ON Users.userID=IsMember.userID JOIN Projects ON Projects.projectID=IsMember.projectID WHERE Projects.name = "${toReadName}" AND Projects.creatorID = ${creatorID}`);
        let part3 = req3[0]
        
        return {...part1,steps:[...part2], members:[...part3]}
    };
    
    static async readAll(constraint = null) {
        let query = "SELECT Projects.name, Users.nickName AS creator FROM Projects JOIN Users ON Users.userID=Projects.creatorID";
        if(constraint)
            query+= " AND "+constraint;
        return connection.promise().query(query).then( (nameList)=>Promise.all( nameList[0].map((project)=>Project.readOne(project.name, project.creator)) ) )
    };


    static async update(toUpdate) {
        let set = Project.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Projects SET "+set+" WHERE name = \""+toUpdate[1]+"\" AND name = \""+await Users.getUserInfoName("id",toUpdate[2])+"\"")
            .catch((err)=>{
                console.log(err);
                throw new Error("No Project corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName,creator) {
        return connection.promise().query("DELETE FROM Projects WHERE name = \""+bountyName+"\" AND name = \""+await Users.getUserInfoName("id",toUpdate[2])+"\"").then((result)=>({deletedRows:result.affectedRows, deletedName:bountyName}));;
    };     
}

module.exports = Project