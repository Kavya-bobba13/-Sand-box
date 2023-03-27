
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PropertiesHRSchema } = require("./propertyModel");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const router=express.Router() 

const UsersHRSchema = {
    likedProperties: [{ type: PropertiesHRSchema }],
    requestedProperties: [{ type: PropertiesHRSchema }],
    myProperties: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PropertiesHRSchema" },
    ],
  };

  const UsersHR = mongoose.model("UsersHR", UsersHRSchema);

  module.exports={UsersHR,UsersHRSchema};