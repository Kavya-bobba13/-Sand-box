// cards sliders

let cardContainers = document.querySelectorAll('.card-container');
let preBtns = document.querySelectorAll('.pre-btn');
let nxtBtns = document.querySelectorAll('.nxt-btn');

cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtns[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth - 200;
    })

    preBtns[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth + 200;
    })
})


$(".video-card").on("click",(e)=>{
    console.log(e.target.innerText)
    localStorage.setItem("p_type",e.target.innerText)
    window.open("../html/rent_type.html")

})


    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/userTrack/recommend",
        contentType: 'application/json',
        headers:{
            periperi:localStorage.name
        },
        dataType: 'json',
        success: function (result) {
            console.log(result.recommend);
            document.querySelector(".recommend").innerHTML="";

            if(result.recommend){

                  result.recommend.forEach((ele)=>{document.querySelector(".recommend").innerHTML+=`<div class="card boxx" id=${ele._id}>
                <img src=${ele.image} alt="" class="card-img" />
                <div class="card-body">
                  <h2 class="name">${ele.propertyName}</h2>
                  <h6 class="des">${ele.propertyType}:  ₹${ele.cost}, ${ele.bhkSize}BHK  , ${ele.location}  </h6>
                  
                </div>
              </div>`})
            }
            else{
              $(".recc").css("display","none")
            }
            //////

            document.querySelector(".popular").innerHTML="";

            result.popular.forEach((ele)=>{document.querySelector(".popular").innerHTML+=`<div class="card boxx" id=${ele._id}>
          <img src=${ele.image} alt="" class="card-img" />
          <div class="card-body">
            <h2 class="name">${ele.propertyName}</h2>
            <h6 class="des">${ele.propertyType}:  ₹${ele.cost}, ${ele.bhkSize}BHK  , ${ele.location}  </h6>
            
          </div>
        </div>`})






            //////
        document.querySelector(".newRelease").innerHTML="";

        result.newRelease.forEach((ele)=>{document.querySelector(".newRelease").innerHTML+=`<div class="card boxx" id=${ele._id}>
      <img src=${ele.image} alt="" class="card-img" />
      <div class="card-body">
        <h2 class="name">${ele.propertyName}</h2>
        <h6 class="des">${ele.propertyType}:  ₹${ele.cost}, ${ele.bhkSize}BHK  , ${ele.location}  </h6>
        
      </div>
    </div>`})

    //
            document.querySelectorAll(".boxx").forEach(ele => {
              ele.addEventListener("click",(e)=>{
                  localStorage.setItem("iid", e.target.id);
                  window.open("../html/property_details.html");

              })
          });

        },
        error:function (error){

        }
    })




































































// var intid,time=0;
// window.onfocus=counter
// window.onload=counter
// function counter(){
    
//     time=0;
//     intid=setInterval(()=>{
//         time++
//         console.log(time);
        
//     },1000)
//     console.log("focok");
// }
// window.onblur=()=>{
//     if(intid) clearInterval(intid)
    
//     $.ajax({
//         type: "POST",
//         url: "http://127.0.0.1:3000/userTrack/countTime",
//         contentType: 'application/json',
//         data: JSON.stringify({
//             time:time
//         }),
//         dataType: 'json',
//         success:function (resp){

//         }
//     })

    
//     time=0
// }

// window.onbeforeunload=()=>{
//     if(intid) clearInterval(intid)
    
//     $.ajax({
//         type: "POST",
//         url: "http://127.0.0.1:3000/userTrack/countTime",
//         contentType: 'application/json',
//         data: JSON.stringify({
//             time:time
//         }),
//         dataType: 'json',
//         success:function (resp){
            
//         }
//     })
//     time=0
// }

