const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter product name"]
    },
    description:{
        type: String,
        required: [true,"Please enter product Description"]
    },
    price:{ 
        type:Number,
        required: [true,"Please enter product price"],
        maxLength:[8,"Price can not exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        { 
            public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
        }
    ],
    category:{
        type: String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type: Number,
        default:1,
        required: [true,"Please enter product stock"]
    },
    numOfreviews:{
        type:Number,
        default:0
    },
    reviews:[
       { 
           name:{
               type: String,
               required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String, 
                required: true
            }

        }
    ]
    
})

module.exports = mongoose.model("product",productSchema)