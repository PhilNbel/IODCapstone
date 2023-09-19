"use strict";
const Models = require("../models");

const getField = (req,res) => {

    Models.Fields.findOne(req.params.id).then(function (data) {
        res.send({ result: 200, data: { name:"Placeholder Field", skills:["skill1","skill2"]} })
    }).catch(err => {
        res.send({ result: 500, error:"No Field corresponding to this id"} )
    })
}

const getFields = (res) => {
    Models.Fields.findAll().then(function (data) {
        res.send({ result: 200, data: [{name:"Placeholder Field", skills:["skill1","skill2"]},{name:"Placeholder Field2", skills:["skill4","skill3"]}] })
    })/*.catch(err => {
        res.send({ result: 500, error:"An error occured while fetching Fields"} )
    })*/
}

const createField = (data, res) => {
    Models.Fields.create(data).then(function (data) {
        res.send({ result: 200, message: "Field successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid field format: field needs a name"} )
    })
}

const updateField = (req, res) => {
    Models.Fields.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Field #"+req.params.id+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteField = (req, res) => {
    let fieldId = req.params.id;
    Models.Fields.destroy(fieldId).then(function (data) {
        let fieldsDeleted = data[0].affectedRows;
        if(fieldsDeleted == 0) throw new Error("No field with ID "+fieldId+" to delete");
        res.send({ result: 200, message:`Successfully deleted ${fieldsDeleted} categor${(fieldsDeleted>1)?"ies":"y"}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getField, getFields, createField, updateField, deleteField
}