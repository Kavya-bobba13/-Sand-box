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
      requestedProperties:[{ type: PropertiesHRSchema }],
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
    ); //model is DarUser

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

    //post calls
    app.post("/addUser", async function (req, res) {
      console.log(req.body);
      console.log("done adduser");
      let email = req.body.email;
      let uname = req.body.uname;
      let password = req.body.password;
      let mobileno = req.body.mobileno;
      let obj=await addUser({
        name: uname,
        email: email,
        password: password,
        mobile: mobileno,
      });

      let data={
        name: obj.name,
        userId:obj.userId,
        email:obj.email,
        mobileno:obj.mobile
      };
      jwt.sign(
        data,
        process.env.SECRETKEY,
        { expiresIn: "24h" },
        (err, token) => {
          console.log(token);
          res.send({token:token})
        }
      );
      
    });

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

      if (unameb!=null) {
        console.log(unameb);
        let data = {
          name: unameb,
          userId:obj[0].userId,
          email:obj[0].email,
          mobileno:obj[0].mobile
        };

        jwt.sign(
          data,
          process.env.SECRETKEY,
          { expiresIn: "24h" },
          (err, token) => {
            console.log(token);
            res.send({token:token})
          }
        );

      
      }
      else{

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

    app.post("/pdata", async (req, res) => {
      console.log(req.body);
      let type = req.body.type;
      let arr = [];

      let doc = await PropertiesHR.find();
      //console.log(doc);
      doc.forEach((ele) => {
        console.log(ele.toObject());
        if (ele.toObject().type == type) {
          console.log(ele);
          arr.push({
            id: ele.toObject()._id,
            img: ele.toObject().image,
            bhk: ele.toObject().bhkSize,
            location: ele.toObject().location,
            property_name: ele.toObject().propertyName,
            cost: ele.toObject().cost,
          });
        }
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
      let result = await displayAll();
      res.send(result);
    });

    //getting user data for profile
    app.post("/getData", (req, res) => {
      let name = req.body.name;
      jwt.verify(name,process.env.SECRETKEY,async (err,authdata)=>{
        if(err){
            res.send("not authorized")
        }
        else{
          res.send(authdata);
        }
      })
      
    });

    app.get("/admindisplay", async (req, res) => {
      let result = await displayAll();
      res.send(result);
    });

    app.post("/requests_liked",async(req,res)=> {
      console.log("hii");
      console.log(req.headers.periperi)
      jwt.verify(req.headers.periperi,process.env.SECRETKEY,async (err,authdata)=>{
        if(err){
            res.send(null)
        }
        else{
          let doc=await UsersHR.findOne({_id:authdata.userId});
          console.log(doc);
          let obj;
          obj={requested:doc.re}
          res.json();
        }
      })
    })

  });

app.listen(3000, () => {
  console.log("server running in 3000");
});
