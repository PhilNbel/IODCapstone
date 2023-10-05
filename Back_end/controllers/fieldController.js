"use strict";
const Models = require("../models");
//Basic CRUD operations for fields
const getField = (req,res) => {
    Models.Fields.readOne(req.params.name).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        res.send({ result: 500, error:err.message} )
    })
}

const getFields = (res) => {
    Models.Fields.readAll().then(function (data) {
        res.send({ result: 200, data: data[0] })
    }).catch(err => {
        res.send({ result: 500, error:"An error occured while fetching Fields"} )
    })
}

const createField = (data, res) => {
    Models.Fields.create(data).then(function (data) {
        res.send({ result: 200, message: "Field "+data.insertName+" successfully created"})
    }).catch(err => {
        res.send({ result: 500, error:err.message} )
    })
}

const updateField = (req, res) => {
    Models.Fields.update([req.body,req.params.name]).then(function (data) {
        if(data[0].affectedRows ==0)
            throw new Error("No field "+req.params.name+" to update");
        res.send({ result: 200, message: "Field "+req.params.name+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteField = (req, res) => {
    let fieldName = req.params.name;
    Models.Fields.destroy(fieldName).then(function (data) {
        let fieldsDeleted = data.deletedRows;
        if(fieldsDeleted == 0) throw new Error("No field with name "+fieldName+" to delete");
        res.send({ result: 200, message:`Successfully deleted field ${data.deletedName}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getField, getFields, createField, updateField, deleteField
}