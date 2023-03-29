
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


async function addNewUser(req, res) {
  try{
    console.log(req.body);
    console.log("done adduser");
    let email = req.body.email;
    let uname = req.body.uname;
    let password = req.body.password;
    let mobileno = req.body.mobileno;
    let obj = await addUser({
      name: uname,
      email: email,
      password: password,
      mobile: mobileno,
    });

    let data = {
      name: obj.name,
      userId: obj.userId,
      email: obj.email,
      mobileno: obj.mobile,
    };
    jwt.sign(
      data,
      process.env.SECRETKEY,
      { expiresIn: "24h" },
      (err, token) => {
        console.log(token);
        res.send({ token: token });
      }
    );
  }
    catch(err){
      res.send(err);
    }
    
  }

  async function addUser(obj) {
    try{
      let userid = new UsersHR({});
    userid = await userid.save();
    console.log(userid);
    const User = new RegisteredUsersHR({
      name: obj.name,
      email: obj.email,
      password: obj.password,
      mobile: obj.mobile,
      userId: userid._id,
    });
      return await User.save();
    }
    catch(err){
      res.send(err);
    }
    
  }

  async function display(name) {
    try {
      result = await RegisteredUsersHR.find({ email: name });
    console.log(result);

    return result;
    } catch (error) {
      res.send(error);
    }
    
  }
  
  async function valid(req, res){
    try{
      console.log(req.body);
    console.log("done pwd enter");
    var email = req.body.email;
    var pwd = req.body.password;
    var unameb = null;
    var obj = await display(email);
    //console.log(obj[0].password,"hi",pwd,obj[0].password===pwd,obj[0].email===email);
    if (obj.length > 0 && obj[0].email === email && obj[0].password === pwd) {
      unameb = obj[0].name;
      console.log("uname", unameb);
    }

    if (unameb != null) {
      console.log(unameb);
      let data = {
        name: unameb,
        userId: obj[0].userId,
        email: obj[0].email,
        mobileno: obj[0].mobile,
      };

      jwt.sign(
        data,
        process.env.SECRETKEY,
        { expiresIn: "24h" },
        (err, token) => {
          if(data.userId=="641b1f2da200c7ee16d4afa1")
          {
            res.send({ token: token,admin:"yesyes" })
          }
          else
          res.send({ token: token , statusCode:200});
        }
      );
    } else {
      console.log(unameb);
      res.send({ token: unameb });
    }
    }
    catch(err){
      res.send(err);
    }
    
  }

  async function register(req, res) {
    try{
      console.log(req.body);
    console.log("done regi");
    let email = req.body.email;
    var stat = "Invalid";
    let obj = await display(email);
    if (obj.length != 0) {
      if (obj[0].email == email) {
        console.log(obj[0].email);
        stat = "valid";
        console.log(obj[0]);
      }
    }

    console.log(stat);
    // return {status:"Invalid"};
    res.send({ status: stat });
    
    }
    catch(err){
      res.send(err);
    }
    
    
  }

 function userProfile(req, res) {
  try{
    let name = req.body.name;
    jwt.verify(name, process.env.SECRETKEY, async (err, authdata) => {
      if (err) {
        res.send("not authorized");
      } else {
        res.send(authdata);
      }
    });
  }
  catch(err){
    res.send(err);
  }
    
 }

 async function requestedUsers(req,res) {
    let id=req.body.id;
    console.log(id);
    let doc=await PropertiesHR.findOne({_id:id},{_id:0,RequestedUsers:1})
    console.log(doc);
    let arr=[]
    doc.RequestedUsers.forEach(async (ele,ind) => {
      
      
        let doc2= await RegisteredUsersHR.findOne({userId:String(ele)})
        console.log(doc2);
        arr.push(doc2)
        if((ind+1)==doc.RequestedUsers.length){
          res.send(arr)
        }
        
    });
    console.log(arr);
    
 }
 module.exports={valid,register,userProfile,addNewUser,requestedUsers};