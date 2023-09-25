let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.projectController.getProjects(res);
})
router.get('/:name', (req, res) => {
    Controllers.projectController.getProject(req,res);
})
router.post('/create', (req, res) => {
    Controllers.projectController.createProject(req.body, res)
})
router.put('/:name', (req, res) => {
    Controllers.projectController.updateProject(req, res)
})
router.delete('/:name', (req, res) => {
    Controllers.projectController.deleteProject(req, res)
})
   
module.exports = router;