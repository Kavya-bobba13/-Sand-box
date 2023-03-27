
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
app.use(express.static("public"));
const router=express.Router()

const PropertiesHRSchema = {
    status: { type: Boolean },
    ownerName: { type: String },
    propertyName: { type: String },
    propertyType: { type: String },
    image: { type: String },
    location: { type: String },
    cost: { type: String },
    bhkSize: { type: String },
    area: { type: String },
    securityDeposit: { type: String },
    since: { type: String },
    facing: { type: String },
    address: { type: String },
    furnishedStatus: { type: String },
    beds: { type: String },
    baths: { type: String },
    balconies: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    RequestedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    ],
    likedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    ],
  };

  const PropertiesHR = mongoose.model("PropertiesHR", PropertiesHRSchema)
  module.exports={PropertiesHR,PropertiesHRSchema}