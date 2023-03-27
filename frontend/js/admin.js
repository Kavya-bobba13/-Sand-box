
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
const logot2=document.querySelector("#logout");
const items=document.querySelector(".items");

menuicn.addEventListener("click",()=>
{
	nav.classList.toggle("navclose");
})

logot2.addEventListener("click",(e)=>{
	localStorage.removeItem("name");
	storagehandle();
	window.open("../index.html","_self");
	return false;
})

// window.onload=function () {

// 	for(let i in localStorage){
// 		if(i.endsWith(".com")){	
// 			items.innerHTML+=`
// 				<div class="item1">
// 				<h3 class="t-op-nextlvl">${i}</h3>
// 				<h3 class="t-op-nextlvl">${localStorage.getItem(i+"uname")}</h3>
// 				<h3 class="t-op-nextlvl">${localStorage.getItem(i)}</h3>
// 			</div>`;

// 		}
// 	}
// }


$.ajax({
		type: "GET",
		url: "http://127.0.0.1:3000/admin/admindisplay",
		contentType: 'application/json',
		dataType: 'json',
		success: function (result) {
			
			result.forEach(i => {
				console.log(i)
				items.innerHTML+=`
					<div class="item1">
					<h3 class="t-op-nextlvl">${i.email}</h3>
					<h3 class="t-op-nextlvl">${i.name}</h3>
					<h3 class="t-op-nextlvl">${i.password}</h3>
					</div>`;
			});
			
	
		}

})