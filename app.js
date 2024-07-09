const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const Blog = require('./data')
const SBlog = require('./datas')
const ABlog = require('./admin.js')
const PBlog = require('./primary.js')
const nuseryBlog = require('./nursery.js')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const Studentpassport = require('./goldenPassport.js')
const fs = require('fs');
const path = require('path');
const cors = require('cors');



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

// Directory to store uploaded files
const uploadDir = path.join(__dirname, 'uploads');

// Check if directory exists and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//midle 
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
app.get('/admin', (req, res) => {
    res.render('admin')
})

app.get('/myschool', (req, res)=>{
    res.render('myschool')
})
app.get("/admin_form", (req, res) => {
    res.render("admin_form")
})
app.get("/golden_hills", async (req, res)=>{
    try{
        let data = await Studentpassport.findOne({studentId:'BRS2624ZXB'})
        if(data != null){
           res.render('golden_hills', {result:data})
        }
        else{
            console.log(`No data found for ${joy}`)
        }
    }
    catch(err){
        console.log(err)
    }
})
//saving primary data to databse 
app.post('/primary', (req, res) => {
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
    const Blog = new nuseryBlog(req.body);
    Blog.save()
        .then((result) => {
            res.render('nursery')
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
                else if (x == "primary") {
                    res.render('primary');
                }
                else {

                    res.render('nursery')
                }
            }
        })
        .catch(err => {
            console.log(err)
        })

})

//NEW EDITION STUDENT RESULT 
app.post('/result', async (req, res)=>{
    let clas = req.body.class;
    let term = req.body.term;
    let id = req.body.studentId;
    let name = req.body.userName;
    try{
        let data = await Studentpassport.findOne({studentId:id})
        if(data != null){
           res.render('golden_hills', {result:data})
        }
        else{
            console.log(`No data found for ${name}`)
        }
    }
    catch(err){
        console.log(err)
    }
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

//searching student ID base on student name
app.get('/getstudentid', async (req, res) => {
    try {
        let student_name = req.query.student_name;

        let studentId = await Studentpassport.find({ userName:{ $regex: student_name, $options: 'i' } });

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
   try{
    let studentId = await Studentpassport.find({class: studentClass });
    res.json(studentId)

   }
   catch(err){
    console.log(err)
   }
})

//getting student id by classname
app.get('/getsectionid', async(req, res)=>{
    let studentClass = req.query.class;
   try{
    let studentId = await Studentpassport.find({ class:{ $regex: studentClass, $options: 'i' } });
    res.json(studentId)
   }
   catch(err){
    console.log(err)
   }
})

//CORRECTING WRONG ENTRY NAME
app.patch('/update-student-name', async (req, res) => {
    const { currentName, newName } = req.query; // Capture currentName and newName from query parameters
    console.log('Current Name:', currentName);
    console.log('New Name:', newName);

    try {
        const regex = new RegExp(`^${currentName}$`, 'i'); // Ensure exact case-insensitive match
        console.log('Regex:', regex);

        const updatedStudent = await Studentpassport.findOneAndUpdate(
            { userName: { $regex: regex } }, // Case-insensitive search
            { userName: newName },
            { new: true } // Return the updated document
        );

        if (updatedStudent) {
            console.log('Updated Student:', updatedStudent);
            res.status(200).json(updatedStudent);
        } else {
            console.log('Student not found');
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


//generating student id and passport upload
app.get('/passport-upload', (req, res)=>{
    res.render('passport-upload')
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
        passport: req.file ? req.file.filename : null  // Save filename or null if no file uploaded
    });

    newPassport.save()
        .then(result => {
            console.log(result);
            res.redirect('/passport-upload');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

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