const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const Blog = require('./data')
const SBlog = require('./datas')
const ABlog = require('./admin.js')
const PBlog = require('./primary.js')
const Blacklist = require('./blacklist.js')
const nuseryBlog = require('./nursery.js')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const Studentpassport = require('./goldenPassport.js')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const { inflateRaw } = require('zlib');
const MongoStore = require('connect-mongo');
require('dotenv').config();



const app = express();

// middleware
app.use(express.static('image'))
app.use(express.static('uploads'))
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    },
}));




app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 31536000000 // 1 year
    }
}));

// Directory to store uploaded files
const uploadDir = path.join(__dirname, 'uploads');

// Check if directory exists and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//midle 
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); 

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

// Allow requests from https://www.myschoolresult.com
const corsOptions = {
    origin: 'https://www.myschoolresult.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));



//defining our route
app.get('/', (req, res) => {
    res.render('index');
})
//adimin page to loging to result upload portal
app.get('/admin', isAuthenticated, (req, res) => {
    res.render('admin')
})

//CHECKING IF USER HAS LOGIN
function isAuthenticated(req, res, next){
   if(req.session.user){
        next()
   }else{
        req.session.returnTo = req.originalUrl; // Store the original URL
        if(req.originalUrl == '/myschool'){
            res.redirect('school')
        }
        res.redirect('login')
   }
}

app.post('/login', async(req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    try{
        const data = await ABlog.findOne({ email: user, password: password })
        if(data){
            req.session.visited = true;
            req.session.user = user;
            const school = data.school;
            req.session.school = school;
            const redirectTo = req.session.returnTo || '/admin';
            delete req.session.returnTo; // Clear returnTo after use
            res.redirect(redirectTo);
        }else{
            res.redirect('login')
        }

    }
    catch(err){
        console.log(err)
    }

})
// API FOR SCHOOL MANAGEMENT SYSTEM 
app.get('/myschool', isAuthenticated,(req, res)=>{
        res.render('myschool')
})
app.get('/school', (req, res)=>{
    res.render('school')
})
app.get("/admin_form", (req, res) => {
    res.render("admin_form")
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
})

//BLACKLIST API
app.get('/blacklist', isAuthenticated, async (req, res)=>{
    try{
        let school = req.session.school;
        const data = await Blacklist.find({school:school})
        res.render('blacklist', {data})
    }
    catch(err){
        console.log(err)
    }
})
//REMOVING NAME FROM BLACKLIST
app.delete('/blacklist/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const deletedStudent = await Blacklist.findOneAndDelete({ studentId });

        if (deletedStudent) {
            res.status(200).json({ message: 'Student removed from blacklist' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

//SAVING DATA TO BLACK LIST
app.post('/blacklist', async (req, res)=>{
    
    let studentName = req.body.userName;
    let school = 'Golden hills'
    let studentId = req.body.studentId;
    const data = {studentName, studentId, school}
    
    try{
        const studnetInfo = new Blacklist(data)
        await studnetInfo.save()
        res.json('file added')
    }
    catch(err){
        console.log(err)
    }
})

//saving primary data to databse 
app.post('/primary', (req, res) => {
    req.body.schoolName = req.session.school;
    const Blog = new PBlog(req.body);
    Blog.save()
        .then((result) => {
            res.render('primary')
        })
        .catch((err) => {
            console.log(err)
        })
})

//saving nursery database
app.post('/nursery', (req, res) => {
    req.body.schoolName = req.session.school;
    const Blog = new nuseryBlog(req.body);
    Blog.save()
        .then((result) => {
            res.render('nursery')
        })
        .catch((err) => {
            console.log(err)
        })
})

//saving junior data
app.post("/adminJunior", (req, res) => {
    res.render('adminJunior')
    req.body.schoolName = req.session.school;
    const blog = new Blog(req.body)
    blog.save()
        .then(result => { console.log('uploaded') })
        .catch(err => { console.log(err) })
})
//saving senior data
app.post("/adminSenior", (req, res) => {
    req.body.schoolName = req.session.school;
    const Sblog = new SBlog(req.body);
    Sblog.save()
        .then(result => console.log('uploaded'))
        .catch(err => console.log(err))
    res.render('adminSenior')
})
//LOGING IN TO ACCESSS SCHOOL RESULT PAGE
app.get('/login', (req, res)=>{
    res.render('login')
})

//LOGING IN TO UPLOAD STUDENT RESULT 
app.post('/upload', isAuthenticated, (req, res) => {
    let x = req.body.Sclass

                if (x == "senior") {
                    res.render('adminSenior');
                }
                else if (x == "junior") {
                    res.render('adminJunior');
                }
                else if (x == "primary") {
                    res.render('primary');
                }
                else {

                    res.render('nursery')
                }
})

//NEW EDITION STUDENT RESULT 
app.post('/result', async (req, res)=>{
    let clas = req.body.class;
    let term = req.body.term;
    let id = req.body.studentId;
    let name = req.body.userName;
    try{
        let data = await Studentpassport.findOne({studentId:id})
            
            let studentClass = clas.split(' ')
            if(studentClass[0] === "BASIC"){
                let details = await PBlog.find({studentId:id, class:clas, term: term}).sort({createdArt:-1}).limit(1);
                details = details[0]
                if(details != null){
                    let schoolName = details.schoolName.toLowerCase()
                    let resultTemplate = schoolName.split(' ')
                    resultTemplate = resultTemplate.join('-')
                    resultTemplate = `${resultTemplate}-basic`

                res.render(resultTemplate, {result:data, details})
                }
                else{
                    res.render('error', { name: name })
                }
            }
                else if(studentClass[0] === "JSS"){
                    let details = await Blog.find({studentId:id, class:clas, term: term}).sort({createdArt:-1}).limit(1);
                    details = details[0]
                    if(details != null){
                    let schoolName = details.schoolName.toLowerCase()
                    let resultTemplate = schoolName.split(' ')
                    resultTemplate = resultTemplate.join('-')
                    resultTemplate = `${resultTemplate}-jss`

                    res.render(resultTemplate, {result:data, details})
                    }
                    else{
                        res.render('error', { name: name })
                    }
                }
                else if(studentClass[0] === "SS"){
                    let details = await SBlog.find({studentId:id, class:clas, term: term}).sort({createdArt:-1}).limit(1);
                    details = details[0]
                    if(details != null){
                        let schoolName = details.schoolName.toLowerCase()
                        let resultTemplate = schoolName.split(' ')
                        resultTemplate = resultTemplate.join('-')
                        resultTemplate = `${resultTemplate}-ss`

                        res.render(resultTemplate, {result:data, details})
                    }
                    else{
                        res.render('error', { name: name })
                    }
                }
                else if(studentClass[0] === "NURSERY" || studentClass[1] ==="NURSERY"){
                    let details = await nuseryBlog.find({studentId:id, class:clas, term: term}).sort({ createdAt: -1 }).limit(1);
                    details = details[0]
                    if(details != null){
                        let schoolName = details.schoolName.toLowerCase()
                        let resultTemplate = schoolName.split(' ')
                        resultTemplate = resultTemplate.join('-')
                        resultTemplate = `${resultTemplate}-nursery`
                        res.render(resultTemplate, {result:data, details})
                    }
                    else{
                        res.render('error', { name: name })
                    }
                }
                
        }
    
    catch(err){
        console.log(err)
    }
})

//GET STUDENT INFORMATION BASE ON ID 
app.get('/studentinfomation', async (req, res)=>{
    let studentId = req.query.studnetId
    try{
        info = await Studentpassport.findOne({studentId})
        res.json(info)
    }
    catch(err){
        console.log(err)
    }
})
//searching student ID base on student name
app.get('/getstudentid', async (req, res) => {
    try {
        let student_name = req.query.student_name;
        let school = req.session.school
        let studentId = await Studentpassport.find({schoolName:school, userName:{ $regex: student_name, $options: 'i' } });
        if (studentId) {
            res.json(studentId);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//getting student id by classname
app.get('/getclassid', async(req, res)=>{
    let studentClass = req.query.class;
    let schoolName= req.session.school;
   try{
    let studentId = await Studentpassport.find({schoolName, class: studentClass });
    res.json(studentId)

   }
   catch(err){
    console.log(err)
   }
})

//getting student id by classname
app.get('/getsectionid', async(req, res)=>{
    let studentClass = req.query.class;
    let schoolName = req.session.school
   try{
    let studentId = await Studentpassport.find({schoolName, class:{ $regex: studentClass, $options: 'i' } });
    res.json(studentId)
   }
   catch(err){
    console.log(err)
   }
})

//CORRECTING WRONG ENTRY NAME
app.patch('/update-student', async (req, res) => {
    const { studentId, userName, addmissionNo, dob, classN, gender } = req.body; // Capture fields from the request body
    try {
        const updatedStudent = await Studentpassport.findOneAndUpdate(
            {studentId}, // Use studentId to identify the student
            { 
                userName, 
                addmissionNo, 
                dob, 
                class: classN, 
                schoolName: req.session.school
            }, 
            { new: true } // Return the updated document
        );

        if (updatedStudent) {
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


//UPDATING STUDENT RECORD PAGE
app.get('/update', isAuthenticated, (req, res)=>{
    res.render('update')
})
//generating student id and passport upload
app.get('/generateid', isAuthenticated, (req, res)=>{
    res.render('generateid')
})

// saving student ID and passport 
app.post('/passport', upload.single('passport'), (req, res) => {
 
    // Create a new instance of the Mongoose model
    const newPassport = new Studentpassport({
        userName: req.body.userName,
        studentId: req.body.studentId,
        addmissionNo: req.body.addmissionNo,
        dob: req.body.dob,
        class:req.body.class,
        passport: req.file ? req.file.filename : null,  // Save filename or null if no file uploaded
        schoolName: req.session.school
    });

    newPassport.save()
        .then(result => {
            res.redirect('/generateid');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// post request from school updating news field 
app.post("/myschool", (req, res)=>{
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
            // Redirect the client to the index page after sending the email
            res.status(200).redirect('/');
        }
    });
});

//STUDENT ID FORM
app.get('/studentid', isAuthenticated, (req, res)=>{
    res.render('studentid')
})
app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('login')
})
app.use((req, res)=>{
    res.status(404).render('page_not_found')
})