
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer")
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const { checkadd,propertyDisplay, getPropertyId, requestedProperties, myProperties, updateProperty, storeRequest, removeRequest,locationProperties,liked, removeLike} = require("../controllers/property");
const { uploadImg, imageChange} = require("../controllers/multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const router=express.Router()



router.post("/pdata",propertyDisplay)
router.post("/getid",getPropertyId)
router.post("/requests_liked",requestedProperties)
router.post("/myProperties",myProperties)
// router.post("/addProperty",addProperty)
router.post("/store_request",storeRequest)
router.post("/remove_request",removeRequest)
router.post("/remove_like",removeLike)
router.post("/imgChange",imageChange)
router.post("/uploadfile",uploadImg)
router.post("/updateProperty",updateProperty)
router.post("/cc",checkadd)
router.post("/locationProperties",locationProperties)
router.post("/liked",liked)
//router.post("/uploadimg",img)




module.exports =router;