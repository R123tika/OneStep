const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema=  mongoose.Schema({
    Name:{
        type: String,
        require:true
    },
    Mobile:{
        type:Number,
        require:true,
        min:10,
    },
    Email:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    State:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Topic:{
        type:String,
        require:true
    },
    Message:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Contact =  mongoose.model('Contact',contactSchema)
module.exports = Contact
