"use strict";
const Models = require("../models");

const getItem = (req,res) => {

    Models.Items.findOne(req.params.id).then(function (data) {
        res.send({ result: 200, data: data[0][0] })
    }).catch(err => {
        res.send({ result: 500, error:"No item corresponding to this id"} )
    })
}

const getItems = (res) => {
    Models.Items.findAll().then(function (data) {
        res.send({ result: 200, data: data[0] })
    }).catch(err => {
        res.send({ result: 500, error:"An error occured while fetching items"} )
    })
}

const createItem = (data, res) => {
    Models.Items.create(data).then(function (data) {
        res.send({ result: 200, message: "Item successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid item format: Item needs a name and a price"} )
    })
}

const updateItem = (req, res) => {
    Models.Items.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Item #"+req.params.id+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteItem = (req, res) => {
    let itemId = req.params.id;
    Models.Items.destroy(itemId).then(function (data) {
        let itemsDeleted = data[0].affectedRows;
        if(itemsDeleted == 0) throw new Error("No item with ID "+itemId+" to delete");
        res.send({ result: 200, message:`Successfully deleted ${itemsDeleted} item${(itemsDeleted>1)?"s":""}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getItem, getItems, createItem, updateItem, deleteItem
}