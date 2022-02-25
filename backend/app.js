
const express = require('express')
const errorMiddleware = require('./middleware/error')
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

//route imports
const products =  require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoutes')

app.use('/api/v1',products);
app.use('/api/v1',user);
app.use(errorMiddleware)

//Middleware for Error

module.exports = app 