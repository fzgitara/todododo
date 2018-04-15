const mongoose = require('mongoose');

const Schema = mongoose.Schema

const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo