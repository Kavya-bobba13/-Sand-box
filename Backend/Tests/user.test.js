const mongoose= require("mongoose");
const { app } = require("../main.js");
const supertest = require("supertest");
const request= supertest(app);
const user = require("../routes/user.js");
require("dotenv").config()

app.use("/users",user);


/* Connecting to the database before each test. */
// beforeAll(async () => {
//     await mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2");
//   });
  
//   /* Closing database connection after each test. */
// afterAll(async () => {
//     await mongoose.connection.close();
// });

describe('checking if a user is registered', () => {

  it('checking a registered user', async() => {
    const res= await request.post("/users/regi").send({
      email:"kavya@gmail.com",
    })
    console.log(res.body);
    expect(res.body.statusValid).toEqual("valid")
    expect(res.statusCode).toBe(200)

  });
  it('checking a not registered user',async () => {
    const res= await request.post("/users/regi").send({
      email:"kamala@gmail.com",
    })
   
   expect(res.body.statusValid).toEqual("Invalid")
    expect(res.statusCode).toBe(200)
    
  });
  
});


describe("checking if user valid given a username and password", () => {
  
    it("valid email and pwd ", async () => {
        const e="sai@gmail.com";
        const p="123"
        const response = await request.post("/users/valid").send({
          email: e,
          password: p
        })
        //console.log(response)
        
        expect(response.body.user).toEqual("valid pwd");
       expect(response.statusCode).toEqual(200)
      })
      it("if Admin logged in", async () => {
        const e="kn@gmail.com";
        const p="2122"
        const response = await request.post("/users/valid").send({
          email: e,
          password: p
        })
        //console.log(response)
        
        expect(response.body.user).toEqual("admin");
       expect(response.statusCode).toEqual(200)
      })

    it("Invalid password ", async () => {
        const response = await request.post("/users/valid").send({
          email: "kavya@gmail.com",
          password: "password"
        })
        expect(response.body.user).toEqual("Invalid pwd");
        expect(response.token).toBeUndefined();;
        
      })
    
      

})
describe('adding a new user ', () => {
 it('adding new user if all details are not null', async() => {
    const res=await  request.post("/users/addUser").send({
      uname:"Greeshma",
      password:"1234",
      email:"greesh@gmail.com",
      mobileno:9878787878,
    })
    expect(res.body.user).toEqual("valid");
  });
  it('not adding new user if any details are null', async() => {
    const res=await  request.post("/users/addUser").send({
      uname:"",
      password:"1234",
      email:"",
      mobileno:9089097667,
    })
    expect(res.body.user).toEqual("Invalid");
  });
  
});
describe('Edit profile with valid changes', () => {
  it('return invalid if any value is empty', async() => {
    const res=(await request.post("/users/editProfile")).send({
        cat:"details",
        cname:"",
        email:"",
    })
    expect(res.body.update1).toEqual("valid");
  });
  it('if change pwd is null', async() => {
             const res=await request.post("/users/editProfile").send({
                 cpwd:"1234",
                 newpwd:"",
                 rnewpwd:""
             })
           expect(res.body.update2).toEqual("invalid");
    });

  
});





