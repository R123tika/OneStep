const mongoose = require('mongoose')
const AbhiSchema=  mongoose.Schema({
    Name:{
        type:String,
        unique:true
    },
    
    Member:{
        type:Number,
    },
    Detail:{
        type:String
    },
    color:{
        type:String
    }
})

const Abhiyan =  mongoose.model('Abhiyan',AbhiSchema)

module.exports =Abhiyan