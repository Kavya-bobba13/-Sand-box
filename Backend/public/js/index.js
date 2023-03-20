// import { registered,registered_user,verify_user,createAccount } from "./data.js";




/*****signup and login */
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});

let landsbtn=document.querySelectorAll(".clkbtn");


landsbtn.forEach((ele)=>{
	ele.addEventListener("click",(e)=>{
		e.preventDefault()
		
		if(e.target.innerText=="Login"){
			let logf=document.forms['loginform'];
			if(logf.email.value && logf.email.value.endsWith("@gmail.com") && logf.password.value){
				// console.log(registered_user(logf.email.value));
				// if(registered_user(logf.email.value)){
				// 	let uname=verify_user(logf.email.value,logf.password.value)
				// 	if(uname){
				// 		// localStorage.setItem("name",registered.get(logf.email.value).uname);
				// 		localStorage.setItem("name",uname);
				// 		storagehandle();
						
				// 		window.open("../index.html","_self");
				// 	}
				// 	else{
				// 		alert("enter right password!")
				// 	}
				// }
				// else{
				// 	alert("Signup First!")
				// }
				//****
				$.post("/regi",{
					email:logf.email.value
				},(res)=>{
					console.log(res.status);
			
					if(res.status=="valid"){
						$.post("/valid",{
							email:logf.email.value,
							password:logf.password.value
						},(resp)=>{
							console.log(resp);
							if(resp.uname){
								localStorage.setItem("name",resp.uname);
								storagehandle();
								window.open("/","_self");
							}
							else{
								alert("enter right password!")
							}
							
						})
					}
					else{
						alert("Signup First!")		
					}
				})
			}
			else{
				alert("fill form coorectly")
			}
		}
		else{

			let signf=document.forms['signupform'];
			if(signf.email.value && signf.email.value.endsWith("@gmail.com") && signf.password.value && signf.uname.value && signf.cpassword.value){
				if(!registered_user(signf.email.value)){
					if(signf.cpassword.value==signf.password.value){
						createAccount(signf);
						console.log(signf);
						
						localStorage.setItem("name",signf.uname.value);
						storagehandle()
						
						window.open("../index.html","_self");
					}
					else{
						alert("password and confirm password not same!")
					}
				}
				else{
					alert("u have an account!")
				}
			}
			else{
				alert("fill form coorectly")
			}
		}
	})
})

