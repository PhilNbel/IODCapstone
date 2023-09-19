"use strict";
const Models = require("../models");

const getCategory = (req,res) => {

    Models.Categories.findOne(req.params.id).then(function (data) {
        res.send({ result: 200, data: data[0][0] })
    }).catch(err => {
        res.send({ result: 500, error:"No Category corresponding to this id"} )
    })
}

const getCategories = (res) => {
    Models.Categories.findAll().then(function (data) {
        res.send({ result: 200, data: data })
    })/*.catch(err => {
        res.send({ result: 500, error:"An error occured while fetching categories"} )
    })*/
}

const createCategory = (data, res) => {
    Models.Categories.create(data).then(function (data) {
        res.send({ result: 200, message: "Category successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid category format: category needs a names"} )
    })
}

const updateCategory = (req, res) => {
    Models.Categories.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Category #"+req.params.id+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteCategory = (req, res) => {
    let categoryId = req.params.id;
    Models.Categories.destroy(categoryId).then(function (data) {
        let categoriesDeleted = data[0].affectedRows;
        if(categoriesDeleted == 0) throw new Error("No Category with ID "+categoryId+" to delete");
        res.send({ result: 200, message:`Successfully deleted ${categoriesDeleted} categor${(categoriesDeleted>1)?"ies":"y"}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getCategory, getCategories, createCategory, updateCategory, deleteCategory
}