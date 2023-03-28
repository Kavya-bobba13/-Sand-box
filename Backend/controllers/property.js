
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
const { UsersHR } = require("../models/userModel");

async function propertyDisplay (req, res){
    console.log(req.body);
    let type = req.body.type;
    let arr = [];
    var doc = false;
    var uid;

    if (req.headers.periperi) {
      jwt.verify(
        req.headers.periperi,
        process.env.SECRETKEY,
        async (err, authdata) => {
          if (err) {
            //
          } else {
            console.log(authdata.userId);
            // doc= await PropertiesHR.find({ownerId:{$ne:authdata.userId}})
            // doc = await PropertiesHR.find();
            doc = true;
            uid = authdata.userId;
          }
        }
      );
    }

    if (doc) doc = await PropertiesHR.find({ ownerId: { $ne: uid },propertyType:type });
    else doc = await PropertiesHR.find({propertyType:type});
    doc.forEach((ele) => {
      
        arr.push({
          id: ele.toObject()._id,
          img: ele.toObject().image,
          bhk: ele.toObject().bhkSize,
          location: ele.toObject().location,
          property_name: ele.toObject().propertyName,
          cost: ele.toObject().cost,
        });
      
    });
    console.log(arr);
    res.send(arr);
}
async function getPropertyId(req, res){
    let iid = req.body.id;
    let doc = await PropertiesHR.find();
    doc.forEach((ele) => {
      if (ele.toObject()._id == iid) {
        res.send(ele.toObject());
      }
    })
}

async function requestedProperties(req, res) {
    console.log("hii");
    console.log(req.headers.periperi);
    jwt.verify(
      req.headers.periperi,
      process.env.SECRETKEY,
      async (err, authdata) => {
        if (err) {
          res.send(null);
        } else {
          let doc = await UsersHR.findOne({ _id: authdata.userId });
          // console.log(doc);
          let obj;
          obj = {
            requestedProperties: doc.requestedProperties,
            likedProperties: doc.likedProperties,
          };
          res.json(obj);
        }
      }
    );
  }

  async function myProperties(req,res){
    console.log("my properties");
    jwt.verify(req.headers.periperi,
      process.env.SECRETKEY,
      async (err,authdata)=>{
        if(err){
          res.send(null);
        }
        else{
          let userdoc=await UsersHR.findOne({_id: authdata.userId});
          let proparr=userdoc.myProperties;
          console.log(proparr);
          var arr=[];
          for(let i=0;i<proparr.length;i++){
            var obj=await PropertiesHR.findOne({_id:proparr[i]});
            arr.push(obj);
          }
          console.log(arr);
          res.send((arr));
        }
      })

    }

  async function storeRequest(req,res){
        jwt.verify(req.headers.periperi,
          process.env.SECRETKEY,
          async (err, authdata) => {
            if (err) {
              res.send(null);
            } else {
              let propobj = await PropertiesHR.findOne({ _id: req.body.id });
              let obj = await UsersHR.findOne({ _id: authdata.userId });
              obj = obj.toObject();
              let present = false;
              obj.requestedProperties.forEach((ele) => {
                if (ele._id == req.body.id) {
                  present = true;
                  return;
                }
              });
              if (!present) {
                await UsersHR.updateOne(
                  { _id: authdata.userId },
                  { $push: { requestedProperties: propobj } }
                );
                await PropertiesHR.updateOne(
                  { _id: req.body.id },
                  { $push: { RequestedUsers: authdata.userId } }
                );
              }
              res.send({});
            }
           
          }
        );
    }

  async function removeRequest (req, res){
        console.log("entered");
        jwt.verify(
          req.headers.periperi,
          process.env.SECRETKEY,
          async (err, authdata) => {
            if (err) {
              console.log("not ok");
              res.send(null);
            } else {
              let iid = String(req.body.iid).substring(
                0,
                String(req.body.iid).length - 2
              );
  
              console.log(iid);
  
              let obj = await UsersHR.findOne({ _id: authdata.userId });
              obj = obj.toObject();
              obj.requestedProperties.forEach((ele, ind) => {
                if (ele._id == iid) {
                  obj.requestedProperties.splice(ind, 1);
                  return;
                }
              });
  
              await UsersHR.updateOne(
                { _id: authdata.userId },
                { $set: { requestedProperties: obj.requestedProperties } }
              );
              await PropertiesHR.updateOne(
                { _id: iid },
                { $pull: { RequestedUsers: authdata.userId } }
              );
  
              res.send({});
            }
          }
        );
      }
    


  async function addProperty(req,res){
        console.log(req.body,"add property");
        jwt.verify(req.headers.periperi,
          process.env.SECRETKEY,
          async (err,authdata)=>{
            if(err){
              res.send(null);
            }
            else{
              var obj=req.body;
              obj.ownerId=authdata.userId;
              obj.RequestedUsers=[];
              obj.likedUsers=[];
              console.log(obj);
              // await Property(obj);
              
             await PropertiesHR.updateOne({_id:req.body.id},{$push : {RequestedUsers:authdata.userId}})
              res.send({})
            }
          }  
       )
    }
  

  module.exports={addProperty,removeRequest,storeRequest,myProperties,propertyDisplay,getPropertyId,requestedProperties};