const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ err: "Invalid Authorization." })

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ err: "Authorization is not valid." })

            req.user = user;
            next()
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

module.exports = auth