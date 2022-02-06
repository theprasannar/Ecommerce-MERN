
const express = require('express')
const errorMiddleware = require('./middleware/error')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

//route imports
const products =  require('./routes/productRoute')
const user = require('./routes/userRoute')

app.use('/api/v1',products);
app.use('/api/v1',user);
app.use(errorMiddleware)

//Middleware for Error

module.exports = app 