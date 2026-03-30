const multer = require("multer");
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

module.exports = upload;