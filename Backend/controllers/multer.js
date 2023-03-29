
const multer = require("multer")
const express=require("express")
const jwt = require("jsonwebtoken")
const app=express()
const path = require('path');
const bodyParser = require("body-parser");
const { addProperty } = require("./property");
const { PropertiesHR } = require("../models/propertyModel");
const { UsersHR } = require("../models/userModel");
app.use(express.urlencoded({ extended: false }));



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/images')
  },
  filename: function (req, file, cb) {
    cb(null, (file.originalname)) //Appending extension
  }
})
 
var upload = multer({ storage: storage }).single('myFile');
//var upload = multer({ storage: storage });
//app.post("/properties/uploadfile",uploadImg)

function uploadImg(req,res){
  try{
    console.log("ok");
  console.log(req.form,"main");
  upload(req,res,(err) => {
    console.log(req.file);
    if(err){
      console.log(req.file);
        res.send(err)
    }
    else{
      console.log(req.body,"hey",req.body.propertyType);
      console.log(req.body.key);
      
        var obj={};
        obj.ownerName=req.body.ownerName;
        obj.propertyName=req.propertyName;
        obj.propertyType=req.body.propertyType;
        obj.location=req.body.location;
        obj.facing=req.body.facing;
        obj.cost=req.body.cost;
        obj.securityDeposit=req.body.securityDeposit;
        obj.address=req.body.address;
        obj.furnishedStatus=req.body.furnishedStatus;
        obj.beds=req.body.beds;
        obj.since=req.body.since;
        obj.baths==req.body.baths;
        obj.mobile=req.body.mobile;
        obj.balconies=req.body.balconies;
        obj.image="../images/"+req.file.originalname;
        console.log(obj);
        var key=req.body.key;
        jwt.verify(key,
          process.env.SECRETKEY,
          async (err,authdata)=>{
            if(err){
              console.log(err);
            }
            else{
              obj.ownerId=authdata.userId;
              obj.RequestedUsers=[];
              obj.likedUsers=[];
              console.log(obj);
             // await addProperty(obj);
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
 

module.exports={uploadImg};
