
$(document).ready(function(){

    $('.toggle-btn').click(function() {
    $(this).toggleClass('active').siblings().removeClass('active');
    });
    
});

const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

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
    <div class="like like-no"><img src="../images/dislike.svg"></div>
  </div>
  <div class="bottom" id=${ress.id}>
    <p>${ress.property_name}</p>
    <div>
      <span>${ress.cost}</span>
       
    </div>
  </div>
  </div>`
      
      $(".bottom").on("click", (e) => {
        console.log(e.target.id);
        localStorage.setItem("iid", e.target.id);
        window.open("../html/property_details.html");
      });
    }),
  }
})
}

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

        document.querySelector(".listcont").innerHTML += `
  <div class="box" id=${ress.id}>
  <div class="top">
    <div class="overlay">
      <img src=${ress.img} alt="" />
    </div>
    <div class="pos">
      <span>${ress.location}</span>
      <span class="bhk">${ress.bhk}BHK</span>
    </div>
  </div>
  <div class="bottom">
    <p>${ress.property_name}</p>
    <div>
      <span>${ress.cost}</span>
       
    </div>
  </div>
  </div>`;
        $(".like").on("click", (event) => {
          event.target.classList.toggle("like-no");
          event.target.classList.toggle("like-yes");
          if (event.target.classList.contains("like-yes")) {
            console.log("✅💾 Saving Favorite...");
          } else {
            console.log("❌ Removing Favorite...");
          }

        });

        $(".box").on("click", (e) => {
          console.log(e.target.id);
          localStorage.setItem("iid", e.target.id);
          window.open("../html/property_details.html");
        });
      });
    },
  });
}


