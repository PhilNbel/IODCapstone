let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

//only hosts project creation and list of all projects

router.get('/', (req, res) => {
    Controllers.projectController.getProjects(res);
})
router.post('/create', (req, res) => {
    Controllers.projectController.createProject(req.body, res)
})
   
module.exports = router;