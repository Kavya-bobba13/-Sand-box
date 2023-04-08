
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
//const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const { app } = require("./main");
//app.use(express.urlencoded({ extended: true }));
// const multer=require("multer")
//const router=express.Router()

//database connection

// mongoose
//   .connect(
//     "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
//   )
//   .then(() => {
//     console.log("Connection sucessful");
//     app.use("/users",require("./routes/user"));
//     app.use("/properties",require("./routes/property"))
//     app.use("/admin",require("./routes/admin"))
//   });

var serverInstance=app.listen(3000, () => {
  console.log("server running in 3000");
});
 module.exports={serverInstance};