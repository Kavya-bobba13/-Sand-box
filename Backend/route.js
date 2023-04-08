
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app=express()
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt=require("bcrypt")
const saltRounds=8
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection

mongoose
  .connect(
    "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
  )
  .then(() => {
    console.log("Connection sucessful");
    app.use("/users",require("./routes/user"));
    app.use("/properties",require("./routes/property"))
    app.use("/admin",require("./routes/admin"))
    app.use("/userTrack",require("./routes/userRecommendation"))
  });

var serverInstance=app.listen(process.env.PORT || 3000, () => {
  console.log("server running in 3000");
});
 module.exports={serverInstance};