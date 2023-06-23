const mongoose = require('mongoose')
const StateSchema=  mongoose.Schema({
    Name:{
        type:String,
        unique:true
    },
    NGO:{
        type:String
    },
    Establish:{
        type:Number
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

const State =  mongoose.model('State',StateSchema)

module.exports =State
