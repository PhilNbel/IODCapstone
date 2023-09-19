"use strict";
const Models = require("../models");

const getStep = (req,res) => {

    Models.Steps.findOne(req.params.id).then(function (data) {
        res.send({ result: 200, data:
                {
                    name:"step1",
                    description:"a placeholder step",
                    status:"toDo",
                    tasks:[
                        { name:"doing this", status:"isDone" },
                        { name:"doing that", status:"toDo" }
                    ]
                }
            })
    }).catch(err => {
        res.send({ result: 500, data: {error:"No Step corresponding to this id"} })
    })
}

const getSteps = (res) => {
    Models.Steps.findAll().then(function (data) {
        res.send({ result: 200, data:[
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
            },
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
            }]
        }).catch(err => {
            res.send({ result: 500, error: err.message })
        })
    })
}

const createStep = (data, res) => {
    Models.Steps.create(data).then(function (data) {
        res.send({ result: 200, message: "Step successfully created with ID "+data[0].insertId })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid Step format: Step needs a name and a boolean telling if it is a category (or an item otherwise)"} )
    })
}
const updateStep = (req, res) => {
    Models.Steps.update({...req.body,id:req.params.id}).then(function (data) {
        res.send({ result: 200, message: "Successfully updated Step #"+req.params.id })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteStep = (req, res) => {
    let StepID = req.params.id;

    Models.Steps.destroy(StepID).then(function (data) {
        let StepsDeleted = data[0].affectedRows;
        if(StepsDeleted == 0) throw new Error("No Step with ID "+StepID+" to delete");
        res.send({ result: 200, message:`Successfully deleted ${StepsDeleted} proficienc${(StepsDeleted>1)?"ies":"y"}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getStep, getSteps, createStep, updateStep, deleteStep
}