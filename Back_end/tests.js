'use strict'
let path = "localhost:8080/api/"
async function test(url, method, body=null){ 
    console.log(path+url)
    let promise = (method == "GET")?
        fetch(path+url)
        :
        fetch(path+url,{
            method: method,
            body: JSON.stringify(body)
        });
    return promise 
    .then((response) => response.json())
    .then((json)=>console.log(json))
}

function testCreate(){
    test('users/create','POST', {"firstName":"Thomas", "lastName":"Knight", "nickName":"FidjiC7", "password":"motdepasse"})   
    test('fields/create','POST', {"name":"testField", "description":"testingArea"})   
    test('skills/create','POST', {"name":"testing", "description":"toTest", "field":"testField"})   
}

function testReadOne(){
    test('users/fidjic7','GET');
    test('fields/testfield','GET');
    test('skills/testing','GET');
}
function testReadAll(){
    test('users','GET');
    test('fields','GET');
    test('skills','GET');
}

function testUpdate(){
    test('users/fidjic7','PUT', {"firstName":"Thomas", "lastName":"Chevalier", "nickName":"FidjiC7"})   
    test('fields/testField','PUT', {"name":"testField", "description":"used Testing Area"})   
    test('skills/testing','PUT', {"name":"testing", "description":"tested", "field":"testField"})   
}
function testDelete(){
    test('users/fidjic7','DELETE',{})   
    test('fields/testField','DELETE',{})   
    test('skills/testing','DELETE',{})   
}

function testBattery(){
    testReadAll();
    testCreate();
    testReadOne();
    testUpdate();
    testReadOne();
    testDelete();
    testReadAll();
}

module.exports={
 testBattery
}