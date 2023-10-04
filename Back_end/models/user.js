let connection = require("../db_run");
const { uploadFile } = require("../middleware/uploads");

class User {

    constructor({firstName, lastName, color, nickName=null, password=null, email=null, image=null, theme=null}) {//We get rid of undefined values and initialize to null
        //we pass on the first name and the last name as well as the color
        this.firstName = firstName;
        this.lastName = lastName;
        this.color = color;
        //If the user did not choose a nickname, we create one from their full name
        this.nickName = (nickName)?nickName:(firstName+"-"+lastName);
        //for the rest of the fields, we only keep the fields that have content
        if(password)
            this.password = password;
        if(email)
            this.email = email;
        if(image)
            this.image = image;
        if(theme&&theme.length>0)
            this.theme = theme;
    }

    static randomColor(){
        let red = Math.floor(Math.random()*256).toString(16)
        let green = Math.floor(Math.random()*256).toString(16)
        let blue = Math.floor(Math.random()*256).toString(16)
        if(red.length==1)
            red="0"+red
        if(green.length==1)
            green="0"+green
        if(blue.length==1)
            blue="0"+blue
        return "#"+red+green+blue
    }
    //Formatting methods

    toInsert(){//We transform the object into a [fields] VALUES [corresponding values] for the SQL creation
        let keys = Object.keys(this);//We build it from the keys in an automated fashion for scalability and re-use
        let values = Object.values(this);//functions remain individual in case of special properties (like image, here) 

        if(keys.indexOf("image")!=1)//if we are updating the image, we change the field from the data from the image
            this["image"] = '/img/' + uploadFile(this["image"])//to it's path in the back end

        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")},color) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")},${randomColor()})`;
    }

    static getSet(req_body){ //Transform the the object (the request body) into a succession of "[key] = [value]" with commas 
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

    static async readOne(toReadName) {
        let req1 = await connection.promise().query(`SELECT firstName,lastName,nickName, color, image, email, password FROM Users WHERE nickName = "${toReadName}"`);
        if(req1[0].length==0)
            throw new Error("User "+toReadName+" does not exist")
        let req2 = await connection.promise().query(`SELECT Fields.name,Fields.description,Fields.color FROM Interests JOIN Users ON Interests.userID=Users.userID JOIN Fields ON Interests.fieldID=Fields.fieldID WHERE Users.nickName ="${toReadName}"`)
        let req3 = await connection.promise().query(`SELECT Skills.name,Skills.description FROM Masters JOIN Users ON Masters.userID=Users.userID JOIN Skills ON Masters.skillID=Skills.skillID WHERE Users.nickName ="${toReadName}"`)
        return {...req1[0][0],interests:req2[0],masters:req3[0]}
    };
    
    static async readOneAdmin(toReadName) {
        let req1 = await connection.promise().query(`SELECT firstName,lastName,nickName,color, image,email,password FROM Users WHERE nickName = "${toReadName}"`);
        let req2 = await connection.promise().query(`SELECT Fields.name,Fields.description,Fields.color FROM Interests JOIN Users ON Interests.userID=Users.userID JOIN Fields ON Interests.fieldID=Fields.fieldID WHERE Users.nickName ="${toReadName}"`)
        let req3 = await connection.promise().query(`SELECT Skills.name,Skills.description FROM Masters JOIN Users ON Masters.userID=Users.userID JOIN Skills ON Masters.skillID=Skills.skillID WHERE Users.nickName ="${toReadName}"`)
        return {...req1[0][0],interests:req2[0],masters:req3[0]}
    };

    static async readAll(constraint = null) {
        let query = "SELECT nickName, color, image FROM Users";
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
        let userID = User.getUserInfoName("userID", userName)
    }

    static addMastery(userName, skillName){
        let userID = User.getUserInfoName("userID", userName)
    }

}

module.exports = User