const app = require('./app')

const dotenv = require('dotenv')
const connectDataBase = require('./config/database')

//config
dotenv.config({path:"backend/config/config.env"})

//connecting to database
connectDataBase()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})