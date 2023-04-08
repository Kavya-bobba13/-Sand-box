const mongoose= require("mongoose");
const { app } = require("../main.js");
const supertest = require("supertest");
const request= supertest(app);
//const express= require("express");
// const { valid } = require("../controllers/user");
const property = require("../routes/property.js");


app.use("/properties",property);

// describe('change password', () => {
//     it('if any field is null', async() => {
//         const res=await request.post("/properties/store_request").send({
//             cpwd:"",
//             newpwd:"",
//             rnewpwd:""
//         })
//         expect(res.body.update2).toEqual("invalid");
//     });
    
// });
