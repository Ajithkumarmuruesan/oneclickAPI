const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to save the uploaded images
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Define how the filename should be saved (you can modify this as needed)
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

module.exports = upload;
