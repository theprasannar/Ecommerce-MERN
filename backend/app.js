//Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require('express')
const app = express();

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

//route imports
const products =  require('./routes/productRoute')

app.use('/api/v1',products)

module.exports = app 