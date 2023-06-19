const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/collection")
.then(()=>{
    console.log("connecting....")
})
.catch((err)=>{
    console.log(err)
})

