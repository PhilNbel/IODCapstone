const mysql = require("mysql2");
require("dotenv").config();

console.log(DB_HOST)
console.log(DUB_USER)
process.env.DB_HOST=(process.env.DB_HOST!='localhost')?process.env.DB_HOST:"prod-db.c5n9s8zzabuw.ap-southeast-2.rds.amazonaws.com";

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
    if (error)
        throw new Error(error)
    else
        console.log(`Successfully connected to the ${process.env.DB_HOST}/${process.env.DB_NAME} database.`); 
});

module.exports = connection;