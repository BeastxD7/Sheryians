const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/usermodel');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
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



app.post('/create', async (req, res) => {

    if (req.body.username.length == 0 || req.body.useremail == 0 || req.body.imageurl == 0) {
        res.render('error', { message: "Please enter all the information in the Form (Don't Leave any field Empty!)"  })
    } else {

        let createdUser = await userModel.create({
            name: req.body.username,
            email: req.body.useremail,
            imageurl: req.body.userimageurl
        })
        res.redirect('users');
    }

    
})

app.get('/users', async (req, res) => {
    let users = await userModel.find();
    res.render('users', { user: users })
})

app.get('/delete/:id', async (req, res) => {

    // console.log(req.params.id);

    let deleteduser = await userModel.findOneAndDelete({
        _id: req.params.id
    });

    res.redirect('/users')
})

app.get('/edit/:userid', async (req, res) => {

    let founduser = await userModel.findOneAndUpdate({
        _id:req.params.userid
    })

    res.render('update',{user:founduser});
})

app.post('/update/:userid', async(req,res) =>{
    
    if (req.body.username.length == 0 || req.body.useremail == 0 || req.body.imageurl == 0) {
        res.render('error', { message: "Please enter all the information in the Form (Don't Leave any field Empty!)" })
    } else {

        let updateuser = await userModel.findOneAndUpdate({
            _id:req.params.userid
        },{
            name:req.body.username,
            email:req.body.useremail,
            imageurl:req.body.userimageurl
        })
        res.redirect('/users');
        }



})


app.listen(3000);