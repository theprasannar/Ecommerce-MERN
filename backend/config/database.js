const mongoose = require('mongoose')


const connectDataBase = ()=> {
        mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,useUnifiedTopology:true}).then((data) => {
            console.log(`MongoDb  connected with server: ${data.connection.host}`)
        }).catch((error) => {
            console.error(error)
        })
}

module.exports = connectDataBase