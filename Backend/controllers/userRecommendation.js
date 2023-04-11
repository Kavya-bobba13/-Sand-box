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
var NodeGeocoder = require('node-geocoder');
const router = express.Router();

const { PropertiesHR } = require("../models/propertyModel");
const { RegisteredUsersHR } = require("../models/registerModel");
const { UsersHR } = require("../models/userModel");
const {
  UsersTrackerHR,
  usersTrackerSchema,
} = require("../models/userTrackerModel");

async function tracking(req, res) {
  await UsersTrackerHR.insertMany(req.body);
  console.log("done inserting");
  res.send({ ok: "done" });
}

async function counting(req, res) {
  if (req.headers.periperi) {
    jwt.verify(
      req.headers.periperi,
      process.env.SECRETKEY,
      async (err, authdata) => {
        if (err) {
        } else {
          let timer = await UsersTrackerHR.findOne({
            userId: authdata.userId,
          })
            let val1=new Date()
            console.log("today",val1);
            let val11=(val1.getUTCFullYear()+"-"+(val1.getUTCMonth()+1).toString().padStart(2,"0")+"-"+(val1.getUTCDate()).toString().padStart(2,"0"))
            console.log(val11);
            let doc=await UsersTrackerHR.findOne({userId:authdata.userId})
            let val2=doc.timespent
            console.log(val2);
            if(val2.length>1){
                let val2c=val2[val2.length-1].toObject().time_in_seconds
                val2=val2[val2.length-1].toObject().date
                console.log(val2,val2c,val2.getDate());
                let val12=(val2.getUTCFullYear()+"-"+(val2.getUTCMonth()+1).toString().padStart(2,"0")+"-"+(val2.getUTCDate()).toString().padStart(2,"0"))
                console.log("prev",val12);
                if(val12==val11){
                    let count=val2c+Number(req.body.time)
                    console.log(count,val2);
                    
                    console.log(val2.toISOString(),val12,val11);
                    console.log(await UsersTrackerHR.updateOne({userId:authdata.userId,'timespent.date':val2.toISOString()},{$set:{'timespent.$.time_in_seconds':count}}))
                }
                else{
                    console.log("yes");
                    let count=Number(req.body.time)
                    await UsersTrackerHR.updateOne({userId:authdata.userId},{$push:{timespent:{date:val1,time_in_seconds:count}}})
                }
            }
            else{
                console.log("yes");
                let count=Number(req.body.time)
                console.log(count,val1);
                console.log(await UsersTrackerHR.updateOne({userId:authdata.userId},{$push:{timespent:{date:val1,time_in_seconds:count}}}))

            }
            // console.log(new Date());
        //   console.log((val.getFullYear()+"-"+(val.getMonth()+1).toString().padStart(2,"0")+"-"+val.getDate().toString().padStart(2,"0")))
        //   console.log((val.getFullYear()+"-"+(val.getMonth()+1).toString().padStart(2,"0")+"-"+val.getDate().toString().padStart(2,"0"))=="2023-04-06");
        //   console.log(timer);

          res.send({});
        }
      }
    );
  }
  else{
  console.log("ok");
  console.log(req.body.time);
  }
}

async function recommending(req, res) {
  jwt.verify(
    req.headers.periperi,
    process.env.SECRETKEY,
    async (err, authdata) => {
      if (err) {
        let result={}

        result.popular = await PropertiesHR.aggregate([
          {
            $addFields: { reqlen: { $size: "$RequestedUsers" } },
          },
          {
            $sort: { reqlen: -1 },
          },
        ]);
        console.log(result.popular);

        result.newRelease = await PropertiesHR.find({})
          .sort({ postedOn: -1 })
          .limit(8);
        
          res.send(result);
        
      } else {
        let result = {};
        let doc = await UsersTrackerHR.findOne({ userId: authdata.userId });
        let location,
          maxi = 0;
        let arr = [...doc.intrest.location];

        if (arr.length > 1) arr.sort((a, b) => (a.count > b.count ? -1 : 1));
        console.log(arr);
        let type,
          maxi2 = 0;
        let doc2 = doc.intrest.propertyType.toObject();
        for (let i in doc2) {
          console.log(i);
          if (doc.intrest.propertyType[i] > maxi2) {
            type = i;
            maxi2 = doc.intrest.propertyType[i];
          }
        }
        if (type == "OfficeSpace") type = "Office Space";
        console.log("ok");
        // console.log(arr[1]._id,type);
        console.log(maxi2);
        if (arr.length > 1 && arr[1]._id && type) {
          result.recommend = await PropertiesHR.find({
            location: arr[1]._id,
            propertyType: type,
            ownerId: { $ne: authdata.userId },
          });
          console.log("1111", result.recommend);
          if (result.recommend.length < 5) {
            let edata = await PropertiesHR.find({
              location: arr[1]._id,
              propertyType: { $ne: type },
              ownerId: { $ne: authdata.userId },
            });
            result.recommend.push(...edata);
            console.log("222", result.recommend);
            if (result.recommend.length < 5) {
              let edata2 = await PropertiesHR.find({
                location: { $ne: arr[1]._id },
                propertyType: type,
                ownerId: { $ne: authdata.userId },
              });
              result.recommend.push(...edata2);
              console.log("333", result.recommend);
            }
          }
        } else if (arr.length > 1 && arr[1]._id) {
          result.recommend = await PropertiesHR.find({
            location: arr[0]._id,
            ownerId: { $ne: authdata.userId },
          });
        } else if (type) {
          result.recommend = await PropertiesHR.find({
            propertyType: type,
            ownerId: { $ne: authdata.userId },
          });
        } else {
          console.log("ojj");
          result.recommend = await PropertiesHR.find({
            ownerId: { $ne: authdata.userId },
          }).limit(8);
        }

        console.log(result);

        // let cost,ct=0;
        // for (let i in doc.intrest.cost) {
        //    if(doc.intrest.cost[i]>ct)
        //     {
        //         ct=doc.intrest.cost[i]
        //         cost=i
        //     }

        // }

        // let today=new Date()
        // console.log(today<new Date('2023-04-02'));

        result.popular = await PropertiesHR.aggregate([
          {
            $addFields: { reqlen: { $size: "$RequestedUsers" } },
          },
          {
            $sort: { reqlen: -1 },
          },
        ]);
        console.log(result.popular);

        result.newRelease = await PropertiesHR.find({})
          .sort({ postedOn: -1 })
          .limit(8);
        res.send(result);
      }
    }
  );
}

async function recommendingLocation(req,res){
  

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB7Thyj9fZ-8j44gfQjgHZahML79VnNDZA', // for Mapquest, OpenCage, Google Premier
  formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
var loci;
await geocoder.reverse({lat:28.5967439, lon:77.3285038},  function(err, resp) {
  console.log(resp[0].city);
  loci=resp[0].city
  res.send(loci)
});
console.log(loci,1);
// res.send(loci)
}

module.exports = { tracking, counting, recommending ,recommendingLocation};
