
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
    
    
    console.log("hrllo");
        
    if(localStorage.getItem("name")!=null){
        if(logot){
        logot.style.display="inline-block";
        }
        if(san){
        san.innerText=localStorage.getItem("name");
        san.setAttribute("href","#");
        san.setAttribute("target","");
        }
        console.log("hii")
    }
    else{
        if(logot){
        logot.style.display="none";
        }
        if(san){
        san.innerText="SignIn";
        san.setAttribute("href","http://127.0.0.1:5500/frontend/html/login.html");
        san.setAttribute("target","_blank");
        }
        // window.open("../index.html")
    }
    
}

window.onblur=storagehandle;
window.onload=storagehandle;