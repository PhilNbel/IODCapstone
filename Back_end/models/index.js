'use strict'

const Skills = require('./skill') //require the model
const Fields = require('./field') //require the model
const Users = require('./user') //require the model
const Projects = require('./project') //require the model
const Tasks = require('./task') //require the model
const Steps = require('./step') //require the model

module.exports = {
    Skills,Fields,Users,Projects,Steps,Tasks //export the model
};