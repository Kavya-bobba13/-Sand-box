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
const router = express.Router();

const { PropertiesHR } = require("../models/propertyModel");
const { RegisteredUsersHR } = require("../models/registerModel");
const { UsersHR } = require("../models/userModel");
const { UsersTrackerHR } = require("../models/userTrackerModel");

async function adminDashboard(req, res) {
  try {
    let result = await displayAll();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
}

async function displayAll() {
  try {
    result = await RegisteredUsersHR.find();
    return result;
  } catch (err) {
    res.send(err);
  }
}

async function dataDisplay(req, res) {
  let obj = {};
  let docs = await RegisteredUsersHR.find({
    _id: { $ne: "641b1f2da200c7ee16d4afa3" },
  });
  obj.usersCount = docs.length;
  obj.requestsCount = 0;

  for (let i = 0; i < docs.length; i++) {
    docs[i] = docs[i].toObject();
    doc2 = await UsersHR.findOne({ _id: docs[i].userId });

    docs[i].rp = doc2.requestedProperties.length;
    docs[i].mp = doc2.myProperties.length;
    obj.requestsCount += docs[i].rp;
  }
  obj.udata = docs;

  docs = await PropertiesHR.find();
  obj.propertiesCount = docs.length;

  for (let i = 0; i < docs.length; i++) {
    docs[i] = docs[i].toObject();

    docs[i].RequestedUsers = docs[i].RequestedUsers.length;
    docs[i].likedUsers = docs[i].likedUsers.length;
  }
  obj.pdata = docs;

  //HOT USERS LIST
  let dd=new Date()
  let hdoc_date=new Date(Date.UTC(dd.getUTCFullYear(),dd.getUTCMonth(),dd.getUTCDate()-1));
  console.log(hdoc_date);

  let hdoc = await UsersTrackerHR.aggregate([
    {
      $match: {
        "timespent.date": { $gte: hdoc_date },
      },
    },
    {
      $project: {
        userId:1,
        timespent: {
          $filter: {
            input: "$timespent",
            as: "timespent",
            cond: {
              $gte: ["$$timespent.date", hdoc_date],
            },
          },
        },
      },
    },
    {
      $addFields: {
        totaltimes: { $sum: "$timespent.time_in_seconds" },
      },
    },
    {
      $sort: { totaltimes: -1 },
    },
    {
      $project: {
        _id: 1,
        totaltimes: 1,
        userId:1
      },
    },
  ]);

  console.log(hdoc);
  let arrh=[]
    for (let i = 0; i < hdoc.length; i++) {
      if(hdoc[i].userId=="641b1f2da200c7ee16d4afa1") continue;
      let value=await RegisteredUsersHR.findOne({userId:hdoc[i].userId},{_id:0,name:1,email:1,mobile:1});

      value=value.toObject()
      value.timespent=hdoc[i].totaltimes
      console.log(value);
      arrh.push(value)

    }
  obj.hotusers=arrh

  let graph1 = await PropertiesHR.aggregate([
    {
      $group: {
        _id: "$location",
        countDocs: { $count: {} },
        sumreq: { $sum: { $size: "$RequestedUsers" } },
      },
    },
  ]);
  obj.graph1 = graph1;

  let graph2 = await PropertiesHR.aggregate([
    {
      $group: {
        _id: "$propertyType",
        sumreq: { $sum: { $size: "$RequestedUsers" } },
      },
    },
  ]);
  obj.graph2 = graph2;

  //  let graph3=await PropertiesHR.find({},{cost:1,_id:0})
  let graph3 = await PropertiesHR.aggregate([
    {
      $group: {
        _id: "$cost",
        countDocs: { $sum: { $size: "$RequestedUsers" } },
      },
    },
  ]);
  obj.graph3 = graph3;
  res.send(obj);
}

async function removeuser(req,res){
  res.send("ok")
}

async function removeproperty(req,res){

  res.send("ok")
}

module.exports = { adminDashboard, dataDisplay,removeuser,removeproperty};
