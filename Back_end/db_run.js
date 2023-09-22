const mysql = require("mysql2");
const fs = require("fs");
const tests = require("./tests");
// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database."); 
    //init().then((res)=>res = tests.testLinks(connection,"Masters"))
});

async function init(){
    //We initialize the database structure after connection
    return connection.promise().query(fs.readFileSync("db_creation.sql").toString())    
    .then(async(response)=> {
        response = await connection.promise().query(fs.readFileSync("test_data.sql").toString());
        return response[0];
    })
    //.catch (err=>(`Error "${err}" happened during initialization`))
}

module.exports = connection;