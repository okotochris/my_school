const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const MongoStore = require("connect-mongo");
const generateSitemap = require('./sitemap/sitemap.js')
const isAuthenticated = require("./utility/authenticated.js");
const upload = require("./middleware/upload.js");
const cloudinary = require("./middleware/cloudinary.js");
const dashboardRoute = require("./routes/dashboardRoute.js");
const adminRoute = require('./routes/schoolRoute.js')
const exam = require('./routes/exam.js')
const apiCallsRoute = require('./routes/apiCalls.js')
const authRoute = require('./routes/auth.js')
const resultUpload = require('./routes/uploadResult.js')
const StudentProfile = require('./schema/studentProfile.js')
const updateRoute = require('./routes/update.js')
const  analysisRoute = require('./routes/analysis.js');
const StudentResult = require("./schema/studentResult.js");
const studentRoute = require('./routes/student.js')
const checkResultRoute = require('./routes/checkresult.js')
const Staff = require("./schema/admin.js");
const bcrypt = require('bcrypt')
const app = express();

// middleware
app.use(express.static("image"));
app.use(express.static("uploads"));
app.use(express.static('public'))
app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);



//connecting to dateabase
const dbURI = 
  "mongodb+srv://data:L6EwGXzqyzLHNFxn@school.vvirl2y.mongodb.net/school?retryWrites=true&w=majority";
const local = 'mongodb://127.0.0.1:27017/school'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dbURI, // Use the same MongoDB connection URI for session storage
      collectionName: "sessions", // Store sessions in a collection named 'sessions'
      client: mongoose.connection.getClient(), // Use the same mongoose connection for the store
    }),
    secret: process.env.SESSION_SECRET || "jiiy8765yw",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 31536000, 
    },
  })
);




//midle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//setting port and connecting to server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async(err) => {
  if (err) {
    console.error(`Error starting the server: ${err.message}`);
  } else {
    console.log(`App is listening on port ${PORT}`);
   
  }
});

//setting view engine
app.set("view engine", "ejs");

// Allow requests from https://www.myschoolresult.com
const corsOptions = {
  origin: "https://www.myschoolresult.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
//defining our route
app.get("/", (req, res) => {
  res.render("index");
});
app.get('/about', (req, res)=>{
  res.render('about')
})

//adimin page to loging to result upload portal
app.get("/admin", isAuthenticated, (req, res) => {
   const role= req.session.role
  res.render("admin", { school: req.session.school, fees: req.session.fees, role, title:"Upload Result"});
});




app.delete('/deletestaff', async (req, res)=>{
  let _id = req.query.id;
  try{
    const response = await ABlog.findOneAndDelete({_id});
    if(response){
      res.status(200).json("deleted")
    }
    else{
      res.status(404).json("file not found")
    }
  }
  catch(err){
    console.log(err)
  }
})

// saving student ID and passport
app.post("/create-studentProfile", upload.single("passport"), async (req, res) => {
  try {
    let image = null;

    if (req.file) {
      // Upload to Cloudinary and wait for result
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "passports" });
      image = result.secure_url;
    }

    const studentProfile = new StudentProfile({
      fullname: req.body.fullname,
      studentId: req.body.studentId,
      schoolsession: req.body.schoolsession,
      addmissionNo: req.body.addmissionNo,
      dob: req.body.dob,
      class: req.body.class,
      passport: image, // Cloudinary URL or null
      schoolName: req.session.school,
      gender: req.body.gender
    });

    await studentProfile.save();
    res.status(200).json({message:"Saved"})
  } catch (err) {
    console.error("Error saving passport:", err);
    res.status(500).send("Internal Server Error");
  }
});
// post request from school updating news field
app.post("/myschool", (req, res) => {
  res.redirect("index");
});


//TESTING RESULT TEMPLATE
app.get("/junior", (req, res) => {
  res.render("primary-result");
});
//GET SCHOOL NAME
app.get("/schoolname", (req, res) => {
  let school = req.session.school;
  res.json(school);
});

//GETING RESULT FROM DATABASE
app.get("/student-result", async (req, res) => {
  const { studentId, term, sClass } = req.query;
  let school = req.session.school;
  let result = {};
  studentClass = sClass.split(" ");
  school = req.session.school;
  try {
    if (studentClass[0] == "BASIC") {
      result = await PBlog.findOne({ studentId, term, class: sClass });
    } else if (studentClass[0] == "SS") {
      result = await SBlog.findOne({ studentId, term, class: sClass });
    } else if (studentClass[0] == "JSS") {
      result = await Blog.findOne({ studentId, term, class: sClass });
    } else {
      result = await nuseryBlog.findOne({ studentId, term, class: sClass });
    }
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("result not found");
    }
  } catch (err) {
    res.status(500).json("server error");
    console.log(err);
  }
});

//updating school fees
async function updateFees(schoolName, req){
  const updatedSchool = await schoolPfofile.findOneAndUpdate(
    { schoolName },
    { $inc: { fees: 500 } },
    { new: true } // Return updated document
  );
  req.session.fees = updatedSchool.fees;
}



app.use(dashboardRoute);
// app.use(newsRouter)
app.use(apiCallsRoute)
//app.use(resultGuide)
 app.use(authRoute)
app.use(analysisRoute)
app.use(updateRoute)
// app.use(payment)
app.use(adminRoute)
app.use(resultUpload)
app.use(studentRoute)
app.use(checkResultRoute)
// app.use(staticRoute)
app.use(exam)

app.use((req, res) => {
  res.status(404).render("index");
});

