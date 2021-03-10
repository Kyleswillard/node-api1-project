// BUILD YOUR SERVER HERE
//{ find, findById, insert, update, remove }
const User = require('./users/model')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
server.use(bodyParser.json())

// GET Users - Works
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send({
            message: 'The users information could not be retrieved'
        })
    }
})

// GET User by ID - Works
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        res.send(user)
    } catch (err) {
        res.status(500).json({
            message: 'The users information could not be retrieved'
        })
    }
})

// POST User - Works
server.post('/api/users', async (req, res) => {
    const user = req.body
    console.log(user)
    try {
        const newUser = await User.insert(user)
        res.status(201).send(newUser)
    } catch (err) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    }
})

// Delete User - Works
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            const user = await User.remove(id)
            res.status(200).send(user)
        } else {
            res.status(404).json({ message: 'Unknown ID' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

    if (!changes.name || !changes.bio) {
        res.status(400).json({ message: 'Must include name & bio!' })
    } else {
        try {
            const updateUser = await User.update(id, changes)
            if (updateUser) {
                res.status(200).json(updateUser)
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
})
module.exports = server
