const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
//const { EMAIL, PASSWORD } = require('../env.js')
 const EMAIL=process.env.EMAIL;
 const PASSWORD=process.env.PASSWORD;

const { PropertiesHR } = require("../models/propertyModel");
const { UsersHR } = require("../models/userModel");
const { UsersTrackerHR } = require("../models/userTrackerModel");
const { RegisteredUsersHR } = require("../models/registerModel");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

var upload = multer({ storage: storage }).single("imgg");


async function checkadd(req,res) {
  let doc=await PropertiesHR.findOne({_id:"642dae502bdb8a3506456e32"},{postedOn:1,_id:0})
  
  let dd=new Date(doc.postedOn).getFullYear()
  dd=String(dd)
  console.log(dd);
  res.send(dd)
}



async function propertyDisplay(req, res) {
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

  if (doc) doc = await PropertiesHR.find({ ownerId: { $ne: uid } });
  else doc = await PropertiesHR.find();

  let arrc = ["Location", "Budget", "Size-bhk", "Property-Type"];

  let locationtrack, costtrack, sizetrack, typetrack;

  if (req.body.location !== "Location") {
    locationtrack = req.body.location;
  }
  if (req.body.bhkSize !== "Size-bhk") {
    if (String(req.body.bhkSize)[0] == "a") {
      sizetrack = "size" + 4;
    } else {
      sizetrack = "size" + String(req.body.bhkSize)[0];
    }
  }
  if (req.body.propertyType !== "Property-Type") {
    if(req.body.propertyType=="Office Space")
      typetrack="OfficeSpace"  
    else typetrack = req.body.propertyType;
  }
  doc.forEach((ele) => {
    let valid = true;
    if (req.body.location !== "Location") {
      if (ele.location !== req.body.location) valid = false;
    }
    if (req.body.cost !== "Budget") {
      if (
        req.body.cost == "1k - 10k" &&
        (ele.cost >= 10000 || ele.cost.endsWith("Lac"))
      ) {
        console.log(ele.cost);
        valid = false;
        costtrack = "low";
      } else if (
        req.body.cost == "10k - 50k" &&
        (ele.cost < 10000 || ele.cost >= 50000 || ele.cost.endsWith("Lac"))
      ) {
        costtrack = "middle";
        valid = false;
      } else if (
        req.body.cost == "50k - 1Lac" &&
        (ele.cost.endsWith("Lac") || ele.cost < 50000)
      ) {
        costtrack = "high";
        valid = false;
      } else if (req.body.cost == "above 1Lac" && !ele.cost.endsWith("Lac")) {
        costtrack = "vhigh";
        valid = false;
      }
    }
    if (req.body.bhkSize !== "Size-bhk") {
      let val = req.body.bhkSize.substring(0, 1);

      if (val == "a") {
        if (ele.bhkSize <= "3") valid = false;
      } else if (ele.bhkSize != val) {
        valid = false;
      }
    }
    if (req.body.propertyType !== "Property-Type") {
      if (ele.propertyType !== req.body.propertyType) valid = false;
    }

    if (valid) {
      arr.push({
        id: ele._id,
        img: ele.image,
        bhk: ele.bhkSize,
        location: ele.location,
        property_name: ele.propertyName,
        cost: ele.cost,
      });
    }
  });
  if (uid && req.body.search) {
    console.log("done");
    let doc = await UsersTrackerHR.findOne({ userId: uid });
    console.log(doc);
    let val;
    if (sizetrack) {
      val = doc.intrest.bhk.toObject()[sizetrack];
      sizetrack = "intrest.bhk." + sizetrack;

      // let val=doc.sizetrack
      console.log(val, sizetrack);
      val++;
      console.log(val);
      await UsersTrackerHR.updateOne(
        { userId: uid },
        { $set: { [sizetrack]: Number(val) } }
      );
    }
    if (typetrack) {
      val = doc.intrest.propertyType.toObject()[typetrack];

      typetrack = "intrest.propertyType." + typetrack;

      // let val=doc.sizetrack
      console.log(val, typetrack);
      val++;
      console.log(val);
      await UsersTrackerHR.updateOne(
        { userId: uid },
        { $set: { [typetrack]: Number(val) } }
      );
    }

    if (locationtrack) {
      let present = false;
      let arrloc = [...doc.intrest.location];
      for (let i = 0; i < arrloc.length; i++) {
        if (arrloc[i]._id == locationtrack) {
          present = true;
          val = arrloc[i].count;
          break;
        }
      }
      console.log(present);
      if (present) {
        val++;
        console.log(val);
        let docc = await UsersTrackerHR.updateOne(
          { userId: uid, "intrest.location._id": locationtrack },
          { $set: { "intrest.location.$.count": val } }
        );
        // console.log(docc);
      } else {
        let docc = await UsersTrackerHR.updateOne(
          { userId: uid },
          { $push: { "intrest.location": { _id: locationtrack, count: 1 } } }
        );
      }
    }
    if (costtrack) {
      val = doc.intrest.cost.toObject()[costtrack];
      val++;
      console.log(val);
      costtrack = "intrest.cost." + costtrack;
      await UsersTrackerHR.updateOne(
        { userId: uid },
        { $set: { [costtrack]: Number(val) } }
      );
    }
  }

  // console.log(arr);
  res.send(arr);
}
async function getPropertyId(req, res) {
  let iid = req.body.id;
  let doc = await PropertiesHR.findOne({ _id: iid });
  jwt.verify(
    req.headers.periperi,
    process.env.SECRETKEY,
    async (err, authdata) => {
      if (err) {
        // res.send("Ivalid User!");
        res.send(doc.toObject());
      } else {
        console.log("okok");
        let docc = await UsersTrackerHR.findOne({ userId: authdata.userId });
        let val1, val2, val3, val4;
        let locationtrack, typetrack, sizetrack, costtrack;
        locationtrack = doc.location;
        let present = false;
        let arrloc = [...docc.intrest.location];
        for (let i = 0; i < arrloc.length; i++) {
          if (arrloc[i]._id == locationtrack) {
            present = true;
            val1 = arrloc[i].count;
            break;
          }
        }
        console.log(present);
        if(present){
          val1++;
          console.log(val1, locationtrack);

        }

        typetrack=doc.propertyType
        if(typetrack=="Office Space")
          typetrack="OfficeSpace"
        val2 = docc.intrest.propertyType.toObject()[typetrack];

        typetrack = "intrest.propertyType." + typetrack;
  
        // let val=doc.sizetrack
        console.log(val2, typetrack);
        val2++;

        if (String(doc.bhkSize)[0] == "a") {
          sizetrack = "size" + 4;
        } else {
          sizetrack = "size" + String(doc.bhkSize)[0];
        }

        val3 = docc.intrest.bhk.toObject()[sizetrack];
        sizetrack = "intrest.bhk." + sizetrack;
        val3++;
        console.log(val3, sizetrack);
        if(!doc.cost.endsWith("Lac") && doc.cost<10000){
          costtrack="low"
        }
        else if( !doc.cost.endsWith("Lac") && doc.cost<50000){
          costtrack="middle"
        }
        else if(!doc.cost.endsWith("Lac")){
          costtrack="high"
        }
        else{
          costtrack="vhigh"
        }
        val4 = docc.intrest.cost.toObject()[costtrack];
        costtrack = "intrest.cost." + costtrack;
        val4++;
        console.log(val4, costtrack);
        if(present){

          let docc2 = await UsersTrackerHR.updateOne(
                { userId: authdata.userId,"intrest.location._id": locationtrack},
                { $set: { "intrest.location.$.count": val1,[sizetrack]: val3, [costtrack]: val4,[typetrack]: val2 } }
              );

        }
        else{
          let docc2 = await UsersTrackerHR.updateOne(
            { userId: authdata.userId},
            { $push: { "intrest.location": { _id: locationtrack, count: 1 } } ,$set: {[sizetrack]: val3 ,[costtrack]: val4,[typetrack]: val2 } }
          );
        }

      }
    }
  );
  
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
        res.json(obj).send();
      }
    }
  );
}

