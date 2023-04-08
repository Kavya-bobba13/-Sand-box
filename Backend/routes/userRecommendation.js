
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { tracking ,counting,recommending} = require("../controllers/userRecommendation");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const router=express.Router()


router.post("/store",tracking);
router.post("/countTime",counting);
router.post("/recommend",recommending);

module.exports =router;