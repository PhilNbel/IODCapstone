let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.skillController.getSkills(res);
})
router.get('/:name', (req, res) => {
    Controllers.skillController.getSkill(req,res);
})
router.post('/create', (req, res) => {
    Controllers.skillController.createSkill(req.body, res)
})
router.put('/:name', (req, res) => {
    Controllers.skillController.updateSkill(req, res)
})
router.delete('/:name', (req, res) => {
    Controllers.skillController.deleteSkill(req, res)
})
   
module.exports = router;