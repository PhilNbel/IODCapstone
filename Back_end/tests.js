'use strict'
function testCreate(){
    
}
function testRead(){
    
}
function testUpdate(){
    
}
function testDelete(){
    
}

async function testLinks(connection, table){
    let result = [];
    switch (table){
        case "Masters":
            result = await connection.promise().query("SELECT Users.firstName,Skills.name FROM Masters JOIN Users ON Users.userID = Masters.userID JOIN Skills ON Skills.skillID=Masters.skillID");
            break;
        default:
            result = ["No such table"]
            break;
    }
    console.log(result[0]);
}

module.exports={
 testCreate, testRead, testUpdate, testDelete, testLinks
}