let connection = require("../db_run");

class User {

    constructor({firstName, lastName, nickName=null, password=null, email=null, theme=null}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = (nickName)?nickName:(firstName+"-"+lastName);
        if(password)
            this.password = password;
        if(email)
            this.email = email;
        if(theme)
            this.theme = theme;
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

    //Remote getters

    static async getUserInfoName(info,name){ //to get info with the name
        let queryRes = await connection.promise().query(`SELECT ${info} FROM Users WHERE nickName = "${name}"`)
        if(queryRes[0].length!=0)
            return queryRes[0][0][info]
        return null
    }

    //CRUD operations
    
    static async create(newUser) {
        let userToInsert = new User(newUser)
        return connection.promise().query("INSERT INTO Users"+ userToInsert.toInsert()).then((result)=>({result :result, name:userToInsert.nickName}));
    };

    static async readProject(creatorName,projectName) {
        return connection.promise().query(`SELECT userID FROM Users WHERE nickName = "${creatorName}"`)//We retrieve the ID corresponding to the name of the creator
            .then((result)=>connection.promise().query(`SELECT * FROM Projects WHERE name = "${projectName}" AND creatorID = ${result[0][0].userID}`));//We return the project with the same name and creator ID
    };

    static readOne(toReadName) {
        return connection.promise().query(`SELECT nickName, email, password FROM Users WHERE nickName = "${toReadName}"`);
    };
    
    static readOneAdmin(toReadName) {
        return connection.promise().query(`SELECT firstName,lastName,nickName,password,email FROM Users WHERE nickName = "${toReadName}"`);
    };

    static async readAll(constraint = null) {
        let query = "SELECT nickName FROM Users";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = User.getSet(toUpdate[0])
        return connection.promise().query("UPDATE Users SET "+set+" WHERE nickName = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                console.log(err);
                throw new Error("No User corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Users WHERE nickName = \""+bountyName+"\"").then((result)=>({deletedRows:result[0].affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications
    static addInterest(userName, fieldName){

    }

    static addMastery(userName, skillName){

    }

}

module.exports = User