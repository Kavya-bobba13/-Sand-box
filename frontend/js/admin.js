
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
const logot=document.querySelector("#logout");
const items=document.querySelector(".items");

menuicn.addEventListener("click",()=>
{
	nav.classList.toggle("navclose");
})

logot.addEventListener("click",(e)=>{
	localStorage.removeItem("name");
	window.open("../index.html","_self");
	return false;
})

window.onload=function () {

	for(let i in localStorage){
		if(i.endsWith(".com")){	
			items.innerHTML+=`
				<div class="item1">
				<h3 class="t-op-nextlvl">${i}</h3>
				<h3 class="t-op-nextlvl">${localStorage.getItem(i+"uname")}</h3>
				<h3 class="t-op-nextlvl">${localStorage.getItem(i)}</h3>
			</div>`;

		}
	}
}
