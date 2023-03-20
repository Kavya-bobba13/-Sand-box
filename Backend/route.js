const express=require('express')
const app= express();
app.use(express.json());
var data=require("./data.json")
var users=require("./registeredUsers.json")
//console.log(JSON.stringify(data));
console.log("hey");

app.post('/registeredUsers',function(req,res){
    console.log(req.data.name);

    
})

app.post('/postUser',function(req,res){

})
app.listen(3000);