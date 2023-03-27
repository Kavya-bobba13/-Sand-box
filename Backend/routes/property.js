
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { propertyDisplay, getPropertyId, requestedProperties, myProperties, addProperty, storeRequest, removeRequest } = require("../controllers/property");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const router=express.Router()


router.post("/pdata",propertyDisplay)
router.post("/getid",getPropertyId)
router.post("/requests_liked",requestedProperties)
router.post("/myProperties",myProperties)
router.post("/addProperty",addProperty)
router.post("/store_request",storeRequest)
router.post("/remove_request",removeRequest)

module.exports =router;