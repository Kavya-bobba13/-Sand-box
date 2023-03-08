// RENT_FLAT...
const drop_down_bud = document.querySelectorAll(".dropdown-item");
const items=document.querySelectorAll(".box");
drop_down_bud.forEach(element => {
    
    element.addEventListener("click",(e) => {
    items.forEach(val => {
        val.style.display="inline-block";
    });
    
    const drp_btn=document.getElementsByClassName("dropdown-toggle")[0];
    if(drp_btn.innerText!=e.target.innerText){
    
    drp_btn.innerText=e.target.innerText;
    console.log(e.target);
    if(e.target.innerText=="1k - 10k"){
        
        items.forEach(val => { 
            let cost=val.getElementsByClassName("bottom")[0].getElementsByTagName("div")[0].innerText;
            console.log(cost.substring(1));
            if(cost.indexOf("Lac")>-1 || cost.substring(1)>10000)
            {
                val.style.display="none";
            }
        });        
    }
    else if(e.target.innerText=="10k - 50k"){
        items.forEach(val => { 
            let cost=val.getElementsByClassName("bottom")[0].getElementsByTagName("div")[0].innerText;
            console.log(cost.substring(1));
            if(cost.indexOf("Lac")>-1 || cost.substring(1)>50000 || cost.substring(1)<10000)
            {
                val.style.display="none";
            }
        });        
    }
    else if(e.target.innerText=="50k - 1Lac"){
        items.forEach(val => { 
            let cost=val.getElementsByClassName("bottom")[0].getElementsByTagName("div")[0].innerText;
            console.log(cost.substring(1));
            if(cost.indexOf("Lac")>-1 || cost.substring(1)<50000)
            {
                val.style.display="none";
            }
        });        
    }
    else{
        items.forEach(val => { 
            let cost=val.getElementsByClassName("bottom")[0].getElementsByTagName("div")[0].innerText;
            console.log(cost.substring(1));
            if(cost.indexOf("Lac")==-1)
            {
                val.style.display="none";
            }
        });        
    }
    
    }
    else{
        drp_btn.innerHTML="Budget";
    }
    
    })
});
// items[0]].style.display=none;
