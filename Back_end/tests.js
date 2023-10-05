'use strict'
//This file contains the api calls to modify the database and test the CRUD operations
//It is currently testing for users, fields, skills and projects
const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "dev"}` }); // support multiple environments, see package.json

const PORT = process.env.PORT || 8080;

let path = process.env.API+":"+PORT+"/api/"
async function test(url, method='GET',body=null){ //function to test the API routes
    let promise = (method == "GET")?
        fetch(path+url)
        :
        fetch(path+url,{
            headers: {
                "Content-Type": "application/json"
              },
            method: method,
            body:JSON.stringify(body)
        });
    return promise
    .then((response) => response.json())
    .then((json)=>console.log(json))//JSON.stringify(json)))
    .catch((err)=>console.log(err))//console.log('ERROR\n'+err))
}

async function testCreate(){//Tests the creation of different elements
    return test('users/create','POST', {"firstName":"Thomas", "lastName":"Knight", "nickName":"FidjiC7", "password":"motdepasse"})   
    .then((res)=>res = test('fields/create','POST', {"name":"testField", "description":"testingArea"}))
    .then((res)=>res = test('skills/create','POST', {"name":"testing skill", "description":"toTest", "field":"testField"}))
    .then((res)=>res = test('projects/create','POST', {"type":"Professional", "name":"Capstone project", "description":"The project that completes the Software Engineering course", "isPrivate":1, "budget":20, "budgetIsShared":0, "isOpen":0, "creator":"Eovius"}))
    .then((res)=>"Finished testing CREATE")

     
}

async function testReadOne(){//reads one element specifically, obtaining more information
    return test('users/fidjic7','GET')
    .then((res)=>res = test('fields/testField','GET'))
    .then((res)=>res = test('skills/testing%20skill','GET'))
    .then((res)=>res = test('users/eovius/capstone%20project','GET'))
//    .then((res)=>res = test('users/eovius/capstone%20project/test%20step','GET'))
    .then((res)=>"Finished testing individual READ")
}
async function testReadAll(){//lists the general informations of all the elements of the field
    return test('users','GET')
    .then((res)=>res = test('fields','GET'))
    .then((res)=>res = test('skills','GET'))
    .then((res)=>res = test('projects','GET'))
    .then((res)=>"Finished testing general READ")
}

async function testUpdate(){//updates one of each element with correct values
    return test('users/fidjic7','PUT', {"firstName":"Thomas", "lastName":"Chevalier", "nickName":"FidjiC7", "password":"m0d3p4s"})
    .then((res)=>res = test('fields/testField','PUT', {"name":"testField", "description":"used Testing Area"}))   
    .then((res)=>res = test('skills/testing%20skill','PUT', {"name":"testing skill", "description":"tested", "field":"testField"}))
    .then((res)=>"Finished testing UPDATE")
}
async function testDelete(){//delete the elements created earlier to keep the database clean
    return test('users/fidjic7','DELETE',{})
    .then((res)=>res = test('skills/testing%20skill','DELETE',{}))
    .then((res)=>res = test('fields/testField','DELETE',{}))
    .then((res)=>"Finished testing DELETE")
}

async function testBattery(){
    testReadAll() //We list the existing elements
    .then((result)=>{ console.log(result); return testCreate()}) //We create new ones
    .then((result)=>{ console.log(result); return testReadOne()}) //We look them up
    .then((result)=>{ console.log(result); return testUpdate()}) //We modify them
    .then((result)=>{ console.log(result); return testReadOne()}) //We check they changed
    .then((result)=>{ console.log(result); return testDelete()}) //We delete them
    .then((result)=>{ console.log(result); return testReadAll()}) //We checked they do not exist anymore
}

module.exports={
 testBattery
}

/*
*/