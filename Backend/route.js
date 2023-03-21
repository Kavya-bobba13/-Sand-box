var data=require("./data.json")
var registeredUsers=require("./registered.json")
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const app=express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))




//database connection
mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2")


console.log("Connection sucessful");

//model ={collection,schema}
const b22User={
    name:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:Number},
    userid:{type:String}
}
const DarUser=mongoose.model("HouseRental",b22User) //model is DarUser

//get calls

async function displayAll(){
    result=await DarUser.find();
    return result;
}
async function display(name){
  result=await DarUser.find({email:name});
  console.log(result);
  
  return result;
}

//post calls
app.post("/addUser",async function(req,res){
  console.log(req.body);
  console.log("done adduser");
  let email=req.body.email
  let uname=req.body.uname
  let password=req.body.password
  let mobileno=req.body.mobileno
  await addUser({name:uname,email:email,password:password,mobile:mobileno});
  result=await displayAll();
  res.send(result);
})


async function addUser(obj){
    const User=new DarUser({name:obj.name,email:obj.email,password:obj.password,mobile:obj.mobile});
    await User.save();

}

//validating pwd of registered user
app.post("/valid", async(req, res) => {
  console.log(req.body);
  console.log("done pwd enter");
  var email = req.body.email;
  var pwd=req.body.password;
  var unameb = null;
  var obj=await display(email);
  //console.log(obj[0].password,"hi",pwd,obj[0].password===pwd,obj[0].email===email);
  if(obj[0].email===email && obj[0].password===pwd){
    unameb=obj[0].name;
    console.log("uname",unameb);
  }
  res.send({ uname: unameb });
});

//checking if a mail is registered or not
app.post("/regi",async(req,res)=>{
    console.log(req.body);
    console.log("done regi");
    let email=req.body.email
   var stat="Invalid";
    let obj= await display(email);
    if(obj.length!=0){
      if( obj[0].email==email){
        console.log(obj[0].email);
        stat="valid";
        console.log(obj[0]);
      }
     
    }
    
    await console.log(stat);
    await res.send({status:stat})
     
})

//displaying flats,homes (typefiltering)
app.post("/pdata", (req, res) => {
  console.log(req.body);
  let type = req.body.type;
  let arr = [];
  data.forEach((ele) => {
    if (ele.type == type) {
      arr.push({
        id: ele.id,
        img: ele.image,
        bhk: ele.bhkSize,
        location: ele.location,
        property_name: ele.name,
        cost: ele.cost,
      });
    }
  });
  res.send(arr);
});

//display all db
app.get("/",async function(req,res){
  let result=await displayAll()
  res.send(result)
})

app.listen(3000,()=>{console.log("server running in 3000");})
