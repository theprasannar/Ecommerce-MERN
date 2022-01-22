
const express = require('express')
const errorMiddleware = require('./middleware/error')
const app = express();

app.use(express.json())

//route imports
const products =  require('./routes/productRoute')

app.use('/api/v1',products)
app.use(errorMiddleware)

//Middleware for Error

module.exports = app 