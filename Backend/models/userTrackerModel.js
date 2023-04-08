const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const {UsersHRSchema}= require("./userModel");
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

const usersTrackerSchema={
    userId:{
         type: mongoose.Schema.Types.ObjectId, ref: "UsersHRSchema" ,
         require:true
    },
    intrest:{
        type:{
        bhk:{
                size1:{type:Number,default:0},
                size2:{type:Number,default:0},
                size3:{type:Number,default:0},
                size4:{type:Number,default:0}   
            },
        propertyType:{
            Flats:{type:Number,default:0},
            House:{type:Number,default:0},
            PG:{type:Number,default:0},
            OfficeSpace:{type:Number,default:0}   
        },
        location:

           [
                {
                    _id:String,
                    count:Number
                }
            
            ]
            // Hyderabad:{type:Number,default:0},
            // Bengaluru:{type:Number,default:0},
            // Chennai:{type:Number,default:0},
            // Noida:{type:Number,default:0},
            // Mumbai:{type:Number,default:0},
            // Nostatusa:{type:Number,default:0},
            // Delhi:{type:Number,default:0},
        ,
        cost:{

            low:{type:Number,default:0},
            middle:{type:Number,default:0},
            high:{type:Number,default:0},
            vhigh:{type:Number,default:0},
        }
    },
    default:{
        bhk:{},
        propertyType:{},
        location:{},
        cost:{}
    }
    },
    location:{
        type:String,
        default:""
    },
    timespent:{type:[{
        date:{type:Date},
        time_in_seconds:{type:Number}
    }],
    default:[]

    }

}


const UsersTrackerHR = mongoose.model("UsersTrackerHR", usersTrackerSchema);
module.exports = { UsersTrackerHR, usersTrackerSchema };