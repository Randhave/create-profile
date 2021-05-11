const mongoose = require('mongoose')

db = process.env.DATABASE

mongoose.connect(db,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log("Not connected")
    });