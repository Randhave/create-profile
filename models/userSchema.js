const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Hashing password and defining here and call in router.js file before save userdata
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()  // this next() high recommend to call this else getting error and not run server
})

//  creating jsonwebtoken here and call router.js file before login or through login
userSchema.methods.generateToken = async function (req, res) {
    try {
        let createdToken = await jwt.sign({ _id: this.id }, process.env.PRIVATE_KEY);  
        this.tokens = await this.tokens.concat({ token: createdToken })  
        await this.save()
        return createdToken
    }
    catch (error) {
        res.status(422).json({ error: " Invalid credentials ! please Try again" });
        console.log(error)
    }
}

// user send message function
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message })
        await this.save()
        return this.messages
    }
     catch (error) {
        console.log(error)
    }
}

const Student = new mongoose.model("Student", userSchema)
module.exports = Student;
