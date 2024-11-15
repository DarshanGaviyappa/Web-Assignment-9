// middlewares/upload.js
const path = require('path');
const multer = require('multer');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// // Multer upload configuration
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === 'image/jpeg' ||
//       file.mimetype === 'image/png' ||
//       file.mimetype === 'image/gif'
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
//     }
//   },
// });

// Set up multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });


module.exports = { upload };
