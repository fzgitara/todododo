const User = require('../models/users')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

module.exports = {
    getAllUser (req, res) {
        User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                message: 'List User',
                users
            })
        })
    },
    addUser (req, res) {
        const {name, email, password} = req.body
        const hash = bcrypt.hashSync(password, salt)
        const user = new User()
        user.name = name
        user.email = email
        user.password = hash
        user.save()
        .then(userData => {
            res.status(201).json({
                message: 'New User added',
                userData
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new User',
                err
            })
        })
    },
    login (req, res) {
        User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            const check = bcrypt.compareSync(req.body.password, user.password)
            const token = jwt.sign({email: user.email, _id: user._id}, process.env.SECRET)
            if(check){
                res.status(200).json({
                    message: 'Login success',
                    token
                })
            } else {
                res.status(400).json('Login failed')
            }
        })
    },
    editUser (req, res) {
        User.findOneAndUpdate({_id : req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Edit failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Edit successfull',
                    data: req.body
                })
            }
        })
    },
    deleteUser (req, res) {
        User.remove({_id : req.params._id}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Delete failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}