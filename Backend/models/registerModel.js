
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
        name: { 
          type: String,
           required: true ,
          minlength: 4,
          maxlength: 30},
        email: { 
          type: String,
           required: true, 
           unique: true ,
          match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
        password: { 
          type: String, 
          required: true, 
          unique: true,
          match:   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/ },
        mobile: { 
          type: Number,
           required: true,
            match: /^\\d{10}$/ },
        image:{
          type:String,
          default:"",
        },
        userId: {
           type: mongoose.Schema.Types.ObjectId,
           unique:true,
           required: true,
            ref: "UsersHRSchema" },
      };
  
     
      const RegisteredUsersHR = mongoose.model(
        "RegisteredUsersHR",
        RegisteredUsersHRSchema
      ); //models defined

      module.exports={RegisteredUsersHR};