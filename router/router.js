const express = require('express')
const Student = require('../models/userSchema')
const router = express.Router()
require('../db/connection')
require('../models/userSchema')
const bcrypt = require('bcryptjs')   // for secure user password
const authenticate = require('../middleware/authenticate')

 
//  using async and await
router.post('/register', async (req, res) => {

    const { name, email, phone, profession, password, cpassword } = req.body  // getting input data 

    if (!name || !email || !phone || !profession || !password || !cpassword) {  // if empty field then will be excute return
        return res.status(422).json({ error: "Please filled properly" });
    }
    try {
        const userExist = await Student.findOne({ email: email }) // getting email form the database by findOne method , applying on Student collections

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" })
        }
        else if (password != cpassword) {
            res.send('/')
            return res.status(422).json({ error: "password and cpassword are not same " })
        }
        else {
            const user = new Student({ name, email, phone, profession, password, cpassword });

            await user.save()
            res.status(201).json({ message: "User registered successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to registered" })
        console.log(error)
    }
})

// login router 
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ error: "Please filled properly" });
        }

        const userLogin = await Student.findOne({ email: email })  // getting a userdata email for login 
        console.log(userLogin)

        if (userLogin) {
            const ispassword_match = await bcrypt.compare(password, userLogin.password)  // comparing user input password and database stored password
         
            createdToken = await userLogin.generateToken()
            await userLogin.save()

            // storing cookie into response
            res.cookie("jwebtoken", createdToken, {
                expires: new Date(Date.now() + 258920000),
                httpOnly: true
            })

            if (!ispassword_match) {
                return res.status(422).json({ error: "Invalid credentials ! please Try again" });
            }
            else {
                res.status(201).json({ message: "User successfully logged in" })
            }
        }
        else {
            return res.status(422).json({ error: "Invalid credentials ! please Try again" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to Login" })
        console.log(error)
    }
})

// Logut user
router.get('/logout', (req, res) => {
    console.log("Hello from Logout")
    res.clearCookie('jwebtoken', { path: '/' })
    res.status(200).send("User logout succcessfully")
})

// user contact data store here from frontend to backend 
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        if (!name || !email || !phone || !message) {
            res.status(401).send("Please filled properly")
        }
        const userContact = await Student.findOne({ _id: req.userID })
        if (userContact) {
            await userContact.addMessage(name, email, phone, message)
            await userContact.save()
            res.status(201).json({ message: "user message send successfully" })
        }
    }
    catch (error) {
        console.log(error)
    }
})


// authinticate here
router.get('/about', authenticate, (req, res) => {
    console.log("Hello my about page")
    res.send(req.userData)
})

router.get('/getData', authenticate, (req, res) => {
    res.send(req.userData)
    console.log("Hello my getData page")
})

module.exports = router

