"use strict";
const Models = require("../models");

const getProficiency = (req,res) => {

    Models.Proficiencies.findOne(req.params.id).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        res.send({ result: 500, data: {error:"No proficiency corresponding to this id"} })
    })
}

const getProficiencies = (res) => {
    Models.Proficiencies.findAll().then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const createProficiency = (data, res) => {
    Models.Proficiencies.create(data).then(function (data) {
        res.send({ result: 200, message: "Proficiency successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid Proficiency format: proficiency needs a name and a boolean telling if it is a category (or an item otherwise)"} )
    })
}
const updateProficiency = (req, res) => {
    Models.Proficiencies.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Successfully updated proficiency #"+req.params.id })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteProficiency = (req, res) => {
    let proficiencyID = req.params.id;

    Models.Proficiencies.destroy(proficiencyID).then(function (data) {
        let proficienciesDeleted = data[0].affectedRows;
        if(proficienciesDeleted == 0) throw new Error("No proficiency with ID "+proficiencyID+" to delete");
        res.send({ result: 200, message:`Successfully deleted ${proficienciesDeleted} proficienc${(proficienciesDeleted>1)?"ies":"y"}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getProficiency, getProficiencies, createProficiency, updateProficiency, deleteProficiency
}