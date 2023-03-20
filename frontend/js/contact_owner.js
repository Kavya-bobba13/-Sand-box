
console.log("hey",data);

//console.log(id);
//var obj=require("./data.json")
$(window).on( "load", function() {

    var x=localStorage.storeid;
    console.log( "window loaded" );
    console.log(data[x].name);
    $('.title').text("  "+data[x].cost);
    $('p').text(data[x].bhkSize+"bhk, "+"       "+data[x].area +",       "+data[x].propertyName+",  "+data[x].location);
   
    document.querySelector(".img").setAttribute("src",data[x].image);
    document.querySelector(".pname").innerText=data[x].name;
   // ar.bid[0].name;
   //ar.bid[0].img
    document.querySelector(".address").innerText=data[x].address;   
    //ar.bid[0].loc;
    document.querySelector(".deposit").innerText=data[x].securityDeposit;
    //ar.bid[0].cost;    
    document.querySelector(".status").innerText=data[x].furnishedStatus;
    document.querySelector(".balconies").innerText=data[x].balconies;
    document.querySelector(".beds").innerText=data[x].beds;
    document.querySelector(".baths").innerText=data[x].baths;
    document.querySelector(".facing").innerText=data[x].facing;
    document.querySelector(".since").innerText=data[x].since;
});

        



