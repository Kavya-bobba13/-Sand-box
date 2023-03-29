
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { register, valid, addNewUser, userProfile ,requestedUsers } = require("../controllers/user");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const router=express.Router()


router.post("/regi",register);
router.post("/valid",valid);
router.post("/addUser",addNewUser);
router.post("/getData",userProfile);
router.post("/requestedUsers",requestedUsers);
module.exports =router;