async function myProperties(req, res) {
  console.log("my properties");
  jwt.verify(
    req.headers.periperi,
    process.env.SECRETKEY,
    async (err, authdata) => {
      if (err) {
        res.send(null);
      } else {
        let userdoc = await UsersHR.findOne({ _id: authdata.userId });
        let proparr = userdoc.myProperties;
        // console.log(proparr);
        var arr = [];
        for (let i = 0; i < proparr.length; i++) {
          var obj = await PropertiesHR.findOne({ _id: proparr[i] });
          arr.push(obj);
        }
        // console.log(arr);
        res.send(arr);
        // let userdoc = await UsersHR.findOne({ _id: authdata.userId }).populate("myProperties");
        //  var arr = [];
        // for (let i = 0; i < userdoc.myProperties.length; i++) {
        //   arr.push(userdoc.myProperties[i]);
        // }
        // console.log(arr);
        // res.send(arr);
      }
    }
  );
}
async function sendEmail(userEmail,cost,name,email,mobile){
  //const { userEmail } = req.body;
  console.log("sendEmail fun entered");
  let config = {
      service : 'gmail',
      auth : {
          user:  EMAIL,
          pass: PASSWORD,
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "@Sand-box",
          link : 'https://Sand-box.js/'
      }
  })

  let response = {
      body: {
          name : "! User",
          intro: "Thank you for using Sand-box!",
          table : {
              data : [
                  {
                      ownername : name,
                      Email: email,
                      mobile:mobile,
                      price : cost,
                  }
              ]
          },
          outro: "Looking forward to find you more rentals"
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from : "hemalathabobba1@gmail.com",
      to : userEmail,
      subject: "Place Order",
      html: mail
  }
  console.log("before send mail");

  transporter.sendMail(message).then(() => {
    console.log("you should receive an email");
      return "you should receive an email"
     
  }).catch(error => {
    console.log("error ",error);
     return "error"
     
  })

return ("Signup Successfully...!");
}



