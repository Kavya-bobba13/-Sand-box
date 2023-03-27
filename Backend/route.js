
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router=express.Router()

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
  });

//multer for upload images
const multer = require("multer");
app.post("/imgUpload", function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("something is wrong");
    } else {
      res.send(req.file);
    }
  });
});
//disk storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imgUploads");
    // https://drive.google.com/drive/folders/1Erxp-H3dHLObXU6FhfM7igdvmmdWogj8?usp=share_link
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("demo_img");

app.listen(3000, () => {
  console.log("server running in 3000");
});
