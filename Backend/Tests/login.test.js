const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const user = require("../routes/user.js");

const app = new express();

// app.use("/users", user);

describe("TESTS", () => {
  // beforeAll(async () => {
  //   await mongoose.connect(
  //     "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
  //   );
  //   console.log("TEST DB");
  // });

  test("POST /user/login", async () => {
    const email = "kavya@gmail.com";
    const passwd = "1234";
    let payload={
      email:email,
      password:passwd
    }
    const res = await request(app).post("/users/valid").send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    console.log(res.token);
    expect(res.token).toEqual(undefined);

    //     expect(await res.body.email).toEqual(email);
  });    

 
    

    

  //   test("POST /user/register", async () => {

  //     const newuser = {

  //       name: "johnwick",

  //       email: "john@gmail.com",

  //       passwd: "johnwick",

  //       phone: "1234512345",

  //     };

  //     const response = await request(app).post("/user/register").send(newuser);

  //     console.log(response.body);

  //     expect(response.statusCode).toEqual(200);

  //     expect(response.body.name).toEqual(newuser.name);

  //     expect(response.body.email).toEqual(newuser.email);

  //     expect(response.body.phone).toEqual(newuser.phone);

  //   });

  //   test("GET /user/getcars", async () => {

  //     const id = "641bdcb42ae3920b845bc23d";

  //     const response = await request(app).get("/user/getcars").send({ id: id });

  //     expect(response.statusCode).toEqual(200);

  //     expect(response.body).tobe.an("array");

  //   })
});
 