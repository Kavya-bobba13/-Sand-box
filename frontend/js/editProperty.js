
const iid2 = localStorage.iid2;
console.log("hey", iid2);
document.getElementById("iid2").value=iid2;
document.querySelector("#key").value=localStorage.name;
console.log("propid updated");

const form = document.querySelector("form"),
        nextBtn = form.querySelector(".nextBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");

        // form.classList.add('secActive');
nextBtn.addEventListener("click", (e)=> {
  e.preventDefault()
//     allInput.forEach(input => {
        // if(input.value != ""){
            form.classList.add('secActive');
        // }else{
        //     form.classList.remove('secActive');
        // }
//     })
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

document.querySelectorAll("input").forEach((e)=>{e.readOnly=true;})
document.querySelectorAll("option").forEach((e)=>{e.style.display="none";})

document.querySelector(".eimg").addEventListener("click",(e)=>{
    document.querySelectorAll("option").forEach((e)=>{e.style.display="";})
    document.querySelectorAll("input").forEach((e)=>{e.readOnly=false;})

})
$(".cancel").click((e)=>{
    window.open("../html/myProperties.html","_self")
})

//console.log(id);
//var obj=require("./data.json")
function fill() {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/properties/getid",
    contentType: "application/json",
    data: JSON.stringify({
      id: iid2,
    }),
    dataType: "json",
    success: function (resp) {
      //$('.title').text("  "+resp.cost);
      //$('p').text(resp.bhkSize+"bhk, "+"       "+resp.area +",       "+resp.propertyName+",  "+resp.location);
      console.log(resp.area,"area");
      document.querySelector(".pimg").setAttribute("src", resp.image);
      document.querySelector(".imagesrc").value=resp.image;
      document.querySelector(".cost").value = resp.cost;
      document.querySelector(".area").value = resp.area;
      console.log(resp.propertyType.split(" ")[0]);
  document.querySelector(".type"+resp.propertyType.split(" ")[0]).selected=true;    
      document.querySelector(".bhksize").value = resp.bhkSize;
      console.log(resp.location);
  document.querySelector(".location"+resp.location).selected=true;
      document.querySelector(".pname").value = resp.propertyName;
      document.querySelector(".name").value = resp.ownerName;
      // ar.bid[0].name;
      //ar.bid[0].img
      document.querySelector(".address").value = resp.address;
     // document.querySelector(".maintainence").value=resp.maintainence
      //ar.bid[0].loc;
      document.querySelector(".deposit").value = resp.securityDeposit;
      //ar.bid[0].cost;
  document.querySelector(".status"+resp.furnishedStatus.split(" ")[0]).selected = true;
      document.querySelector(".balconies").value = resp.balconies;
      // document.querySelector(".beds").value = resp.beds;
      document.querySelector(".baths").value = resp.baths;
      document.querySelector(".facing").value = resp.facing;
      document.querySelector(".since").value = resp.since;
  document.querySelector(".statusP"+resp.status).selected =true;
    },
  });
}

function calling() {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/properties/updateProperty",
    headers:{
      pid:iid2
    },
    // contentType: "application/json",
    data: new FormData($('#myform')[0]),
    processData: false,
    contentType: false,
    dataType: "json",
    success: function (result) {
      console.log(result);
      window.open("../html/myProperties.html")
    },
  });
}

window.onload = fill;
