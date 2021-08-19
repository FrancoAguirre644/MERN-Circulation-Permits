const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const user = await Users.findOne({ email: email })
            if (user) return res.status(400).json({ err: "The email already exists." })

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })

            await newUser.save()

            res.json({ msg: "Sign up success!" })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email: email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect Password." })

            // if login success create a token
            const payload = { id: user._id, name: user.username }

            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "4d" })

            res.status(200).json({
                msg: "Login Success!",
                user: {
                    username: user.username,
                },
                token
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization")
            if (!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) return res.status(400).json({err: "token invalid"})

                const user = await Users.findById(verified.id).populate("user", "-password")

                if (!user) return res.status(400).json({err: "user not exists"})

                return res.json({
                    user
                })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = authController