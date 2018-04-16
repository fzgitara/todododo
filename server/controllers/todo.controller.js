const Todo = require('../models/todo')
const jwt = require('jsonwebtoken')

module.exports = {
  addTodo: function (req, res) {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    const todo = new Todo ()
    todo.owner = decoded._id
    todo.task = req.body.task
    todo.save()
    .then(data => {
      res.status(201).json({
        message: 'Todo Create',
        data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllTodo: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    Todo.find({owner: decoded._id})
    .populate('owner')
    .exec()
    .then(todo => {
      res.status(200).json({
        message: 'List All Todo',
        todo
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteTodo: function (req, res) {
    Todo.remove({_id: req.params._id})
    .then(todo => {
      res.status(201).json({
        message: 'Todo Deleted'
      })
    })
  },
  toggleDone: function (req, res) {
    Todo.findOne({_id: req.params._id})
    .then(data => {
      res.status(201).json({
        message: 'This Todo',
        data
      })
      if (data) {
        data.done = !data.done
        Todo.update({
          _id: req.params._id
        }, {
          $set: {done: data.done}
        }).then(() => {
          res.status(200).json({
            message: 'This Todo is Done',
          })
        }).catch(err => {
          res.status(500).json({
            message: 'error bos'
          })
        })
      }
    })
  }
}