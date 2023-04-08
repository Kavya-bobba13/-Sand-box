
const express=require("express")
const multer = require("multer")
const multerS3=require("multer-s3")
const aws= require("aws-sdk")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const app=express()
//const path = require('path');
//const bodyParser = require("body-parser");

const { PropertiesHR } = require("../models/propertyModel");
const { UsersHR } = require("../models/userModel");
const { RegisteredUsersHR } = require("../models/registerModel")
//app.use(express.urlencoded({ extended: false }));

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);                         //-${Date.now()}
      },
    }),
  });
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, (file.originalname)) //Appending extension
//   }
// })
 
//var upload = multer({ storage: storage }).single('myFile');

const uploadSingle = upload("houserentals-properties-upload").single('myFile');

function profilePic(req,res){
  console.log(req.form);
  console.log("profile upload kavya");

  uploadSingle(req,res,(err) => {
    if(err){
      console.log(req.file,"profile upload err");
      console.log(err);
        res.send(err)
    }
    else{
      var key=req.body.key;
        jwt.verify(key,
          process.env.SECRETKEY,
          async (err,authdata)=>{
            if(err){
              console.log(err,"Upload Profilepic err");
            }
            else{
              console.log(req.file);
             await RegisteredUsersHR.updateOne({userId:authdata.userId},{$set:{image:req.file.location}})
             res.send(req.file)
            }
          })
        
    }
})
}
   

function uploadImg(req,res){
  try{
    console.log("ok");
    console.log(req.form,"main");
  uploadSingle(req,res,(err) => {
    console.log(req.file);
    if(err){
      console.log(err);
      console.log(req.file,"nikhil");
        res.send(err)
    }
    else{
      console.log(req.body,"hey",req.body.propertyType);
      console.log(req.body.key,"hii",req.body.coordinates);
      const arr=req.body.coordinates.split(" ");
        var obj={};
      console.log("arr",arr);
        obj.coordinates=[parseFloat(arr[0]),parseFloat(arr[1])];
        obj.address=req.body.searchbox;
        console.log("searchbox",req.body.searchbox);
        obj.ownerName=req.body.ownerName;
        obj.propertyName=req.body.propertyName;
        obj.propertyType=req.body.propertyType;
        obj.location=req.body.location;
        obj.facing=req.body.facing;
        obj.cost=req.body.cost;
        obj.securityDeposit=Number(req.body.securityDeposit);
        obj.furnishedStatus=req.body.furnishedStatus;
        obj.beds=Number(req.body.beds);
        obj.since=Number(req.body.since);
        obj.baths=Number(req.body.baths);
        obj.mobile=Number(req.body.mobile);
        obj.balconies=Number(req.body.balconies);
       // obj.image="../images/"+req.file.originalname;
       obj.image= req.file.location;
        console.log(obj);
        var key=req.body.key;
        jwt.verify(key,
          process.env.SECRETKEY,
          async (err,authdata)=>{
            if(err){
              console.log(err,"kavya");
            }
            else{
              obj.ownerId=authdata.userId;
              obj.RequestedUsers=[];
              obj.likedUsers=[];
              console.log(obj);
             var prop=new PropertiesHR(obj);
             prop.save();
             await UsersHR.updateOne({_id:authdata.userId},{$push:{myProperties:prop._id}})
            }
          })
        
    }
})
  }
  catch(err){
    res.send(err);
  }
  
  
}
 

module.exports={uploadImg,profilePic};
