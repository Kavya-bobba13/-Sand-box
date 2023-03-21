const iid=localStorage.iid;
console.log("hey",iid);

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
                        $('.title').text("  "+resp.cost);
                        $('p').text(resp.bhkSize+"bhk, "+"       "+resp.area +",       "+resp.propertyName+",  "+resp.location);
                       
                        document.querySelector(".img").setAttribute("src",resp.image);
                        document.querySelector(".pname").innerText=resp.name;
                       // ar.bid[0].name;
                       //ar.bid[0].img
                        document.querySelector(".address").innerText=resp.address;   
                        //ar.bid[0].loc;
                        document.querySelector(".deposit").innerText=resp.securityDeposit;
                        //ar.bid[0].cost;    
                        document.querySelector(".status").innerText=resp.furnishedStatus;
                        document.querySelector(".balconies").innerText=resp.balconies;
                        document.querySelector(".beds").innerText=resp.beds;
                        document.querySelector(".baths").innerText=resp.baths;
                        document.querySelector(".facing").innerText=resp.facing;
                        document.querySelector(".since").innerText=resp.since;
                    }
    })
    
    
}

        

window.onload=fill;

