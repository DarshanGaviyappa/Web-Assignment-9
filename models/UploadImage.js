// models/UploadImage.js

const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String

});

const UploadImage = mongoose.model("UploadImage", uploadSchema);

module.exports = UploadImage;