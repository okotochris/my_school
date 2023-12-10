const express = require('express');
const path= require('path');
const http= require('http');
const socketio= require('socket.io');
const mongoose = require('mongoose')
const Blog = require('./data')


const app = express();
 const server= http.createServer(app);
// middleware
app.use(express.static(path.join(__dirname, 'public')))
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

//socket
const io= socketio(server);

//run wen client connect
io.on('connection', socket=>{
    console.log('new connection');
})
const PORT= 5555 || process.env.PORT;
server.listen(PORT, (err)=>{
    if (err) console.log(err);
    else console.log(`app listening in port ${PORT}`)
});

//setting view engine

app.set('view engine', 'ejs');


//defining our route
app.get('/', (req, res)=>{
    res.render('index');
})
app.get('/chat', (req, res)=>{
    res.render('chat');
})
app.get('/chatRoom', (req, res)=>{
    res.render('chatRoom');
})
app.get('/school', (req, res)=>{
    res.render('school')
})
app.get("/school/adminJunior", (req, res)=>{
    res.render('adminJunior')    
})

app.get("/school/adminSenior", (req, res)=>{
    res.render('adminSenior')
})
app.post("/school/adminSenior", (req, res) =>{
    res.redirect('adminSenior')
    console.log(req.body.mth)  
})
app.get("/school/details", (req, res)=>{
     Blog.find({$and: [{ mth: 'Mathematics' }, { studentId:"123456" }  ]})
    .then(result=>{res.send(result)})
    .catch(err=> {res.send(err)})
})
app.post("/school/adminJunior", (req, res)=>{
    res.redirect('adminJunior')
    const blog= new Blog(req.body)
    blog.save()
    .then(result=>{console.log(result)})
    .catch(err=>{console.log(err)})
})
app.post("/school", (req, res)=>{
    res.redirect("school")
    console.log(req.body)
})