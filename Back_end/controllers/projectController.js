"use strict";
const Models = require("../models");
//Basic CRUD operations for projects
const getProject = (req,res) => {
    Models.Projects.readOne(req.params.project,req.params.name).then(function (data) {
        res.send({ result: 200, data: data });
    }).catch(err => {
        res.send({ result: 500, data: {error:err.message} })
    })
}

const getProjects = (res) => {
    Models.Projects.readAll().then(function (data) {
        res.send({ result: 200, data:data})
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const createProject = (req_body, res) => {
    Models.Projects.create(req_body).then(function (data) {
        res.send({ result: 200, message: "Project "+data.name+" successfully created"})
    }).catch(err => {
        res.send({ result: 500, error:err.message} )
    })
}

const updateProject = (req, res) => {
    Models.Projects.update([req.body,req.params.project,req.params.name]).then(function (data) {
        if(data[0].affectedRows ==0)
            throw new Error("No project "+req.params.name+" to update");
        res.send({ result: 200, message: "Project "+req.params.name+" updated succesfully" })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteProject = (req, res) => {
    let projectName = req.params.project;
    let projectCreator = req.params.name;

    Models.Projects.destroy(projectName,projectCreator).then(function (data) {
        if(data.deleted == 0) throw new Error("No project \""+projectName+"\" to delete");
        res.send({ result: 200, message:`Successfully deleted project ${data.deletedName}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getProject, getProjects, createProject, updateProject, deleteProject
}