const mongoose= require("mongoose");
const request= require("supertest");
const { valid } = require("../controllers/user");
const app = require("../route").serverInstance;



/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2");
  });
  
  /* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

  describe("login for users", () => {
    describe("given a username and password", () => {
  
      test("should respond with a valid string ", async () => {
        const response = await request(app).post("/users/valid").send(JSON.stringify(
         {
            email: "kavya@gmail.com",
          password: "1234"
        })
        
        expect(response.statusCode).toBe(200);
      })
      test("should respond with a Invalid for incorrext password ", async () => {
        const response = await request(app).post("/users/valid").send({
          email: "kavya@gmail.com",
          password: "password"
        })
        expect(response.token).toEqual(undefined)
      })

    })
  })


