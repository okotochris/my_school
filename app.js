const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const Blog = require('./data')
const SBlog = require('./datas')
const ABlog = require('./admin.js')
const PBlog = require('./primary.js')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const passport = require('./goldenPassport.js')
const fs = require('fs');
const path = require('path');



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

// Directory to store uploaded files
const uploadDir = path.join(__dirname, 'uploads');

// Check if directory exists and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//midle 
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));

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
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure the directory 'uploads/' exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage: fileEngineStorage });


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
app.get("/golden_hills", (req, res)=>{
    res.render('golden_hills')
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
            console.log('sent')
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
                    res.render('junior-result', { blog: result })
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
                   
                    res.render('senior-result', { blog: result })
                    console.log("data sent to frontend")
                }
            })
            .catch(err => { console.log(err) })
    }
    else {
        PBlog.findOne({ class: clas, term: term, studentId: id })
       
            .then(result => {
                if (result == null) {
                    res.render('error', { name: name })
                }
                else {
                    //const blog = result[0].toObject();
                    res.render('primary-result', { blog: result })
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
        let userInfo = await Blog.findOne({userName})
        //searching for SSS data base if result not found in JSS
        if(!userInfo){
            userInfo = await SBlog.findOne({userName})
        }
        if(!userInfo){
            userInfo = await PBlog.findOne({userName})
        }
       if(userInfo){
            res.json(userInfo)
        }
        
        else{
            res.json({message: `${userName} is not regiser yet`})
        }
    }
    catch (err){
        console.log(err)
        res.json('unable to retrieve data')
    }
})

//passport upload
app.get('/passport-upload', (req, res)=>{
    res.render('passport-upload')
})

app.post('/passport', upload.single('passport'), (req, res) => {
    console.log("recieved")
    const passports = new passport(req.body);
    passports.save()
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
    res.redirect('passport-upload')
})


// post request from school updating news field 
app.post("/myschool", (req, res)=>{
    console.log(req.body)
    res.redirect('index')
})

// configuring nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"okotoazachristain@gmail.com",
        pass: "bsnk bhyp bebw hwbt"
    }

})
//contact us form API
app.post('/contact', (req, res) => {
    const { name, school, email, number, message } = req.body;
    const mailOptions = {
        from: email,
        to: 'okotoazachristain@gmail.com',
        subject: 'MY SCHOOL RESULT HELP',
        text: `from\n Email: ${email} \n Name: ${name} \n School: ${school} \n Number: ${number}  \n ${message}`,
        phone_number: number
        
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            // Handle error, maybe send an error response to the client
        } else {
            console.log('Mail sent');
            // Redirect the client to the index page after sending the email
            res.status(200).redirect('/');
        }
    });
});

//STUDENT ID FORM
app.get('/studentid', (req, res)=>{
    res.render('studentid')
})

app.use((req, res)=>{
    res.status(404).render('page_not_found')
})