
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

const router=express.Router()

const PropertiesHRSchema = {
    status: { 
      type: Boolean ,
      // required:true,
      enum:[true,false],
      default:true
    },
    ownerName: { 
      type: String ,
      required:true,
      minlength:4,
      maxlength:40,
    },
    propertyName: { 
      type: String ,
      required: true,
      minlength:5,
      maxlength:40,
    },
    propertyType: { 
      type: String ,
      required: true,
      enum:["Flats","House","PG","Office Space"],
    },
    image: { 
      type: String ,
      required: true,},
    location: { 
      type: String ,
      required: true},
    cost: { 
      type: String,
      required: true},
    bhkSize: { 
      type: Number, 
      // required: true
    },
    area: { 
      type: Number,
      // required: true 
    },
    securityDeposit: { 
      type: Number,
      required: true },
    since: { 
      type: Number,
      required: true },
    facing: { 
      type: String,
      required: true, },
    address: {
       type: String,
       required: true },
    furnishedStatus: { 
      type: String ,
      required:true,
      enum:["fully","not"]},
    baths: {
       type: Number,
        required:true },
    balconies: { 
      type: Number,
      required:true },
    coordinates:{type:Array},
    ownerId: {
       type: mongoose.Schema.Types.ObjectId,
       required:true,
        ref: "UsersHRSchema" },
    RequestedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    ],
    likedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    ],
  };

  const PropertiesHR = mongoose.model("PropertiesHR", PropertiesHRSchema)
  module.exports={PropertiesHR,PropertiesHRSchema}