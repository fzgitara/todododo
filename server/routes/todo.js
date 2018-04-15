var express = require('express')
var router = express.Router()
const {addTodo, deleteTodo, toggleDone, getAllTodo} = require('../controllers/todo.controller')

router.get('/', getAllTodo)
router.post('/', addTodo)
router.delete('/:_id', deleteTodo)
router.put('/:_id', toggleDone)

module.exports = router;
