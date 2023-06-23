const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true},
    { userUnifiedTopology:true})
.then(()=>{
    console.log("connecting....")
})
.catch((err)=>{
    console.log(err)
})

