let connection = require("../db_run");
const { uploadFile } = require("../middleware/uploads");
let Skills = require("./skill")

class User {

    constructor({firstName, lastName, color=User.randomColor(), nickName=null, password=null, email=null, image=null, theme=null}) {//We get rid of undefined values and initialize to null
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
        if(theme)
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

        if(keys.indexOf("image")!=-1)//if we are updating the image, we change the field from the data from the image
            this["image"] = '/img/' + uploadFile(this["image"])//to it's path in the back end

        return `(${keys.reduce((fieldStr,currKey,index)=>`${fieldStr} ${(index>0)?',':''} ${currKey} `,"")}) VALUES (${values.reduce((fieldStr,currValue,index)=>fieldStr+`${(index>0)?',':''}"${currValue}"`,"")})`;
    }

    static async getSet(req_body,toChange){ //Transform the the object (the request body) into a succession of "[key] = [value]" with commas 
        let keys = Object.keys(req_body)
        let values = Object.values(req_body);
        if(keys.length==0)
            throw new Error("Error: Empty body")
        let result = keys[0]+" = \""+values[0]+'\"'
        for(let i=1;i<keys.length;i++){
            if(keys[i]=="fields"){
                User.updateFields(toChange,req_body["fields"])
            }else{
                if(keys[i]=="theme"){
                    keys[i]="themeID"
                    values[i] = await User.updateTheme(req_body["theme"])
                }
                result+= `, ${keys[i]} = "${values[i]}"`
            }
        }
        return result;
    }

    static getTheme(themeObject){
        return [themeObject.primary_color,themeObject.secondary_color,themeObject.ternary_color,themeObject.quaternary_color,themeObject.quinary_color]
    }

    //Remote getters

    static async getUserInfoName(info,name){ //to get info with the name
        if(info=="skills"){
            let queryRes = await connection.promise().query(`SELECT Skills.name FROM Masters JOIN Users ON Masters.userID=Users.userID JOIN Skills ON Masters.skillID=Skills.skillID WHERE Users.nickName ="${name}"`)
            return await Promise.all(queryRes[0].map(async(skill)=>{return await Skills.readOne(skill.name)}))
        }
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
        let req3 = await connection.promise().query(`SELECT Skills.name FROM Masters JOIN Users ON Masters.userID=Users.userID JOIN Skills ON Masters.skillID=Skills.skillID WHERE Users.nickName ="${toReadName}"`)
        let part3 = await Promise.all(req3[0].map(async(skill)=>{return await Skills.readOne(skill.name)}))
        let req4 = await connection.promise().query(`SELECT Themes.primary_color,Themes.secondary_color,Themes.ternary_color,Themes.quaternary_color,Themes.quinary_color FROM Themes JOIN Users ON Users.themeID=Themes.themeID WHERE Users.nickName ="${toReadName}"`)
        return {...req1[0][0],interests:req2[0],masters:part3,theme:User.getTheme(req4[0][0])}
    };
    
    static async readOneAdmin(toReadName) {
        let req1 = await connection.promise().query(`SELECT firstName,lastName,nickName,color, image,email,password FROM Users WHERE nickName = "${toReadName}"`);
        let req2 = await connection.promise().query(`SELECT Fields.name,Fields.description,Fields.color FROM Interests JOIN Users ON Interests.userID=Users.userID JOIN Fields ON Interests.fieldID=Fields.fieldID WHERE Users.nickName ="${toReadName}"`)
        let req3 = await connection.promise().query(`SELECT Skills.name FROM Masters JOIN Users ON Masters.userID=Users.userID JOIN Skills ON Masters.skillID=Skills.skillID WHERE Users.nickName ="${toReadName}"`)
        let part3 = await Promise.all(req3[0].map(async(skill)=>{return await Skills.readOne(skill.name)}))
        let req4 = await connection.promise().query(`SELECT Themes.primary_color,Themes.secondary_color,Themes.ternary_color,Themes.quaternary_color,Themes.quinary_color FROM Themes JOIN Users ON Users.themeID=Themes.themeID WHERE Users.nickName ="${toReadName}"`)
        return {...req1[0][0],interests:req2[0],masters:part3,theme:User.getTheme(req4[0][0])}
    };

    static async readAll(constraint = null) {
        let query = "SELECT nickName, color, image FROM Users";
        if(constraint)
            query+= " WHERE "+constraint;
        return connection.promise().query(query)
    };     

    static async update(toUpdate) {
        let set = await User.getSet(toUpdate[0],toUpdate[1])
        return connection.promise().query("UPDATE Users SET "+set+" WHERE nickName = \""+toUpdate[1]+"\"")
            .catch((err)=>{
                throw new Error("No User corresponding to this ID")
            });
    };
    
    
    static async destroy(bountyName) {
        return connection.promise().query("DELETE FROM Users WHERE nickName = \""+bountyName+"\"").then((result)=>({deletedRows:result[0].affectedRows, deletedName:bountyName}));;
    };     

    //Relationship modifications

    static async addInterest(userName,fieldName){
        let userID = await User.getUserInfoName("userID", userName)
        let fieldID = await connection.promise().query(`SELECT fieldID FROM Fields WHERE name="${fieldName}"`);
        connection.promise().query(`INSERT INTO Interests(userID,fieldID) VALUES ("${userID}","${fieldID[0][0].fieldID}")`);
    }

    static removeInterest(userName,fieldName){
        connection.promise().query(`DELETE Interests FROM Interests JOIN Users ON Interests.userID=Users.userID JOIN Fields ON Interests.fieldID=Fields.fieldID WHERE Users.nickName ="${userName}" AND Fields.name ="${fieldName}"`);
    }

    static async updateFields(userName, fields){
        let previous = await connection.promise().query(`SELECT Fields.name,Fields.description,Fields.color FROM Interests JOIN Users ON Interests.userID=Users.userID JOIN Fields ON Interests.fieldID=Fields.fieldID WHERE Users.nickName ="${userName}"`)
        let toAdd = fields.filter((field)=>previous[0].map(prevField=>prevField.name).indexOf(field.name)==-1)
        let toRem = previous[0].filter((field)=>fields.map(newField=>newField.name).indexOf(field.name)==-1)
        toAdd.forEach(field=>User.addInterest(userName,field.name))
        toRem.forEach(field=>User.removeInterest(userName,field.name))
    }
    static async updateTheme(colors){
        let insert = await connection.promise().query(`INSERT INTO Themes(primary_color,secondary_color,ternary_color,quaternary_color,quinary_color) VALUES ("${colors[0]}","${colors[1]}","${colors[2]}","${colors[3]}","${colors[4]}")`)
        return insert[0].insertId
    }

    static async addMastery(userName, skillName){
        let userID = await User.getUserInfoName("userID", userName)
        let skillID = await connection.promise().query(`SELECT skillID FROM Skills WHERE name="${skillName}"`);
        connection.promise().query(`INSERT INTO Masters(userID,skillID) VALUES ("${userID}","${skillID}")`);
    }

}

module.exports = User