async function storeRequest(req, res) {
  jwt.verify(
    req.headers.periperi,
    process.env.SECRETKEY,
    async (err, authdata) => {
      if (err) {
        res.send(null);
      } else {
        let propobj = await PropertiesHR.findOne({ _id: req.body.id });
        let obj = await UsersHR.findOne({ _id: authdata.userId });
        let regobj=await RegisteredUsersHR.findOne({ userId: authdata.userId });
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
        console.log(propobj.cost," ",regobj.name,regobj.email,regobj.mobile);
        //sending an email
       await sendEmail(req.body.email,propobj.cost,regobj.name,regobj.email,regobj.mobile);
        res.send({});
      }
    }
  );
}

async function removeRequest(req, res) {
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

async function updateProperty(req, res) {
  console.log("ok");
  upload(req, res, async (err) => {
    if (err) {
    } else {
      let obj = req.body;
      if (req.file) obj.image = "../images/" + req.file.originalname;
      // console.log(obj.image);
      console.log(obj);
      let obj2 = await PropertiesHR.updateOne(
        { _id: req.headers.pid },
        { $set: obj }
      );
      await UsersHR.updateMany(
        { "requestedProperties._id": req.headers.pid },
        {
          $set: {
            "requestedProperties.$.ownerName": obj.ownerName,
            "requestedProperties.$.propertyName": obj.propertyName,
            "requestedProperties.$.propertyType": obj.propertyType,
            "requestedProperties.$.image": obj.image,
            "requestedProperties.$.location": obj.location,
            "requestedProperties.$.cost": obj.cost,
            "requestedProperties.$.securityDeposit": obj.securityDeposit,
            "requestedProperties.$.facing": obj.facing,
            "requestedProperties.$.address": obj.address,
            "requestedProperties.$.balconies": obj.balconies,
            "requestedProperties.$.bhkSize": obj.bhkSize,
            "requestedProperties.$.baths": obj.baths,
            "requestedProperties.$.area": obj.area,
            "requestedProperties.$.furnishedStatus": obj.furnishedStatus,
            "requestedProperties.$.status": obj.status,
            "requestedProperties.$.since": obj.since,
          },
        }
      );
      res.send({ ok: "ok" });
    }
  });
}

async function addProperty(req, res) {
  console.log(req.body, "add property");
  jwt.verify(
    req.headers.periperi,
    process.env.SECRETKEY,
    async (err, authdata) => {
      if (err) {
        res.send(null);
      } else {
        var obj = req.body;
        obj.ownerId = authdata.userId;
        obj.RequestedUsers = [];
        obj.likedUsers = [];
        console.log(obj);
        await addProperty(obj);

        // await PropertiesHR.updateOne({_id:req.body.id},{$push : {RequestedUsers:authdata.userId}})
        res.send({});
      }
    }
  );
}

module.exports = {
  addProperty,
  removeRequest,
  storeRequest,
  myProperties,
  propertyDisplay,
  getPropertyId,
  requestedProperties,
  updateProperty,
  checkadd
};

