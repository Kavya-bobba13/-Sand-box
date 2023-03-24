const iid=localStorage.iid;
console.log("hey",iid);

document.querySelector(".contact").addEventListener("click",()=>{window.open("../index.html")})
//console.log(id);
//var obj=require("./data.json")
function fill() {
    
    $.ajax({
                    type: "POST",
					url: "http://127.0.0.1:3000/getid",
					contentType: 'application/json',
					data: JSON.stringify({
						id:iid
					}),
					dataType: 'json',
                    success:function (resp){
                        //$('.title').text("  "+resp.cost);
                        //$('p').text(resp.bhkSize+"bhk, "+"       "+resp.area +",       "+resp.propertyName+",  "+resp.location);
                       
                        document.querySelector(".pimg").setAttribute("src",resp.image);
                        
                        document.querySelectorAll(".cost").forEach(ele => {ele.innerText+=resp.cost});
                        document.querySelectorAll(".area").forEach(ele => {ele.innerText+=resp.area});
                        document.querySelector(".bhksize").innerText+=resp.bhkSize+"bhk";
                        document.querySelectorAll(".location").forEach(ele => {ele.innerText+=resp.location})
                        document.querySelector(".pname").innerText+=resp.propertyName;
                        document.querySelector(".name").innerText+=resp.ownerName;
                       // ar.bid[0].name;
                       //ar.bid[0].img
                        document.querySelector(".address").innerText+=resp.address;   
                        //ar.bid[0].loc;
                        document.querySelector(".deposit").innerText+=resp.securityDeposit;
                        //ar.bid[0].cost;    
                        document.querySelector(".status").innerHTML+=resp.furnishedStatus;
                        document.querySelector(".balconies").innerHTML+=resp.balconies;
                        document.querySelector(".beds").innerHTML+=resp.beds;
                        document.querySelector(".baths").innerHTML+=resp.baths;
                        document.querySelector(".facing").innerText+=resp.facing;
                        document.querySelector(".since").innerText+=resp.since;
                    }
    })
    
    
}

        

window.onload=fill;

