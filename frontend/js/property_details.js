const iid = localStorage.iid;
console.log("hey", iid);
let cardContainers = document.querySelectorAll(".cardd-container");
let preBtns = document.querySelectorAll(".pre-btn");
let nxtBtns = document.querySelectorAll(".nxt-btn");

cardContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtns[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth - 200;
  });

  preBtns[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth + 200;
  });
});

document.querySelector(".contact").addEventListener("click", () => {
  alert("Email is sent!");
  if (!localStorage.name) {
    window.open("../login-form-02/login.html", "_self");
  }
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/properties/store_request",
    contentType: "application/json",
    headers: { periperi: localStorage.name },
    data: JSON.stringify({
      id: iid,
      email: "sainikhilmunna@gmail.com",
    }),
    dataType: "json",
    success: function xyz(res) {
      window.open("../index.html", "_self");
    },
  });
});
//console.log(id);
//var obj=require("./data.json")
console.log("ok");

$.ajax({
  type: "POST",
  url: "http://127.0.0.1:3000/properties/getid",
  contentType: "application/json",
  headers: {
    periperi: localStorage.name,
  },
  data: JSON.stringify({
    id: iid,
  }),
  dataType: "json",
  success: function (response) {
    console.log(response);
    //$('.title').text("  "+resp.cost);
    //$('p').text(resp.bhkSize+"bhk, "+"       "+resp.area +",       "+resp.propertyName+",  "+resp.location);
    // console.log(resp);
    let resp = response.doc;
    let similar = response.similar;
    document.querySelector(".pimg").setAttribute("src", resp.image);

    document.querySelectorAll(".cost").forEach((ele) => {
      ele.innerText += "₹" + resp.cost;
    });
    document.querySelectorAll(".area").forEach((ele) => {
      ele.innerText += resp.area + " sqfts";
    });
    document.querySelectorAll(".ptype").forEach((ele) => {
      ele.innerText += resp.propertyType;
    });
    document.querySelector(".bhksize").innerText += resp.bhkSize + "bhk ,";
    document.querySelectorAll(".location").forEach((ele) => {
      ele.innerText += resp.location;
    });
    document.querySelector(".pname").innerText += resp.propertyName;
    document.querySelector(".name").innerText += resp.ownerName;
    // ar.bid[0].name;
    //ar.bid[0].img
    document.querySelector(".address").innerText += resp.address;
    //ar.bid[0].loc;
    document.querySelector(".deposit").innerText += "₹" + resp.securityDeposit;
    //ar.bid[0].cost;
    document.querySelector(".status").innerHTML += resp.furnishedStatus;
    document.querySelector(".balconies").innerHTML += resp.balconies;
    document.querySelector(".beds").innerHTML += resp.beds;
    document.querySelector(".baths").innerHTML += resp.baths;
    document.querySelector(".facing").innerText += resp.facing;
    document.querySelector(".since").innerText += resp.since;
    document.querySelector(".statusP").innerText += resp.status
      ? "Available"
      : "Unavailable";
    let latlong = [resp.coordinates];
    localStorage.setItem("coordinates", latlong);
    localStorage.setItem("addr", resp.address);
    console.log("notok");
    
    //localStorage.latlong.split(" ")

    //similar properties
    
    document.querySelector(".similarprops").innerHTML = "";
    console.log(document.querySelector(".similarprops"));
    similar.forEach((ele) => {
      console.log(ele);
      document.querySelector(".similarprops").innerHTML += `<div class="cardd" id=${ele._id}>
          <img src=${ele.image} alt="" class="cardd-img" />
          <div class="cardd-body">
            <h2 class="namee">${ele.propertyName}</h2>
            <h6 class="des">${ele.propertyType}:  ₹${ele.cost}, ${ele.bhkSize}BHK  , ${ele.location}  </h6>
            
          </div>
        </div>`;



    });
    //////
    document.querySelectorAll(".cardd").forEach(ele => {
      ele.addEventListener("click",(e)=>{
          localStorage.setItem("iid", e.target.id);
         location.reload()

      })
    });



    ///

    initialize();
  },
  error: function () {
    console.log("error");
  },
});


