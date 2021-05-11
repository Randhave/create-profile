const Student = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwebtoken

        const varifyToken = jwt.verify(token, process.env.PRIVATE_KEY)

        const userData = await Student.findOne({ _id: varifyToken._id, "tokens.token": token })

        if (!userData) { throw new Error("User not Found") }

        // root user data will be equal to user who trying to login request
        req.token = token
        req.userData = userData
        req.userID = userData._id

        next()
    }
    catch (error) {
        res.status(401).send("Unauthorized : No token provided !Please login")
        console.log(error)
    }
}

module.exports = authenticate

