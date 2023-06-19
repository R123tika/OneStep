const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const SignSchema=  mongoose.Schema({
    Name:{
        type: String,
        require:[true, "name required."],
    },
    Mobile:{
        type:String,
        require:[true, "Mobile required."],
        unique:true,
    },
    Email:{
        
        type:String,
        require:[true, "Email required."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        },
        unique:true,
    },
    Password:{
        type:String,
        require:[true, "Password required."],
    },
    Cpassword:{
        type:String,
        require:[true, "Cpassword required."],
    },
    date:{
        type:Date,
        default:Date.now,
    }
})



SignSchema.pre("save", async function(next){
    if(this.isModified('Password')){
    this.Password = await bcrypt.hash(this.Password,10)
    this.Cpassword = undefined
    }
    next()
})

const Sign =  mongoose.model('Sign',SignSchema)

module.exports =Sign
