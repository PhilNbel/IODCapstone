let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.fieldController.getFields(res);
})
router.get('/:id', (req, res) => {
    Controllers.fieldController.getField(req,res);
})
router.post('/create', (req, res) => {
    Controllers.fieldController.createField(req.body, res)
})
router.put('/:id', (req, res) => {
    Controllers.fieldController.updateField(req, res)
})
router.delete('/:id', (req, res) => {
    Controllers.fieldController.deleteField(req, res)
})
   
module.exports = router;