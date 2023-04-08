const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

const PropertiesHRSchema = {
  status: { type: Boolean, default: true },
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
  RequestedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" }],
    default: [],
  },
  likedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" }],
    default: [],
  },
  postedOn:{
    type:Date,
    default:new Date()
  }
};

const PropertiesHR = mongoose.model("PropertiesHR", PropertiesHRSchema);
module.exports = { PropertiesHR, PropertiesHRSchema };
