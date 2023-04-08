const san = document.querySelector("#signname");
const logot2 = document.querySelector("#logout");

// if (logot2) {
//   logot2.style.display = "none";
//   logot2.addEventListener("click", (e) => {
//     e.preventDefault();
//     localStorage.removeItem("name");
//     if(localStorage.admin)
//     localStorage.removeItem("admin");
//     storagehandle();
//   });
// }

function storagehandle() {
  console.log("hello");

  if (localStorage.getItem("name") != null) {
    if (logot2) {
      logot2.style.display = "inline-block";
    }
    if (san) {
      san.innerText = "Profile";
      san.setAttribute("href", "/frontend/html/profile.html");
      san.setAttribute("target", "");
      if(localStorage.admin){
        san.innerText = "Admin";
        san.setAttribute("href", "/frontend/html/admin.html");
        san.setAttribute("target", "");
      }
      
    }
  } else {
    if (logot2) {
      logot2.style.display = "none";
     

      // $.ajax({
      //   type: "POST",
      //   url: "http://127.0.0.1:3000/userTrack/countTime",
      //   contentType: 'application/json',
      //   data: JSON.stringify({
      //       time:time
      //   }),
      //   dataType: 'json',
      //   success:function (resp){
            
      //   }
      // })
    }
    if (san) {
      san.innerText = "SignIn";
      san.setAttribute("href", "/frontend/login-form-02/login.html");
      san.setAttribute("target", "_self");
    }
    // window.open("../index.html")
  }
}

// window.onfocus = storagehandle;
// window.onload = storagehandle;

// document.addEventListener("blur",storagehandle)
// document.addEventListener("focus",storagehandle)

// window.onscroll = function() {myFunction()};

// function myFunction() {
//     let nav=document.querySelectorAll(".navigation");
//     if(nav){

//         if (document.body.scrollDown>0 || document.documentElement.scrollDown>0) {
//             nav[0].style.display="none";

//         } else if (document.body.scrollTop>0 || document.documentElement.scrollTop>0) {
//             nav[0].style.display="";
//         }
//     }

// }
