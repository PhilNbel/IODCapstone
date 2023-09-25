"use strict";
const Models = require("../models");

const getSkill = (req,res) => {
    console.log(req.params.name)
    Models.Skills.readOne(req.params.name).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        res.send({ result: 500, error:"No skill corresponding to this id"} )
    })
}

const getSkills = (res) => {
    Models.Skills.readAll().then(function (data) {
        res.send({ result: 200, data: data[0] })
    })/*.catch(err => {
        res.send({ result: 500, error:"An error occured while fetching skills"} )
    })*/
}

const createSkill = (data, res) => {
    Models.Skills.create(data).then(function (data) {
        res.send({ result: 200, message: "Skill successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:err} )
    })
}

const updateSkill = (req, res) => {
    Models.Skills.update([req.body,req.params.name]).then(function (data) {
        if(data[0].affectedRows ==0)
            throw new Error("No skill "+req.params.name+" to update");
        res.send({ result: 200, message: "Skill "+req.params.name+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteSkill = (req, res) => {
    let skillName = req.params.name;
    Models.Skills.destroy(skillName).then(function (data) {
        let skillsDeleted = data.deletedRows;
        if(skillsDeleted == 0) throw new Error("No skill with name "+skillName+" to delete");
        res.send({ result: 200, message:`Successfully deleted skill ${skillName}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getSkill, getSkills, createSkill, updateSkill, deleteSkill
}