'use strict'

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
    .catch((err)=>console.log('ERROR\n'+err))
}

async function testCreate(){
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
    testReadAll()
    .then((result)=>{ console.log(result); return testCreate()})
    .then((result)=>{ console.log(result); return testReadOne()})
    .then((result)=>{ console.log(result); return testUpdate()})
    .then((result)=>{ console.log(result); return testReadOne()})
    .then((result)=>{ console.log(result); return testDelete()})
    .then((result)=>{ console.log(result); return testReadAll()})
}

module.exports={
 testBattery
}

/*
*/