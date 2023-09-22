"use strict";
const Models = require("../models");

const getSkill = (req,res) => {
    console.log(req.params.name)
    Models.Skills.readOne(req.params.name).then(function (data) {
        res.send({ result: 200, data: { name:"Placeholder skill", skills:["skill1","skill2"]} })
    }).catch(err => {
        res.send({ result: 500, error:"No skill corresponding to this id"} )
    })
}

const getSkills = (res) => {
    Models.Skills.readAll().then(function (data) {
        res.send({ result: 200, data: [{name:"Placeholder skill", skills:["skill1","skill2"]},{name:"Placeholder skill2", skills:["skill4","skill3"]}] })
    })/*.catch(err => {
        res.send({ result: 500, error:"An error occured while fetching skills"} )
    })*/
}

const createSkill = (data, res) => {
    Models.Skills.create(data).then(function (data) {
        res.send({ result: 200, message: "Skill successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid skill format: skill needs a name"} )
    })
}

const updateSkill = (req, res) => {
    Models.Skills.update({...req.body,id:req.params.name}).then(function (data) {
        res.send({ result: 200, message: "Skill #"+req.params.name+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteSkill = (req, res) => {
    let skillName = req.params.name;
    Models.Skills.destroy(skillName).then(function (data) {
        let skillsDeleted = data[0].affectedRows;
        if(skillsDeleted == 0) throw new Error("No skill with name "+skillName+" to delete");
        res.send({ result: 200, message:`Successfully deleted skill ${skillName}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getSkill, getSkills, createSkill, updateSkill, deleteSkill
}