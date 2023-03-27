var type = localStorage.getItem("p_type");
filter_map = new Map();
document.querySelector(".listcont").innerHTML=""

$.ajax({
    type: "POST",
	url: "http://127.0.0.1:3000/pdata",
	contentType: 'application/json',
  headers:{
    periperi:localStorage.name
  },
	data: JSON.stringify({
		type:type
	}),
	dataType: 'json',
    success: function (res){
    console.log(res)
    console.log(document.querySelector(".listcont").innerHtml)
    document.querySelector(".rent-center").innerHtml="";
    // update(res)
    res.forEach((ress)=>{
      console.log(ress);
      
  document.querySelector(".listcont").innerHTML+=`
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
    })

// RENT_FLAT...


const drop_down_bud = document.querySelectorAll(".dropdown-item");
const items = document.querySelectorAll(".box");
items.forEach((e) => {
  filter_map.set(e, 0);
});

// budget filter

const drp_btn = document.getElementsByClassName("dropdown-toggle")[0];
drp_btn.addEventListener("click", (e) => {
  if (e.target.innerText != "Budget") {
    items.forEach((val) => {
      let value = filter_map.get(val) & ~1;
      filter_map.set(val, value);
      if (value == 0) val.style.display = "inline-block";
    });
    console.log(filter_map);

    e.target.innerText = "Budget";
  } else {
    document.querySelector(".menu1").style.display = "";
  }
});

drop_down_bud.forEach((element) => {
  element.addEventListener("click", (e) => {
    drp_btn.innerText = e.target.innerText;
    document.querySelector(".menu1").style.display = "none";

    if (e.target.innerText == "1k - 10k") {
      items.forEach((val) => {
        let cost = val
          .getElementsByClassName("bottom")[0]
          .getElementsByTagName("div")[0].innerText;
        console.log(cost.substring(1));
        if (cost.indexOf("Lac") > -1 || cost.substring(1) > 10000) {
          filter_map.set(val, filter_map.get(val) | 1);
          console.log(filter_map);
          val.style.display = "none";
        }
      });
    } else if (e.target.innerText == "10k - 50k") {
      items.forEach((val) => {
        let cost = val
          .getElementsByClassName("bottom")[0]
          .getElementsByTagName("div")[0].innerText;
        console.log(cost.substring(1));
        if (
          cost.indexOf("Lac") > -1 ||
          cost.substring(1) > 50000 ||
          cost.substring(1) < 10000
        ) {
          filter_map.set(val, filter_map.get(val) | 1);
          val.style.display = "none";
        }
      });
    } else if (e.target.innerText == "50k - 1Lac") {
      items.forEach((val) => {
        let cost = val
          .getElementsByClassName("bottom")[0]
          .getElementsByTagName("div")[0].innerText;
        console.log(cost.substring(1));
        if (cost.indexOf("Lac") > -1 || cost.substring(1) < 50000) {
          filter_map.set(val, filter_map.get(val) | 1);
          val.style.display = "none";
        }
      });
    } else {
      items.forEach((val) => {
        let cost = val
          .getElementsByClassName("bottom")[0]
          .getElementsByTagName("div")[0].innerText;
        console.log(cost.substring(1));
        if (cost.indexOf("Lac") == -1) {
          filter_map.set(val, filter_map.get(val) | 1);
          val.style.display = "none";
        }
      });
    }
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
  if (e.target.innerText != "Location") {
    items.forEach((val) => {
      let value = filter_map.get(val) & ~2;
      filter_map.set(val, value);
      if (value == 0) val.style.display = "inline-block";
    });
    console.log(filter_map);
    e.target.innerText = "Location";
  } else {
    document.querySelector(".menu2").style.display = "";
  }
});

loc.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    drp_btn2.innerText = e.target.innerText;
    document.querySelector(".menu2").style.display = "none";
    items.forEach((element) => {
      let locval = element.querySelector(".pos>span").innerText;
      if (locval != e.target.innerText) {
        filter_map.set(element, filter_map.get(element) | 2);
        console.log(filter_map);
        element.style.display = "none";
      }
    });
  });
});



// *bhk filter */
const drop_down_bud3 = document.querySelectorAll(".dropdown-item3");
const drp_btn3 = document.getElementsByClassName("t2")[0];
console.log(drp_btn3);
drp_btn3.addEventListener("click", (e) => {
  if (e.target.innerText != "Size-bhk") {
    items.forEach((val) => {
      let x = filter_map.get(val) & ~4;
      filter_map.set(val, x);
      if (x == 0) {
        val.style.display = "inline-block";
      }
    });
    console.log(filter_map);
    e.target.innerText = "Size-bhk";
  } else {
    document.querySelector(".menu3").style.display = "";
  }
});

drop_down_bud3.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelector(".menu3").style.display = "none";
    console.log(e.target.innerText);
    drp_btn3.innerText = e.target.innerText;
    items.forEach((val) => {
      let ele = val.getElementsByClassName("bhk")[0].innerText;
      if (e.target.innerText == "above 3bhk") {
        if (ele[0] <= 3) {
          filter_map.set(val, filter_map.get(val) | 4);
          val.style.display = "none";
        }
      } else if (ele != e.target.innerText) {
        filter_map.set(val, filter_map.get(val) | 4);
        val.style.display = "none";
      }
    });
  });
});

  $(".box").on("click",(e)=>{
    console.log(e.target.id);
      localStorage.setItem("iid",e.target.id)
      window.open("../html/property_details.html");
  });




  //End of success function
  }
})

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

