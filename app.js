const dotenv = require('dotenv')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const path = require('path')
dotenv.config({ path: './config.env' })
require('./db/connection')
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser());
 
app.use(require('./router/router'))  //use all router(endpoint) of page here by this code

// horuku code
if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`Server running at ${PORT} port`)
})