if (localStorage.getItem("p_type")) {
  type = localStorage.getItem("p_type");
  localStorage.removeItem("p_type");
  $(".toggle4").text(type);
}
var search_ = false;
if (localStorage.search_prop) {
  let obj = JSON.parse(localStorage.search_prop);
  localStorage.removeItem("search_prop");
  if (obj.val1 != "Location") {
    $(".toggle2").text(obj.val1);
    search_ = true;
  }
  if (obj.val2 != "BHK") {
    $(".toggle3").text(obj.val2 + "bhk");
    search_ = true;
  }
  if (obj.val3 != "Type") {
    $(".toggle4").text(obj.val3);
    search_ = true;
  }
}
document.querySelector(".listcont").innerHTML = "";

function filter() {
  storagehandle();
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/properties/pdata",
    contentType: "application/json",
    headers: {
      periperi: localStorage.name,
    },
    data: JSON.stringify({
      cost: $(".toggle1").text().trim(" "),
      location: $(".toggle2").text().trim(" "),
      bhkSize: $(".toggle3").text().trim(" "),
      propertyType: $(".toggle4").text().trim(" "),
      search:search_
    }),
    dataType: "json",
    success: function (res) {
      search_=false
      console.log(res + "jhbhkb");
      console.log(document.querySelector(".listcont").innerHTML);
      document.querySelector(".listcont").innerHTML = "";
      // update(res)
      res.forEach((ress) => {
        console.log(ress);
        //
         console.log(ress.statusl); 
        document.querySelector(".listcont").innerHTML += `
  <div class="box" >
 
  <div class="top">
    <div class="overlay">
      <img src=${ress.img} alt="" />
     
    </div>
    <div class="pos">
      <span>${ress.location}</span>
      <span class="bhk">${ress.bhk}BHK</span>
       
    </div>
    <div class="like like-no" ><img src="../images/${ress.statusl}.svg" id=${ress.id+" hii"}></div>
  </div>
  <div class="bottom" id=${ress.id}>
    <p>${ress.property_name}</p>
    <div>
      <span>${ress.cost}</span>
       
    </div>
  </div>
  </div>`;

        $(".bottom").on("click", (e) => {
          console.log(e.target.id);
          localStorage.setItem("iid", e.target.id);
          window.open("../html/property_details.html");
        });

        $(".like").on("click",(event) => {
          event.target.classList.toggle("like-no");
          event.target.classList.toggle("like-yes");
          if (event.target.classList.contains("like-yes")) {
            event.target.setAttribute("src","../images/like.svg")
            console.log("✅💾 Saving Favorite...");
            likeMe(event.target.id,"like");
            
          } else {
            event.target.setAttribute("src","../images/dislike.svg")
            console.log("❌ Removing Favorite...");
            likeMe(event.target.id,"dislike");
            // getFaveData(event.target);
          }
        })
      });
    },
  });
}
// RENT_FLAT...
function likeMe(id,statusl){
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/properties/liked",
    contentType: "application/json",
    headers: {
      periperi: localStorage.name,
    },
    data: JSON.stringify({
      id:id,
      statusl:statusl
    }),
    dataType: "json",
    success: function (res) {

    }
  })
  // getFaveD
}
const drop_down_bud = document.querySelectorAll(".dropdown-item");
// budget filter

const drp_btn = document.getElementsByClassName("dropdown-toggle")[0];
drp_btn.addEventListener("click", (e) => {
  if (e.target.innerText.trim(" ") != "Budget") {
    e.target.innerText = "Budget";
    document.querySelector(".menu1").style.display = "";
    filter();
  }
});

drop_down_bud.forEach((element) => {
  element.addEventListener("click", (e) => {
    drp_btn.innerText = e.target.innerText;
    document.querySelector(".menu1").style.display = "none";
    filter();
  });
});

//****Location filter ****/

const drp_btn2 = document.querySelector(".toggle2");
const loc = document.querySelectorAll(".menu2 a");
const locinp = document.querySelector(".menu2 input");
locinp.addEventListener("keyup", (e) => {
  loc.forEach((ele) => {
    if (!ele.innerText.toUpperCase().startsWith(e.target.value.toUpperCase())) {
      ele.style.display = "none";
    } else {
      ele.style.display = "";
    }
  });
});

drp_btn2.addEventListener("click", (e) => {
  if (e.target.innerText.trim(" ") != "Location") {
    e.target.innerText = "Location";
    document.querySelector(".menu2").style.display = "";
    filter();
  }
});

loc.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    drp_btn2.innerText = e.target.innerText;
    document.querySelector(".menu2").style.display = "none";
    filter();
  });
});

// *bhk filter */
const drop_down_bud3 = document.querySelectorAll(".dropdown-item3");
const drp_btn3 = document.getElementsByClassName("t2")[0];
console.log(drp_btn3);
drp_btn3.addEventListener("click", (e) => {
  if (e.target.innerText.trim(" ") != "Size-bhk") {
    e.target.innerText = "Size-bhk";
    document.querySelector(".menu3").style.display = "";
    filter();
  }
});

drop_down_bud3.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelector(".menu3").style.display = "none";
    drp_btn3.innerText = e.target.innerText;
    filter();
  });
});

//* type filter //

const drop_down_bud4 = document.querySelectorAll(".dropdown-item4");
const drp_btn4 = document.getElementsByClassName("toggle4")[0];

drp_btn4.addEventListener("click", (e) => {
  if (e.target.innerText.trim(" ") != "Property-Type") {
    e.target.innerText = "Property-Type";
    document.querySelector(".menu4").style.display = "";
    filter();
  }
});

drop_down_bud4.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelector(".menu4").style.display = "none";
    drp_btn4.innerText = e.target.innerText;
    filter();
  });
});

const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

const hamburer2 = document.querySelector(".ham2");
const navList2 = document.querySelector(".nl2");

if (hamburer2) {
  hamburer2.addEventListener("click", () => {
    navList2.classList.toggle("open");
  });
}

window.onload = filter;
