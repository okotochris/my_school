const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./data')
const SBlog = require('./datas')


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
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err.message}`);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
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


app.post("/adminJunior", (req, res)=>{
    res.render('adminJunior')
    const blog= new Blog(req.body)
    blog.save()
    .then(result=>{console.log('uploaded')})
    .catch(err=>{console.log(err)})
})
app.post("/adminSenior", (req, res) =>{
    const Sblog = new SBlog(req.body);
    Sblog.save()
    .then(result=>console.log('uploaded'))
    .catch(err=>console.log(err))
    res.render('adminSenior')
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
        let title = "wong detais"
        console.log('wrong')
        res.render('admin')
    }
})

app.post("/details", (req, res)=>{

    let clas = req.body.class;
    let term = req.body.term;
    let id = req.body.studentId;
    let name = req.body.userName;

    if(clas == "JSS1" || clas== "JSS2" || clas== "JSS3"){
    Blog.findOne({ class: clas, term: term, studentId: id })
    
    .then(result=>{
        if(result==null){
            res.render('error', {name:name})
        }
        else {
            //const blog = result[0].toObject();
            res.render('details', {blog:result})
        }
    })
    .catch(err=> {res.send(err)})
}
    else{
        SBlog.findOne({ class: clas, term: term, studentId: id })
    
        .then(result=>{
            if(result==null){
                res.render('error', {name:name})
            }
            else {
                //const blog = result[0].toObject();
                res.render('detail', {blog:result})
                console.log("data sent to frontend")
            }
        })
        .catch(err=> {console.log(err)})
    }
})