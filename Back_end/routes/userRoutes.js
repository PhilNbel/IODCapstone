let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.proficiencyController.getProficiencies(res);
})
router.get('/:id', (req, res) => {
    Controllers.proficiencyController.getProficiency(req,res);
})
router.post('/create', (req, res) => {
    Controllers.proficiencyController.createProficiency(req.body, res)
})
router.put('/:id', (req, res) => {
    Controllers.proficiencyController.updateProficiency(req, res)
})
router.delete('/:id', (req, res) => {
    Controllers.proficiencyController.deleteProficiency(req, res)
})
   
module.exports = router;