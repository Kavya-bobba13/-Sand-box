
const san=document.querySelector("#signname");
const logot=document.querySelector("#logout");

if(logot){
    logot.style.display="none";
    logot.addEventListener("click",(e)=>{
        e.preventDefault()
        localStorage.removeItem("name");
        storagehandle()
    })
}

function storagehandle() {
    
    
    console.log("hello");
        
    if(localStorage.getItem("name")!=null){
        if(logot){
        logot.style.display="inline-block";
        }
        if(san){
        san.innerText=localStorage.getItem("name");
        if(san.innerText=="ADMINadmin813"){
            san.setAttribute("href","/frontend/html/admin.html");
            san.setAttribute("target","");
        }
        else{
                san.setAttribute("href","#");
                san.setAttribute("target","");
            }
        }
        
    }
    else{
        if(logot){
        logot.style.display="none";
        }
        if(san){ 
        san.innerText="SignIn";
        san.setAttribute("href","/frontend/login-form-02/login.html");
        san.setAttribute("target","_blank");
        }
        // window.open("../index.html")  
    }
    
}

window.onblur=storagehandle;
window.onload=storagehandle;

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

