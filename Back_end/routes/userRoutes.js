let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})
router.get('/:name/:project', (req, res) => {
    Controllers.userController.getProject(req,res);
})
router.get('/:name', (req, res) => {
    Controllers.userController.getUser(req,res);
})

router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})
router.put('/:name', (req, res) => {
    Controllers.userController.updateUser(req, res)
})
router.delete('/:name', (req, res) => {//?create="eovius"
    Controllers.userController.deleteUser(req, res)
})
   
module.exports = router;