
//multer-diskStorage code
const multer = require("multer")
//const multerS3=require("multer-s3")
//const aws= require("aws-sdk")
const express=require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const app=express()
const path = require('path');
const bodyParser = require("body-parser");

const { PropertiesHR } = require("../models/propertyModel");
const { UsersHR } = require("../models/userModel");
app.use(express.urlencoded({ extended: false }));

// const s3 = new aws.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: process.env.S3_BUCKET_REGION,
// });


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/images')
  },
  filename: function (req, file, cb) {
    cb(null, (file.originalname)) //Appending extension
  }
})
 
var upload = multer({ storage: storage }).single('myFile');


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

// --------------------------------------------------------------------------------------------------------------------------









//route.js before MVC is below



var data = require("./data.json");
var registeredUsers = require("./registered.json");
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

//database connection

mongoose
  .connect(
    "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
  )
  .then(() => {
    console.log("Connection sucessful");

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

    const UsersHRSchema = {
      likedProperties: [{ type: PropertiesHRSchema }],
      requestedProperties: [{ type: PropertiesHRSchema }],
      myProperties: [
        { type: mongoose.Schema.Types.ObjectId, ref: "PropertiesHRSchema" },
      ],
    };

    //model Registration={collection,schema}
    const RegisteredUsersHRSchema = {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, unique: true },
      mobile: { type: Number, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" },
    };

    const PropertiesHR = mongoose.model("PropertiesHR", PropertiesHRSchema);
    const UsersHR = mongoose.model("UsersHR", UsersHRSchema);
    const RegisteredUsersHR = mongoose.model(
      "RegisteredUsersHR",
      RegisteredUsersHRSchema
    ); //models defined

    //get calls

    async function displayAll() {
      result = await RegisteredUsersHR.find();
      return result;
    }
    async function display(name) {
      result = await RegisteredUsersHR.find({ email: name });
      console.log(result);

      return result;
    }

    //sigup user and add new user  calls
    
    app.use('/users',require('routes/userRoutes'));
    app.use('/properties',require('routes/propertyRoutes'));
    app.use('/admin',require('routes/adminRoutes'));


    app.post("/addUser", async function (req, res) {
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
    });
//adding a new user
    async function addUser(obj) {
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
    //function to addProperty new 
    async function addProperty(obj){
      let propid=new PropertiesHR(obj);

      await UsersHR.updateOne({_id:obj.ownerId},{$push : {myProperties:propid}})
      console.log("property saved",propid,"userid",obj.ownerId);
      return await propid.save();

    }

    //validating pwd of registered user
    app.post("/valid", async (req, res) => {
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
            res.send({ token: token });
          }
        );
      } else {
        console.log(unameb);
        res.send({ token: unameb });
      }
    });

    //checking if a mail is registered or not
    app.post("/regi", async (req, res) => {
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
      res.send({ status: stat });
    });
//display properties of "selected type"
    app.post("/pdata", async (req, res) => {
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
    });

    app.post("/getid", async (req, res) => {
      let iid = req.body.id;
      let doc = await PropertiesHR.find();
      doc.forEach((ele) => {
        if (ele.toObject()._id == iid) {
          res.send(ele.toObject());
        }
      });
    });

    //display all db
    app.get("/", async function (req, res) {
      let result = await PropertiesHR.find();

      res.send(result);
    });

    //getting user data for profile
    app.post("/getData", (req, res) => {
      let name = req.body.name;
      jwt.verify(name, process.env.SECRETKEY, async (err, authdata) => {
        if (err) {
          res.send("not authorized");
        } else {
          res.send(authdata);
        }
      });
    });

    app.get("/admindisplay", async (req, res) => {
      let result = await displayAll();
      res.send(result);
    });
// liked properties of user in my activity page
    app.post("/requests_liked", async (req, res) => {
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
    });
    //display my peroperties added
    app.post("/myProperties",async(req,res)=>{
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

      })
  //add property api to sell page
    app.post("/addProperty",async(req,res)=>{
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
            await addProperty(obj);
        
           // await PropertiesHR.updateOne({_id:req.body.id},{$push : {RequestedUsers:authdata.userId}})
            res.send({})
          }
        }  
     )
  })
//requested properties of user stored
    app.post("/store_request",async (req,res)=>{
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
    });

    app.post("/remove_request", async (req, res) => {
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
    });
  });

app.listen(3000, () => {
  console.log("server running in 3000");
});
