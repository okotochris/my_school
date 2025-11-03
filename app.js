const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Blog = require("./schema/data.js"); //junior class
const SBlog = require("./schema/datas.js"); // sinior class
const ABlog = require("./schema/admin.js");
const PBlog = require("./schema/primary.js"); //basic class
const Blacklist = require("./schema/blacklist.js");
const nuseryBlog = require("./schema/nursery.js"); // nursery
const nodemailer = require("nodemailer");
const Studentpassport = require("./schema/goldenPassport.js");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const schoolPfofile = require("./schema/schoolProfile");
const MongoStore = require("connect-mongo");
const { router: newsRouter, fetchNigerianSchoolNews } = require('./routes/news');
const generateSitemap = require('./sitemap/sitemap.js')
const resultGuide = require('./routes/resultCheckGuide.js')
const authRoute = require('./routes/auth.js')
const isAuthenticated = require('./utility/authenticated.js')
const app = express();

// middleware
app.use(express.static("image"));
app.use(express.static("uploads"));
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
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
    // fetchNigerianSchoolNews();
    generateSitemap();

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

// Directory to store uploaded files
const uploadDir = path.join(__dirname, "uploads");

// // Check if directory exists and create it if it doesn't
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

//midle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuring multer
const fileEngineStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the directory 'uploads/' exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
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
  res.render("admin", { school: req.session.school, fees: req.session.fees, role });
});

// API FOR SCHOOL MANAGEMENT SYSTEM
app.get("/myschool", isAuthenticated, (req, res) => {
  res.render("myschool");
});
app.get("/school", (req, res) => {
  res.render("school");
});
app.get("/admin_form", (req, res) => {
  res.render("admin_form");
});


