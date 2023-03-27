
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
    
    const RegisteredUsersHRSchema = {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        mobile: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
      };
  
     
      const RegisteredUsersHR = mongoose.model(
        "RegisteredUsersHR",
        RegisteredUsersHRSchema
      ); //models defined

      module.exports={RegisteredUsersHR};