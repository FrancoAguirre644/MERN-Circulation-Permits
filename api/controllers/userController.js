const Users = require('../models/userModel')
const bcrypt = require('bcrypt')

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, email, password, profile } = req.body;

            const user = await Users.findOne({ email: email })
            if (user) return res.status(400).json({ err: "The user already exists." })

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash,
                profile: profile
            })

            await newUser.save()

            res.status(201).json({ 
                msg: "User created successfully.",
                newUser
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {

            const { username, email, profile } = req.body;

            const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, 
                { username, email, profile }, 
                {new: true}
            )

            res.status(200).json({ 
                msg: 'User updated successfully.',
                user: newUser._doc,
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {

            await Users.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'User deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getUser: async (req, res) => {
        try {

            const user = await Users.findOne({ _id: req.params.id })

            res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllUsers: async (req, res) => {
        try {

            const users = await Users.find()

            res.status(200).json({ users })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
}

module.exports = userController