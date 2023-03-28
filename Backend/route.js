
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
const multer = require("multer");
app.use(express.urlencoded({ extended: false }));
// const multer=require("multer")

const router=express.Router()

//database connection

mongoose
  .connect(
    "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
  )
  .then(() => {
    console.log("Connection sucessful");
    app.use("/users",require("./routes/user"));

    // var storage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, '../frontend/images')
    //   },
    //   filename: function (req, file, cb) {
    //     cb(null, (file.originalname)) //Appending extension
    //   }
    // })
     
    // var upload = multer({ storage: storage }).single('myFile');
  //   var upload = multer({ storage: storage });
  //   app.post("/properties/uploadfile",upload.single('myFile'),(req,res)=>{
      
  //     console.log("ok");
  //     // upload(req,res,(err) => {
  //       console.log(req.file);
  //       // if(err){
  //       //   console.log(req.file);
  //       //     res.send(err)
  //       // }
  //       // else{
  //         console.log(req.body);
  //           res.send(req.file)
  //       //}
  //  //})
  //   })
    app.use("/properties",require("./routes/property"))
    app.use("/admin",require("./routes/admin"))
  });

app.listen(3000, () => {
  console.log("server running in 3000");
});
