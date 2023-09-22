let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.stepController.getSteps(res);
})
router.get('/:name', (req, res) => {
    Controllers.stepController.getStep(req,res);
})
router.post('/create', (req, res) => {
    Controllers.stepController.createStep(req.body, res)
})
router.put('/:name', (req, res) => {
    Controllers.stepController.updateStep(req, res)
})
router.delete('/:name', (req, res) => {
    Controllers.stepController.deleteStep(req, res)
})
   
module.exports = router;