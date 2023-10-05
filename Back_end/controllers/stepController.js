"use strict";
const Models = require("../models");
//Methods for steps and tasks, as tasks should not be interacted with individually
//They should only be interacted with through steps

//Step methods
const getStep = (req,res) => {

    Models.Steps.readOne(req.params.step, req.params.project,req.params.name).then(function (data) {
        res.send(data)
    }).catch(err => {
        res.send({ result: 500, data: {error:"No Step corresponding to this name"} })
    })
}

const getSteps = (res) => {
    Models.Steps.readAll().then(function (data) {
        res.send(data).catch(err => {
            res.send({ result: 500, error: err.message })
        })
    })
}

const createStep = (req, res) => {
    Models.Steps.create(req.body, req.params.step,req.params.project).then(function (data) {
        res.send({ result: 200, message: "Step successfully created with ID "+data[0].name })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid step format: Step needs a name, a description and a project"} )
    })
}
const updateStep = (req, res) => {
    Models.Steps.update(req.body,req.params.step, req.params.project,req.params.name).then(function (data) {
        res.send({ result: 200, message: "Successfully updated Step #"+req.params.name })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

const deleteStep = (req, res) => {
    Models.Steps.destroy(req.params.step, req.params.project,req.params.name).then(function (data) {
        let StepsDeleted = data[0].affectedRows;
        if(StepsDeleted == 0) throw new Error("No step with name "+stepName+" to delete");
        res.send({ result: 200, message:`Successfully deleted Step ${req.params.name}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

//Task methods
const getTasks = (req,res)=>{
    Models.Tasks.read(req.params.step,req.params.project,req.params.name).then(function (data) {
        res.send(data)
        .catch(err => {
            res.send({ result: 500, error: err.message })
        })
    })
}
const createTask = (req,res)=>{
    Models.Tasks.create(req.body, req.params.step,req.params.project,req.params.name).then(function (data) {
        res.send({ result: 200, message: "Task successfully created with ID "+data[0].name })
    }).catch(err => {
        res.send({ result: 500, error:"Invalid Task format: Task needs a name and a description"} )
    })

}
const updateTask = (req,res)=>{
    Models.Tasks.update(req.body,req.params.step,req.params.project,req.params.name).then(function (data) {
        res.send({ result: 200, message: "Successfully updated Task #"+req.params.name })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}
const deleteTask = (req,res)=>{

    let taskName = req.params.name;

    Models.Tasks.destroy(taskName).then(function (data) {
        let TasksDeleted = data[0].affectedRows;
        if(TasksDeleted == 0) throw new Error("No Task with name "+taskName+" to delete");
        res.send({ result: 200, message:`Successfully deleted Task ${taskName}` })
    }).catch(err => {
        res.send({ result: 500, error: err.message })
    })
}

module.exports = {
    getStep, getSteps, createStep, updateStep, deleteStep, getTasks, createTask, updateTask, deleteTask
}