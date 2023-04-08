const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
//const { EMAIL, PASSWORD } = require('../env.js')
 const EMAIL=process.env.EMAIL;
 const PASSWORD=process.env.PASSWORD;

const { PropertiesHR } = require("../models/propertyModel");
const { UsersHR } = require("../models/userModel");
const { RegisteredUsersHR } = require("../models/registerModel");

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
      } else if (
        req.body.cost == "10k - 50k" &&
        (ele.cost < 10000 || ele.cost >= 50000 || ele.cost.endsWith("Lac"))
      ) {
        valid = false;
      } else if (
        req.body.cost == "50k - 1Lac" &&
        (ele.cost.endsWith("Lac") || ele.cost < 50000)
      ) {
        valid = false;
      } else if (req.body.cost == "above 1Lac" && !ele.cost.endsWith("Lac")) {
        valid = false;
        z;
      }
    }
    if (req.body.bhkSize !== "Size-bhk") {
      let val = req.body.bhkSize.substring(0, 1);
      if (val == "a") {
        if (ele.bhkSize <= "3") valid = false;
      } else if (ele.bhkSize != val) valid = false;
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

  // console.log(arr);
  res.send(arr);
}
async function getPropertyId(req, res) {
  let iid = req.body.id;
  let doc = await PropertiesHR.find();
  doc.forEach((ele) => {
    if (ele.toObject()._id == iid) {
      res.send(ele.toObject());
    }
  });
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
        console.log(proparr);
        var arr = [];
        for (let i = 0; i < proparr.length; i++) {
          var obj = await PropertiesHR.findOne({ _id: proparr[i] });
          arr.push(obj);
        }
        console.log(arr);
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
};

module.exports = {
  addProperty,
  removeRequest,
  storeRequest,
  myProperties,
  propertyDisplay,
  getPropertyId,
  requestedProperties,
};
