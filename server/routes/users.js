var express = require('express');
var router = express.Router();
const {getAllUser, addUser, login, editUser, deleteUser} = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', getAllUser)
router.post('/', addUser)
router.post('/login', login)
router.put('/:_id', editUser)
router.delete('/:_id', deleteUser)

module.exports = router;
