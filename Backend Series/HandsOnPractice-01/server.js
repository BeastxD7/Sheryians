express = require('express');
path = require('path');
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
    // console.log(req.body);

    if(req.body.title.length == 0 || req.body.desc.length == 0){
        res.send('Please Enter Title and Description');
    }
    else{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.desc , (err) =>{
        res.redirect('/');
    })}
})

app.get('/file/:filename', (req, res) =>{
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) =>{
        // console.log(filedata);
        res.render('readmore', {filename: req.params.filename, filedata: filedata});
    })
})

app.listen(3000)