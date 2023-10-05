let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
let {uploadFile} = require("../middleware/uploads"); //index.js

//Task methods

//There is no method supposed to get an individual task

router.post('/:name/:project/:step/task', (req, res) => {
    Controllers.stepController.createTask(req,res);
})
router.put('/:name/:project/:step/task', (req, res) => {
    Controllers.stepController.updateTask(req,res);
})
router.delete('/:name/:project/:step/task', (req, res) => {
    Controllers.stepController.deleteTask(req,res);
})
//The CUD operations are made through 'task'. The name is in the body, as there is no name redundance in a step

//Step methods

router.get('/:name/:project/:step', (req, res) => {
    Controllers.stepController.getStep(req,res);
})
router.post('/:name/:project/step', (req, res) => {
    Controllers.stepController.createStep(req,res);
})
router.put('/:name/:project/:step', (req, res) => {
    Controllers.stepController.updateStep(req,res);
})
router.delete('/:name/:project/:step', (req, res) => {
    Controllers.stepController.deleteStep(req,res);
})

//Project methods

router.get('/:name/:project', (req, res) => {
    Controllers.projectController.getProject(req,res);
})
//Project creation is made through projects, not users
router.put('/:name/:project', (req, res) => {
    Controllers.projectController.updateProject(req,res);
})
router.delete('/:name/:project', (req, res) => {
    Controllers.projectController.deleteProject(req,res);
})
//User methods

router.get('/:name', (req, res) => {
    Controllers.userController.getUser(req,res);
})
router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})
router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})
router.post('/:name/image', uploadFile, (req, res) => { // uses multer middleware function to upload images before controller function runs
    Controllers.userController.addProfileImage(req, res)//not tested
})
router.put('/:name', (req, res) => {
    Controllers.userController.updateUser(req, res)
})
router.delete('/:name', (req, res) => {//?create="eovius"
    Controllers.userController.deleteUser(req, res)
})
   
module.exports = router;