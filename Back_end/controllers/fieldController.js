"use strict";
const Models = require("../models");

const getField = (req,res) => {
    Models.Fields.readOne(req.params.name).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        console.log(err.message)
        res.send({ result: 500, error:"No field with name "+req.params.name} )
    })
}

const getFields = (res) => {
    Models.Fields.readAll().then(function (data) {
        res.send({ result: 200, data: data[0] })
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
    Models.Fields.update({...req.body,id:req.params.name}).then(function (data) {
        res.send({ result: 200, message: "Field #"+req.params.name+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteField = (req, res) => {
    let fieldId = req.params.name;
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