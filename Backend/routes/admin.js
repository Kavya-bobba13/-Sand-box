
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { adminDashboard, dataDisplay,removeuser,removeproperty } = require("../controllers/admin");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const router=express.Router()


router.get("/admindisplay",adminDashboard);
router.post("/dataDisplay",dataDisplay);
router.post("/removeuser",removeuser);
router.post("/removeproperty",removeproperty);

module.exports =router;
