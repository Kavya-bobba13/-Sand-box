function funevent(){
        document.querySelectorAll(".boxx").forEach(ele => {
            ele.addEventListener("click",(e)=>{
                localStorage.setItem("iid", e.target.id);
                window.open("html/property_details.html");

            })
        });
}



const success=(pos)=>{
    console.log("enabled");
    const geourl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
    fetch(geourl).then(res=>res.json())
    .then(data=>{
      console.log(data.city);
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/properties/locationProperties",
        contentType: 'application/json',
        headers:{
          periperi:localStorage.name
        },
        data: JSON.stringify({
            city:data.city
        }),
        success: function(res){
          console.log(res);
          const containerbox=document.querySelector(".rent-center.container");
          containerbox.innerHTML=''
          res.properties.forEach((ele)=>{
            containerbox.innerHTML+=`
              <div class="box boxx" id=${ele._id}>
              <div class="top">
                <div class="overlay">
                  <img src=${ele.image} alt="" />
                </div>
                <div class="pos">
                  <span>${ele.location}</span>
                  <span>${ele.bhkSize}BHK</span>
                </div>
              </div>
              <div class="bottom">
                <p>${ele.propertyName}</p>
                <div>
                  <span>₹${ele.cost}</span>
                  
                </div>
              </div>
            </div>
          `
        })


        funevent()

        }




      })
    })
  }
  const error=()=>{
    console.log("blocked");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/properties/locationProperties",
        contentType: 'application/json',
        headers:{
          periperi:localStorage.name
        },
        success: function(res){
          console.log(res);
          const containerbox=document.querySelector(".rent-center.container");
          containerbox.innerHTML=''
          res.properties.forEach((ele)=>{
            containerbox.innerHTML+=`
              <div class="box boxx" id=${ele._id}>
              <div class="top">
                <div class="overlay">
                  <img src=${ele.image} alt="" />
                </div>
                <div class="pos">
                  <span>${ele.location}</span>
                  <span>${ele.bhkSize}BHK</span>
                </div>
              </div>
              <div class="bottom">
                <p>${ele.propertyName}</p>
                <div>
                  <span>₹${ele.cost}</span>
                  
                </div>
              </div>
            </div>
          `
        })

        funevent()

        }
      
      })
    
  }
  navigator.geolocation.getCurrentPosition(success,error)