let connection = require("../db_run");

class User {
    constructor({name, isCategory}) {
        this.name = name;
        if(typeof(isCategory)!= "boolean") throw new Error("Invalid format");
        this.isCategory = isCategory;
    }
    async toInsert(){
        let result = await connection.promise().query(`SELECT ${(this.isCategory)?'categoryID':'itemID'} FROM ${(this.isCategory)?'categories':'items'} WHERE name="${this.name}"`);
        return Object.values(result[0][0])[0];
    }

    static async getSet(req_body){
        let result = await connection.promise().query(`SELECT ${(req_body.isCategory)?'categoryID':'itemID'} FROM ${(req_body.isCategory)?'categories':'items'} WHERE name="${req_body.name}"`);
        return `${(req_body.isCategory)?'categoryID':'itemID'} = ${Object.values(result[0][0])[0]}`;
    }

    static async create(newUser) {
        let mergedProf = new User(newUser)
        return connection.promise().query(`INSERT INTO users(${(mergedProf.isCategory)?'categoryID':'itemID'}) VALUES (${await mergedProf.toInsert()})`);
    };


    static async update(updatedUser) {
        console.log(updatedUser)
        return connection.promise().query("UPDATE users SET "+await User.getSet(updatedUser)+" WHERE userID = "+updatedUser.id);
    };
    
    static destroy(deletedUserId) {
        return connection.promise().query("DELETE FROM users WHERE userID = "+deletedUserId);
    };     

    static async findOne(toFindId){
        return connection.promise().query("SELECT * FROM users WHERE userID = "+toFindId)
            .then((response)=>{
                let result = response[0][0];
                return (result.itemID)?
                    connection.promise().query("SELECT name FROM items WHERE itemID = "+result.itemID).then((nameResult)=>({userID:response[0][0].userID,name:nameResult[0][0].name,type:'item',itemID:result.itemID}))
                :
                    connection.promise().query("SELECT name FROM categories WHERE categoryID = "+result.categoryID).then((nameResult)=>({userID:response[0][0].userID,name:nameResult[0][0].name,type:'category',categoryID:result.categoryID}))
                ;
            })
    }

    static async findAll() {
        return connection.promise().query("SELECT * FROM users")
            .then((responseArray)=>{
                    return Promise.all(responseArray[0].map((response)=>{
                        let result = response;
                        return (result.itemID)?
                            connection.promise().query("SELECT name FROM items WHERE itemID = "+result.itemID).then((nameResult)=>({userID:response.userID,name:nameResult[0][0].name, type:'item'}))
                        :
                            connection.promise().query("SELECT name FROM categories WHERE categoryID = "+result.categoryID).then((nameResult)=>({userID:response.userID,name:nameResult[0][0].name,type:'category'}))
                        ;
                    }))
            })
    };     

    static sync(){}
}

module.exports = User