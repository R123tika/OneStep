
const mongoose = require('mongoose')
const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const path = require('path')
require('./db/data');
const Contact = require('./model/Schema')
const Sign = require('./model/Sign')
const State =require('./model/State');
const Abhiyan = require('./model/Abhiyan')
const hbs = require('hbs')
const port = process.env.Port || 3003
const staticPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// console.log(path.join(__dirname , '../public'))


const dotenv = require('dotenv')

app.use(express.urlencoded({ extended: true }));


app.use(express.static(staticPath))
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')))
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')))

app.use(express.urlencoded({extended:false}))

app.set('view engine','hbs')
app.set('views',templatePath)
hbs.registerPartials(partialPath)


app.get('/',(req,res)=>{
    // res.render("home")
    Abhiyan.find({})
    .then((data)=>{
        res.render("home",{data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/Service',(req,res)=>{
    State.find({})
        .then((data)=>{
            res.render("Service",{data})
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/Contact',(req,res)=>{
    res.render("Contact")
})
app.post('/Contact',async (req,res)=>{
    try{
        
    const User = new Contact(req.body)
    await User.save()
    res.status(201).redirect('/')

    }
    catch(err){
        res.status(500).send(err)
    }
})
app.get('/Sign',(req,res)=>{
    res.render("Sign")
})
app.post('/Sign',async (req,res)=>{
    try{
        const Password = req.body.Password
        const Cpassword = req.body.Cpassword
        if(Password===Cpassword){
            const Users = new Sign(req.body)
            await Users.save()
            res.status(201).redirect('/')
    }
    else{

        res.send('Password not match')
    }

    }
    catch(err){
        res.status(500).send(err)
    }
})
app.get('/Login',(req,res)=>{
    res.render("Login")
})
app.post('/Login',async (req,res)=>{
    try{
        const email = req.body.Email
        const password = req.body.Password
        console.log(Sign.findOne({Email:email}))
        const check =  await Sign.findOne({Email:email})
        const isMatch =  await bcrypt.compare(password,check.Password)
        if(isMatch && email === check.Email){
            res.status(201).redirect('/')
    }
    else{
        res.render('Login')
    }

    }
    catch(err){
        res.status(500).send(err)
    }
})


app.listen(port,()=>{
    console.log("connection complete")
})