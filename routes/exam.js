const express = require('express')
const Question = require('../schema/questions')
const upload = require('../middleware/upload')
const cloudinary = require('../middleware/cloudinary')
const router = express.Router()

router.get('/myschool/quiz', (req, res)=>{

    try {
        res.render('exam/quiz')
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

router.get('/myschool/quiz/exam', (req, res)=>{
    res.render('exam/exam')
})
router.get('/myschool/quiz/exam/summary', (req, res)=>{
    res.render('exam/exam-summary')
})
router.get('/myschool/quiz/exam_intro', (req, res)=>{
    res.render('exam/exam_intro')
})

// UPLOAD QUESTION
router.post( '/api/question-upload',
  upload.fields([
    { name: 'questImage', maxCount: 1 },
    { name: 'optImg1', maxCount: 1 },
    { name: 'optImg2', maxCount: 1 },
    { name: 'optImg3', maxCount: 1 },
    { name: 'optImg4', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        option1,
        option2,
        option3,
        option4,
        quest,
        subject,
        studentClass,
        topic,
        answer
      } = req.body;

      const files = req.files || {};

      let questImage = null;
      let opt1Image = null;
      let opt2Image = null;
      let opt3Image = null;
      let opt4Image = null;

      // Question image
      if (files.questImage?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.questImage[0].path
        );

        questImage = result.secure_url;
      }

      // Option 1 image
      if (files.optImg1?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.optImg1[0].path
        );

        opt1Image = result.secure_url;
      }

      // Option 2 image
      if (files.optImg2?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.optImg2[0].path
        );

        opt2Image = result.secure_url;
      }

      // Option 3 image
      if (files.optImg3?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.optImg3[0].path
        );

        opt3Image = result.secure_url;
      }

      // Option 4 image
      if (files.optImg4?.[0]) {
        const result = await cloudinary.uploader.upload(
          files.optImg4[0].path
        );

        opt4Image = result.secure_url;
      }

      const question = await Question.create({
        schoolName: req.session.schoolName,

        subject,

        studentClass,

        topic,

        question: [
          {
            text: quest,
            image: questImage
          }
        ],

        options: [
          {
            text: option1,
            image: opt1Image
          },
          {
            text: option2,
            image: opt2Image
          },
          {
            text: option3,
            image: opt3Image
          },
          {
            text: option4,
            image: opt4Image
          }
        ],

        answer: Number(answer)
      });

      res.status(201).json({
        success: true,
        message: 'Question uploaded successfully',
        question
      });

    } catch (err) {
      console.error('Question upload error:', err);

      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message
      });
    }
  }
);

module.exports = router