
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
    likedProperties: {type:[{ type: PropertiesHRSchema }],default:[]},
    requestedProperties: {type:[{ type: PropertiesHRSchema }],default:[]},
    myProperties: {type:[
      { type: mongoose.Schema.Types.ObjectId, ref: "PropertiesHRSchema" },
    ],default:[]},
  };

  const UsersHR = mongoose.model("UsersHR", UsersHRSchema);

  module.exports={UsersHR,UsersHRSchema};