const app = require('./app')

const dotenv = require('dotenv')
const connectDataBase = require('./config/database')

//config
dotenv.config({path:"backend/config/config.env"})


//connecting to database
connectDataBase()

//handle uncought Exception
process.on('uncaughtException',(err) => {
    console.log(`Error:${err.message}`)
    console.log("Shutting down server because of uncaughtException")
    process.exit(1);
})


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})

//unhandler promise rejection
process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down server because of unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})