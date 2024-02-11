const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const Blog = require('./data')
const SBlog = require('./datas')
const ABlog = require('./admin.js')
const PBlog = require('./primary.js')


const app = express();

// middleware
app.use(express.static('image'))
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    },
}));

app.use(express.urlencoded({ extended: true }))

//connecting to dateabase
const dbURI = 'mongodb+srv://data:L6EwGXzqyzLHNFxn@school.vvirl2y.mongodb.net/school?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.log(err)
    })


  // configuring multer
  const fileEngineStorage = multer.diskStorage({
    destination:((req, file, cb)=>{
        cb(null, 'image')
    }),
    filename:((req, file, cb)=>{
        cb(null, Date.now() + "--" + file.orignialname)
    })
  }) 
  
  const upload = ({storage: fileEngineStorage})


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
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/admin', (req, res) => {
    res.render('admin')
})
app.get('/primary', (req, res) => {
    res.render('primary')
})
app.get('/myschool', (req, res)=>{
    res.render('myschool')
})
app.get("/admin_form", (req, res) => {
    res.render("admin_form")
})
//saving primary data to databse 
app.post('/primary', (req, res) => {
    const Blog = new PBlog(req.body);
    Blog.save()
        .then((result) => {
            res.redirect('primary')
        })
        .catch((err) => {
            console.log(err)
        })
})


//saving admin login
app.post('/admin_form', (req, res) => {
    const Ablog = new ABlog(req.body)
    Ablog.save()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    res.render('admin')
    console.log("posted")
})
//saving junior data
app.post("/adminJunior", (req, res) => {
    res.render('adminJunior')
    const blog = new Blog(req.body)
    blog.save()
        .then(result => { console.log('uploaded') })
        .catch(err => { console.log(err) })
})
//saving senior data
app.post("/adminSenior", (req, res) => {
    const Sblog = new SBlog(req.body);
    Sblog.save()
        .then(result => console.log('uploaded'))
        .catch(err => console.log(err))
    res.render('adminSenior')
})
//search API RESULT
app.post('/upload', (req, res) => {
    let x = req.body.Sclass
    const user = req.body.user;
    const password = req.body.password;

    ABlog.findOne({ email: user, password: password })
        .then(result => {

            if (result == null) {
                res.render('wrong_user')
            }
            else {
                if (x == "senior") {
                    res.render('adminSenior');
                }
                else if (x == "junior") {
                    res.render('adminJunior');
                }
                else {

                    res.render('primary')
                }
            }
        })
        .catch(err => {
            console.log(err)
        })

})

//posting student result
app.post("/details", (req, res) => {

    let clas = req.body.class;
    let term = req.body.term;
    let id = req.body.studentId;
    let name = req.body.userName;

    //checking if the search is for junior scondary school
    if (clas == "JSS1" || clas == "JSS2" || clas == "JSS3") {
        Blog.findOne({ class: clas, term: term, studentId: id })

            .then(result => {
                if (result == null) {
                    res.render('error', { name: name })
                }
                else {
                    //const blog = result[0].toObject();
                    res.render('details', { blog: result })
                    console.log(result)
                }
            })
            .catch(err => { res.send(err) })
    }
    //checking if the result is senior secondary school
    else if (clas == "SS1" || clas == "SS2" || clas == "SS3") {
        SBlog.findOne({ class: clas, term: term, studentId: id })

            .then(result => {
                if (result == null) {
                    res.render('error', { name: name })
                }
                else {
                   
                    res.render('detail', { blog: result })
                    console.log("data sent to frontend")
                }
            })
            .catch(err => { console.log(err) })
    }
    else {
        PBlog.findOne({ class: clas, term: term, studentId: id })
       
            .then(result => {
                console.log(`${clas} ${term} ${id}`)
                if (result == null) {
                    res.render('error', { name: name })
                }
                else {
                    //const blog = result[0].toObject();
                    res.render('primary_file', { blog: result })
                    console.log("data sent to frontend")
                }
            })
            .catch(err => { console.log(err) })
    }
})

//searching for student id

app.get('/userInfo', async (req, res)=>{
    try{
        let userName = req.query.userName
        const userInfo = await Blog.findOne({userName})
        if(userInfo){
            res.json(userInfo)
        }
       
        else{
            res.json(`${userName} not found generate new id`)
        }
    }
    catch (err){
        console.log(err)
        res.json('unable to retrieve data')
    }
})