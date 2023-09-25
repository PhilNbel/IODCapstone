let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.categoryController.getCategories(res);
})
router.get('/:name', (req, res) => {
    Controllers.categoryController.getCategory(req,res);
})
router.post('/create', (req, res) => {
    Controllers.categoryController.createCategory(req.body, res)
})
router.put('/:name', (req, res) => {
    Controllers.categoryController.updateCategory(req, res)
})
router.delete('/:name', (req, res) => {
    Controllers.categoryController.deleteCategory(req, res)
})
   
module.exports = router;