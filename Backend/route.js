var data=require("./data.json")
var registeredUsers=require("./registered.json")
const express=require("express")
const bodyParser=require("body-parser")
const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.sendFile("/home/sainikhil.b/project01/-Sand-box/frontend/index.html")
})
app.post("/regi",(req,res)=>{
    console.log(req.body);
    console.log("done");
    let email=req.body.email
    console.log(registeredUsers);
    let stat="Invalid";
    registeredUsers.forEach((obj)=>{
        console.log(obj);
        if(obj.email==email){
            stat="valid";
        }
    })
    res.send({status:stat})
     
})

app.post("/valid",(req,res)=>{
    console.log(req.body);
    console.log("done2");
    let email=req.body.email
    let unameb=null
    console.log(registeredUsers);
    registeredUsers.forEach((obj)=>{
        console.log(obj);
        if(obj.email==email && obj.password==req.body.password){
            unameb=obj.name
        }
    })
    res.send({uname:unameb})
     
})

app.post("/pdata",(req,res)=>{
    console.log(req.body);
    let type=req.body.type;
    let arr=[]
    data.forEach((ele)=>{
        if(ele.type==type){
            arr.push({
                id:ele.id,
                img:ele.image,
                bhk:ele.bhkSize,
                location:ele.location,
                property_name:ele.name,
                cost:ele.cost
            })
        }
    })
    res.send(arr)
})


app.listen(3000)

 
