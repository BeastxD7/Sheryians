const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/usermodel');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req , res ) =>{
    res.render('home');
})

// app.get('/create', async (req , res ) =>{
    
//     let createdUser = await userModel.create({
//         name:"Beast",
//         email:"beast@beast.com",
//         imageurl:"beast.jpg"
//     })
//     res.send(createdUser);
// })



app.post('/create',async (req ,res) =>{

    console.log(req.body.email);

let createdUser = await userModel.create({
    name: req.body.username,
    email: req.body.useremail,
    imageurl: req.body.userimageurl
})

res.redirect('users');
})

app.get('/users' ,async (req , res) =>{
    let users = await userModel.find();
    res.render('users', {user:users}) 
})

app.listen(3000);