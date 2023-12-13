const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./data')
const Blogs = require('./datas')


const app = express();
 
// middleware
app.use(express.static('Public'))
app.use(express.urlencoded({extended:true}))

//connecting to dateabase
const dbURI = 'mongodb+srv://data:L6EwGXzqyzLHNFxn@school.vvirl2y.mongodb.net/school?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>{
    console.log('connected to mongodb')
})
.catch(err=>{
    console.log(err)
})

//setting port and connecting to server
const PORT= 5555 || process.env.PORT;
app.listen(PORT, (err)=>{
 if (err) console.log(err);
    else console.log(`app listening in port ${PORT}`)
});

//setting view engine

app.set('view engine', 'ejs');


//defining our route
app.get('/', (req, res)=>{
    res.render('index');
})
app.get('/admin', (req, res)=>{
    res.render('admin')
})
app.post("/details", (req, res)=>{
    
    let clas = req.body.class;
    let term = req.body.term;
    let id = req.body.studentId;
    let name = req.body.userName;

    Blog.findOne({ class: clas, term: term, studentId: id })
    
    .then(result=>{
        if(result==null){
            res.render('error', {name:name})
        }
        else {
            console.log(result)
            //const blog = result[0].toObject();
            res.render('details', {blog:result})
        }
    })
    .catch(err=> {res.send(err)})
})
app.post("/adminJunior", (req, res)=>{
    res.render('adminJunior')
    const blog= new Blog(req.body)
    blog.save()
    .then(result=>{console.log(result)})
    .catch(err=>{console.log(err)})
})
app.post("/adminSenior", (req, res) =>{
    const blog = new Blogs(req.body);
    blog.save()
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
    res.redirect('adminSenior')
})
app.post('/upload', (req, res)=>{
    let x = req.body.Sclass
    if(x=="senior"){
        res.render('adminSenior');
    }
    else if(x == "junior"){
        res.render('adminJunior');
    }
    else{
        console.log('wrong')
    }
})