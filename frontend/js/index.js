// import { registered,registered_user,verify_user,createAccount } from "./data.js";




/*****signup and login */


let landsbtn=document.querySelectorAll(".clkbtn");


landsbtn.forEach((ele)=>{
	ele.addEventListener("click",(e)=>{
		e.preventDefault()
		
		if(e.target.value=="Login"){
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
				$.ajax({
					type: "POST",
					url: "http://127.0.0.1:3000/regi",
					contentType: 'application/json',
					data: JSON.stringify({
						email:logf.email.value
					}),
					dataType: 'json',
					success: function (result) {
						console.log(result)
						if ("valid"== result.status) {
							
								$.ajax({
									type: "POST",
									url: "http://127.0.0.1:3000/valid",
									contentType: 'application/json',
									data: JSON.stringify({
										email:logf.email.value,
									   password:logf.password.value	
									}),
									dataType: 'json',
									success:function (resp){
										console.log(resp);
										if(resp.token){
											localStorage.setItem("name",resp.token);
											if(resp.admin) localStorage.admin=resp.admin
											storagehandle();
											window.open("/frontend/index.html","_self");
										}
										else{
											alert("enter right password!")
										}
									}

								})


						} else {
							alert("Signup First!")
						}
					}
				})
				//****
			// 	$.post("localhost:3000/regi",{
			// 		email:logf.email.value
			// 	},(res)=>{
			// 		console.log(res.status);
			
			// 		if(res.status=="valid"){
			// 			$.post("localhost:3000/valid",{
			// 				email:logf.email.value,
			// 				password:logf.password.value
			// 			},(resp)=>{
			// 				console.log(resp);
			// 				if(resp.uname){
			// 					localStorage.setItem("name",resp.uname);
			// 					storagehandle();
			// 					window.open("/","_self");
			// 				}
			// 				else{
			// 					alert("enter right password!")
			// 				}
							
			// 			})
			// 		}
			// 		else{
			// 			alert("Signup First!")		
			// 		}
			// 	})
			// 
			}
			else{
				alert("fill form coorectly")
			}
		}
		else{

			let signf=document.forms['signupform'];
			if(signf.email.value && signf.email.value.endsWith("@gmail.com") && signf.password.value && signf.uname.value && signf.cpassword.value && signf.mobileno.value)
			{
					$.ajax({
						type: "POST",
						url: "http://127.0.0.1:3000/regi",
						contentType: 'application/json',
						data: JSON.stringify({
							email:signf.email.value
						}),
						dataType: 'json',
						success: function (result) {
							console.log(result)
							if("valid"!=result.status){
								if(signf.cpassword.value==signf.password.value){
									$.ajax({
										type: "POST",
										url: "http://127.0.0.1:3000/addUser",
										contentType: 'application/json',
										data: JSON.stringify({
											uname:signf.uname.value,
											email:signf.email.value,
											password:signf.password.value,
											mobileno:signf.mobileno.value
										}),
										dataType: 'json',
										success: function(result){

												console.log(result);
												localStorage.setItem("name",result.token);
												storagehandle()
												window.open("../index.html","_self");
										}
									})
									
								}
								else{
									alert("password and confirm password not same!")
								}
							}
							else{
								alert("u have an account!")
							}
						
					
						}
					})
				
			}
			else{
				alert("fill form coorectly")
			}
		}
	})
})

