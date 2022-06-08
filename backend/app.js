
const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv')

const app = express(); 

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
//config

dotenv.config({path:"backend/config/config.env"})

//route imports
const products =  require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoutes')
const payment = require("./routes/paymentRoute");

app.use('/api/v1',products);
app.use('/api/v1',user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(errorMiddleware)

//Middleware for Error

module.exports = app 