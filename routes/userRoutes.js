// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const UploadImage = require("../models/UploadImage");
const { validateUserCreation, validateUserUpdate } = require('../middlewares/validation');
const { upload } = require('../middlewares/upload');

// User Creation - Handle POST requests
router.post('/create', validateUserCreation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User Details - Handle PUT requests
router.put('/edit', validateUserUpdate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, fullName, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { fullName, password: hashedPassword });
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete User - Handle DELETE requests
router.delete('/delete', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve All Users - Handle GET requests
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload Image - Handle POST requests
// router.post('/uploadImage', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image uploaded' });
//     }
//     res.status(200).json({ message: 'Image uploaded successfully', imagePath: req.file.path });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Upload Image - Handle POST requests
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No image uploaded' });
      }

      // Create a new image document and save it to MongoDB
      const newImage = new UploadImage({
          data: req.file.buffer,
          contentType: req.file.mimetype
      });

      await newImage.save();

      res.status(200).json({ message: 'Image uploaded successfully', imageId: newImage._id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// router.post("/uploadImage", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }
//     //new changes
//     const imageWay = req.file.path;
//     const uploadImage = new UploadImage({
//       imageWay,
//     });
//     await uploadImage.save();
//     res.status(200).json({
//       message: "Image uploaded successfully",
//       // imagePath: req.file.path,
//       imagePath: imageWay,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get('/getAllImages', async (req, res) => {
  // try {
  //   // Fetch all records from the database
  //   const images = await UploadImage.find();
    
  //   if (images.length === 0) {
  //     return res.status(404).json({ message: 'No images found' });
  //   }

  //   res.status(200).json({
  //     message: 'Images fetched successfully',
  //     images: images
  //   });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  try {
    const images = await UploadImage.find({});
    if (images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }
    const imageList = images.map((img) => ({
      _id: img._id,
      contentType: img.contentType,
      data: img.data.toString('base64') // Convert buffer to base64
    }));
    res.json({ message: "Images fetched successfully", images: imageList });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


module.exports = router;
