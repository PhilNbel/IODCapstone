'use strict'
let path = "http://localhost:8080/api/"
async function test(url, method, body=null){
    console.log(body)
    let promise = (method == "GET")?
        fetch(path+url)
        :
        fetch(path+url,{
            method: method,
            body:body
        });
    return promise
    .then((response) => response.json())
    .then((json)=>console.log(json))
}

async function testCreate(){
    return test('users/create','POST', {"firstName":"Thomas", "lastName":"Knight", "nickName":"FidjiC7", "password":"motdepasse"})   
    .then((res)=>res = test('fields/create','POST', {"name":"testField", "description":"testingArea"}))   
    .then((res)=>res = test('skills/create','POST', {"name":"testing", "description":"toTest", "field":"testField"}))
    .then((res)=>"Finished testing CREATE")
     
}

async function testReadOne(){
    return test('users/fidjic7','GET')
    .then((res)=>res = test('fields/testfield','GET'))
    .then((res)=>res = test('skills/testing','GET'))
    .then((res)=>"Finished testing CREATE")
}
async function testReadAll(){
    return test('users','GET')
    .then((res)=>res = test('fields','GET'))
    .then((res)=>res = test('skills','GET'))
    .then((res)=>"Finished testing CREATE")
}

async function testUpdate(){
    return test('users/fidjic7','PUT', {"firstName":"Thomas", "lastName":"Chevalier", "nickName":"FidjiC7", "password":"m0d3p4s"})
    .then((res)=>res = test('fields/testField','PUT', {"name":"testField", "description":"used Testing Area"}))   
    .then((res)=>res = test('skills/testing','PUT', {"name":"testing", "description":"tested", "field":"testField"}))
    .then((res)=>"Finished testing CREATE")
}
async function testDelete(){
    return test('users/fidjic7','DELETE',{})
    .then((res)=>res = test('fields/testField','DELETE',{}))   
    .then((res)=>res = test('skills/testing','DELETE',{}))
    .then((res)=>"Finished testing CREATE")
}

async function testBattery(){
    testReadAll()
    .then((result)=>{ console.log(result); return testCreate()})
    .then((result)=>{ console.log(result); return testReadOne()})
    .then((result)=>{ console.log(result); return testUpdate()})
    .then((result)=>{ result = testReadOne(); console.log("Testing individual READ calls")})
    .then((result)=>{ result = testDelete(); console.log("Testing DELETE calls")})
    .then((result)=>{ result = testReadAll(); console.log("Testing general READ calls")})
}

module.exports={
 testBattery
}