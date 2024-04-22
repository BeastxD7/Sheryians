express = require('express');
path = require('path');
const { Console, error } = require('console');
const fs = require('fs');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req ,res) =>{
    fs.readdir('./files', (err, files) =>{
        // console.log(files);
        res.render(`index`, {files: files});
    } )
    
})

app.post('/create', (req,res) =>{
    console.log(req.body);

    if(req.body.title.length == 0 || req.body.desc.length == 0){
        res.render('error',{message: 'Please enter all the fields in the Form'});
    }

    else if(req.body.title.length > 16  ) {
        res.render('error',{message: 'Title should be less than 15 characters'});
    }
    else{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.desc , (err) =>{
        res.redirect('/');
    })}
})

app.get('/file/:filename', (req, res) =>{
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) =>{
        res.render('readmore', {filename: req.params.filename, filedata: filedata});
    })
})

app.get('/edit/:filename', (req, res) =>{
    res.render('edit', {filename: req.params.filename});
})

app.post('/edit/:filename', (req, res) =>{

    if(req.body.newfilename.length > 16  ) {
        res.render('error',{message: 'Title should be less than 15 characters'});
    } else{
     fs.rename(`./files/${req.params.filename}`, `./files/${req.body.newfilename.split(" ").join('')}.txt`, (err) =>{
        console.log(`file renamed from ${req.body.oldfilename} to ${req.body.newfilename}.txt`);
             res.redirect('/');
         })
        }
     })

app.listen(3000)