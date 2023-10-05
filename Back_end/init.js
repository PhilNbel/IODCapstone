const fs = require("fs");
const tests = require("./tests");

const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "dev"}` }); // support multiple environments, see package.json

//const server = require("./server")
const connection = require("./db_run"); // example using mysql2 package - first run 'npm install mysql2'
init()//.then((res)=>res = tests.testBattery())

async function init(){
    //We initialize the database structure after connection
    return connection.promise().query(fs.readFileSync("db_creation.sql").toString())    
    .then(async(response)=> {
        try{
            response = await connection.promise().query(fs.readFileSync("test_data.sql").toString());
            console.log('Initialised successfully')
        }catch(err){
            console.log(err)
        }
        return response[0];
    })
    .catch (err=>(`Error "${err}" happened during initialization`))
}