//BLACKLIST API
app.get("/blacklist", isAuthenticated, async (req, res) => {
   const role= req.session.role
  try {
    let school = req.session.school;
    const data = await Blacklist.find({ school: school });
    res.render("blacklist", { data, school: req.session.school, fees: req.session.fees, role });
  } catch (err) {
    console.log(err);
  }
});
//REMOVING NAME FROM BLACKLIST
app.delete("/blacklist/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await Blacklist.findOneAndDelete({ studentId });

    if (deletedStudent) {
      res.status(200).json({ message: "Student removed from blacklist" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

//SAVING DATA TO BLACK LIST
app.post("/blacklist", async (req, res) => {
  let studentName = req.body.userName;
  let school = req.session.school;
  let studentId = req.body.studentId;
  const data = { studentName, studentId, school };

  try {
    const studnetInfo = new Blacklist(data);
    await studnetInfo.save();
    res.json("file added");
  } catch (err) {
    console.log(err);
  }
});

//saving primary data to databse
app.post("/primary", async (req, res) => {
  req.body.schoolName = req.session.school;
  try{
    const Blog = new PBlog(req.body);
    await Blog.save()
    res.render('primary')
    await updateFees(req.session.school, req)
  }
  catch(err){
    console.log(err)
  }
    
});

//saving nursery database
app.post("/nursery", async (req, res) => {
  req.body.schoolName = req.session.school;
  
  try{
    const Blog = new nuseryBlog(req.body);
    await Blog.save()
    res.render('nursery')
    await updateFees(req.session.school, req)
  }
  catch(err){
    console.log(err)
  }
});


//saving junior data
app.post("/adminJunior", async (req, res) => {
  req.body.schoolName = req.session.school;
  let schoolName = req.session.school;
  try{
    const blog = new Blog(req.body);
    await blog.save()
    res.render("adminJunior");
    await updateFees(schoolName, req)
  }
  catch(err){
    console.log(err)
  }
   
});

//saving senior data
app.post("/adminSenior", async (req, res) => {
  try {
    const schoolName = req.session.school;
    req.body.schoolName = schoolName; // Attach school name from session

    // Save new senior blog entry
    const Sblog = new SBlog(req.body);
    await Sblog.save();

    // Increment the school fee by 500 and update in MongoDB
    res.render("adminSenior"); // Redirect after processing
    await updateFees(schoolName, req)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//LOGING IN TO ACCESSS SCHOOL RESULT PAGE
app.get("/login", (req, res) => {
  res.render("login");
});

//LOGING IN TO UPLOAD STUDENT RESULT
app.post("/upload", isAuthenticated, (req, res) => {
  let x = req.body.Sclass;

  if (x == "senior") {
    res.render("adminSenior");
  } else if (x == "junior") {
    res.render("adminJunior");
  } else if (x == "primary") {
    res.render("primary");
  } else {
    res.render("nursery");
  }
});

//NEW EDITION STUDENT RESULT
app.post("/result", async (req, res) => {
  let clas = req.body.class;
  let term = req.body.term;
  let id = req.body.studentId;
  let name = req.body.userName;
  try {
    let data = await Studentpassport.findOne({ studentId: id });
    let student = await Blacklist.findOne({ studentId: id });

    if (student) {
      res.render("blacklistfile", { student });
    }

    let studentClass = clas.split(" ");
    if (studentClass[0] === "BASIC") {
      let details = await PBlog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-basic`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    } else if (studentClass[0] === "JSS") {
      let details = await Blog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-jss`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    } else if (studentClass[0] === "SS") {
      let details = await SBlog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];

      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-ss`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    } else if (studentClass[0] === "NURSERY" || studentClass[1] === "NURSERY") {
      let details = await nuseryBlog
        .find({ studentId: id, class: clas, term: term })
        .sort({ createdAt: -1 })
        .limit(1);
      details = details[0];
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-nursery`;
        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//GET STUDENT INFORMATION BASE ON ID
app.get("/studentinfomation", async (req, res) => {

  let studentId = req.query.studnetId;
  try {
    let info = await Studentpassport.findOne({ studentId });
  
    res.json(info);
  } catch (err) {
    console.log(err);
  }
});
//searching student ID base on student name
app.get("/getstudentid", async (req, res) => {
  try {
    let student_name = req.query.student_name;
    let school = req.session.school;
    let studentId = await Studentpassport.find({
      schoolName: school,
      userName: { $regex: student_name, $options: "i" },
    });
    if (studentId) {
      res.json(studentId);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//getting student id by classname
app.get("/getclassid", async (req, res) => {
  let studentClass = req.query.class;
  let schoolName = req.session.school;
  try {
    let studentId = await Studentpassport.find({
      schoolName,
      class: { $regex: studentClass, $options: "i" },
    });
    res.json(studentId);
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update-student", async (req, res) => {
  const { studentId, userName, addmissionNo, dob, classN, gender } = req.body; 
  console.log(req.body)
  try {
    const updatedStudent = await Studentpassport.findOneAndUpdate(
      { studentId }, // Use studentId to identify the student
      {
        userName,
        addmissionNo,
        dob,
        gender,
        class: classN,
        schoolName: req.session.school,
      },
      { new: true } // Return the updated document
    );

    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//UPDATING STUDENT RECORD PAGE
app.get("/update", isAuthenticated, (req, res) => {
  const role= req.session.role
  res.render("update", { school: req.session.school, fees: req.session.fees, role });
  
});
//generating student id and passport page
app.get("/generateid", isAuthenticated, (req, res) => {
  const role= req.session.role
  res.render("generateid", { school: req.session.school, fees: req.session.fees, role });
});
app.get('/staffmanagement', isAuthenticated, async (req, res)=>{
  const role= req.session.role
  if(role !== "admin"){
    res.redirect('/admin')
  }

  const staff = (await ABlog.find({school:req.session.school}))
  res.render('staff', { school: req.session.school, fees: req.session.fees, staff, role })
})

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
app.post("/passport", upload.single("passport"), (req, res) => {
  // Create a new instance of the Mongoose model
  const newPassport = new Studentpassport({
    userName: req.body.userName,
    studentId: req.body.studentId,
    addmissionNo: req.body.addmissionNo,
    dob: req.body.dob,
    class: req.body.class,
    passport: req.file ? req.file.filename : null, // Save filename or null if no file uploaded
    schoolName: req.session.school,
  });

  newPassport
    .save()
    .then((result) => {
      res.redirect("/generateid");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

// post request from school updating news field
app.post("/myschool", (req, res) => {
  res.redirect("index");
});

// configuring nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "okotoazachristain@gmail.com",
    pass: "bsnk bhyp bebw hwbt",
  },
});
//contact us form API
app.post("/contact", (req, res) => {
  const { name, school, email, number, message } = req.body;
  const mailOptions = {
    from: email,
    to: "okotoazachristain@gmail.com",
    subject: "MY SCHOOL RESULT HELP",
    text: `from\n Email: ${email} \n Name: ${name} \n School: ${school} \n Number: ${number}  \n ${message}`,
    phone_number: number,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      // Handle error, maybe send an error response to the client
    } else {
      // Redirect the client to the index page after sending the email
      res.status(200).redirect("/");
    }
  });
});
//TESTING RESULT TEMPLATE
app.get("/junior", (req, res) => {
  res.render("primary-result");
});
//STUDENT ID FORM
app.get("/studentid", isAuthenticated, (req, res) => {
   const role= req.session.role
  res.render("studentid", { school: req.session.school, fees: req.session.fees, role });
});

//STUDENT GRADING
app.get("/studentgrade", (req, res) => {
   const role= req.session.role
  res.render("studentgrade", { school: req.session.school, fees: req.session.fees, role });
});
//UPDATE STUDENT CLASS
app.patch("/updatestudentclass", async (req, res) => {
  let studentId = req.body.studentId;
  try {
    let student = await Studentpassport.findOneAndUpdate(
      { studentId },
      { class: req.body.studentClass },
      { new: true }
    );
    if (student.ok) {
      res.send("updated");
    }
  } catch (err) {
    console.log(err);
  }
});
//GET SCHOOL NAME
app.get("/schoolname", (req, res) => {
  let school = req.session.school;
  res.json(school);
});

//LOGOUT API
app.get("/logout", (req, res) => {
  req.session.destroy();
  //res.clearCookie('connect.sid'); 
  res.redirect("login");
});
//STUDENT PERFOMANCE
app.get("/studentperfomance", isAuthenticated, async (req, res) => {
  try {
    let studentClass = req.query.class;
    let newClass = studentClass.split(" ");
    let schoolName = req.session.school || "no school";
    if (newClass[0] == "SS") {
      result = await SBlog.find({
        class: new RegExp("^" + req.query.class),
        section: req.query.section,
        schoolName: { $regex: schoolName, $options: "i" },
      });
    } else if (newClass[0] == "JSS") {
      result = await Blog.find({
        class: new RegExp("^" + req.query.class),
        section: req.query.section,
        schoolName: { $regex: schoolName, $options: "i" },
      });
    } else if (newClass[0] == "BASIC") {
      result = await PBlog.find({
        class: new RegExp("^" + req.query.class),
        section: req.query.section,
        schoolName: { $regex: schoolName, $options: "i" },
      });
    } else if (newClass[0] == "PRE") {
      result = await nuseryBlog.find({
        class: req.query.class,
        section: req.query.section,
        schoolName: { $regex: schoolName, $options: "i" },
      });
    } else if (newClass[0] == "NURSERY") {
      result = await nuseryBlog.find({
        class: new RegExp("^" + req.query.class),
        section: req.query.section,
        schoolName: { $regex: schoolName, $options: "i" },
      });
    }
    if (result) {
      res.json(result);
    } else {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//UPDATE SENIIOR RESULT
app.get("/update-ss", isAuthenticated, (req, res) => {
  res.render("update_ss");
});
//UPDATE JUNIOR RESULT
app.get("/update-jss", isAuthenticated, (req, res) => {
  res.render("update_jss");
});
//UPDATE  BASIC RESULT
app.get("/update-basic", isAuthenticated, (req, res) => {
  res.render("update_basic");
});
//UPDATE NURSERY RESULT
app.get("/update-nursery", isAuthenticated, (req, res) => {
  res.render("update_nursery");
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
//UPDATING BASIC SCHOOL RESULT
app.patch("/update_basic_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await PBlog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("updated successfully");
    } else {
      res.status(400).send("file not found");
    }
  } catch (err) {
    res.status(500).send("server error");
  }
});
//UPDATING NURSERY
app.patch("/update_nursery_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await nuseryBlog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
    }
  } catch {
    res.status(500).send(err);
  }
});
//UPDATING JUNIOR SCHOOL RESULT
app.patch("/update_junior_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await Blog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
//UPDATING SENIOR SCHOOL RESULT
app.patch("/update_senior_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await SBlog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
      console.log('not found')
    }
  } catch (err) {
    res.status(500).send('server error');
  }
});
//updating school fees
async function updateFees(schoolName, req){
  const updatedSchool = await schoolPfofile.findOneAndUpdate(
    { schoolName },
    { $inc: { fees: 500 } },
    { new: true } // Return updated document
  );
  // Update the session with the new fees
  req.session.fees = updatedSchool.fees;
}
//KHRISTAL TECH SUMMAR DETAILS 
app.get('/summary', isAuthenticated, async (req, res)=>{
  try{
    const school = await schoolPfofile.find()
    res.render('summary', {school})
  }
  catch(err){
    console.log(err)
  }
})
app.use(newsRouter)
app.use(resultGuide)
app.use(authRoute)
app.use((req, res) => {
  res.status(404).render("page_not_found");
});

