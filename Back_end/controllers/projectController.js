"use strict";
const Models = require("../models");

const getProject = (req,res) => {

    Models.Projects.findOne(req.params.id).then(function (data) {
        res.send({
                result: 200,
                data: {
                        name:"Placeholder project",
                        steps:[
                            {
                                name:"step1",
                                description:"a placeholder step",
                                status:"toDo",
                                tasks:[
                                    { name:"doing this", status:"isDone" },
                                    { name:"doing that", status:"toDo" }
                                ]
                            },
                            {
                                name:"step2",
                                description:"a placeholder step too",
                                status:"toDo",
                                tasks:[
                                    { name:"love this", status:"toDo" },
                                    { name:"love that", status:"toDo" }
                                ]
                            }
                        ]
                    }
                });
    }).catch(err => {
        res.send({ result: 500, data: {error:"No Project corresponding to this id"} })
    })
}

const getProjects = (res) => {
    Models.Projects.findAll().then(function (data) {
        res.send({ result: 200, data:[
            {
                name:"Placeholder project",
                steps:[
                    {
                        name:"step1",
                        description:"a placeholder step",
                        status:"toDo",
                        tasks:[
                            { name:"doing this", status:"isDone" },
                            { name:"doing that", status:"toDo" }
                        ]
                    },
                    {
                        name:"step2",
                        description:"a placeholder step too",
                        status:"toDo",
                        tasks:[
                            { name:"love this", status:"toDo" },
                            { name:"love that", status:"toDo" }
                        ]
                    }
                ]
            },
            {
                name:"Second placeholder project",
                steps:[
                    {
                        name:"step s.1",
                        description:"a placeholder step",
                        status:"isDone",
                        tasks:[
                            { name:"s.doing this", status:"isDone" },
                            { name:"s.doing that", status:"toDo" }
                        ]
                    },
                    {
                        name:"step s.2",
                        description:"a placeholder step too",
                        status:"isDone",
                        tasks:[
                            { name:"love s.this", status:"isDone" },
                            { name:"love s.that", status:"isDone" }
                        ]
                    }
                ]
            }
        ]})
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const createProject = (data, res) => {
    Models.Projects.create(data).then(function (data) {
        console.log("Project successfully created with ID "+data.insertId)
        res.send({ result: 200, message: "Project "+data.insertName+" successfully created"})
    }).catch(err => {
        res.send({ result: 500, error:err.message} )
    })
}
const updateProject = (req, res) => {
    Models.Projects.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Successfully updated Project #"+req.params.id })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteProject = (req, res) => {
    let projectName = req.params.name;
    let projectCreator = req.body.creator;

    Models.Projects.destroy(projectName,projectCreator).then(function (data) {
        if(data.deleted == 0) throw new Error("No project \""+projectName+"\" to delete");
        res.send({ result: 200, message:`Successfully deleted project ${data.name}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getProject, getProjects, createProject, updateProject, deleteProject
}