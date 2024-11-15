// server.js
const cors = require ('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors("*"));
// MongoDB connection
mongoose.connect('mongodb+srv://darshang117cs046:Darshan@cluster0.ybdyp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", cors(), (req, res) => {
  res.send("Hello from the homepage");
});
// User routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
