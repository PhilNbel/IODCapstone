let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.categoryController.getCategories(res);
})
router.get('/:id', (req, res) => {
    Controllers.categoryController.getCategory(req,res);
})
router.post('/create', (req, res) => {
    Controllers.categoryController.createCategory(req.body, res)
})
router.put('/:id', (req, res) => {
    Controllers.categoryController.updateCategory(req, res)
})
router.delete('/:id', (req, res) => {
    Controllers.categoryController.deleteCategory(req, res)
})
   
module.exports = router;