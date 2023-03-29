
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

const { PropertiesHR } = require("../models/propertyModel");
const { RegisteredUsersHR } = require("../models/registerModel");
const { UsersHR } = require("../models/userModel");

async function adminDashboard(req, res) {
  try{
    let result = await displayAll();
    res.send(result);
  }
  catch(err){
    res.send(err);
  }
    
  }

  async function displayAll() {
    try{
      result = await RegisteredUsersHR.find();
    return result;
    }
    catch(err){
      res.send(err);
    }
  }

module.exports={adminDashboard};