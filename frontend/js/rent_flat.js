filter_map=new Map()

const drop_down_bud = document.querySelectorAll(".dropdown-item");
const items=document.querySelectorAll(".box");
items.forEach((e)=>{
    filter_map.set(e,0);
})


// budget filter

const drp_btn=document.getElementsByClassName("dropdown-toggle")[0];
drp_btn.addEventListener("click",(e)=>{

    if(e.target.innerText!="Budget"){
             items.forEach(val => {
                let value=filter_map.get(val)&~1;
                filter_map.set(val,value);
                if(value==0)
                    val.style.display="inline-block";
            });
            console.log(filter_map);
           
            e.target.innerText="Budget";
    }
    else{
        document.querySelector(".menu1").style.display="";
       
    }
   

});



drop_down_bud.forEach(element => {
   
    element.addEventListener("click",(e) => {
   
    drp_btn.innerText=e.target.innerText;
    document.querySelector(".menu1").style.display="none";

    if(e.target.innerText=="1k - 10k"){
       
        items.forEach(val => {
            let cost=val.getElementsByClassName("bottom")[0].getElementsByTagName("div")[0].innerText;
            console.log(cost.substring(1));
            if(cost.indexOf("Lac")>-1 || cost.substring(1)>10000)
            {
                filter_map.set(val,filter_map.get(val)|1);
                console.log(filter_map);
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
                filter_map.set(val,filter_map.get(val)|1);
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
                filter_map.set(val,filter_map.get(val)|1);
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
                filter_map.set(val,filter_map.get(val)|1);
                val.style.display="none";
            }
        });       
    }
   
    })
});




// *bhk filter */
const drop_down_bud3 = document.querySelectorAll(".dropdown-item3");
const drp_btn3=document.getElementsByClassName("t2")[0];
console.log(drp_btn3);
drp_btn3.addEventListener("click",(e)=>{
    if(e.target.innerText!="Size-bhk"){
        items.forEach(val=>{
            let x=filter_map.get(val)&~4;
            filter_map.set(val,x);
            if(x==0){
                val.style.display="inline-block";

            }
        });
            console.log(filter_map);
            e.target.innerText="Size-bhk";
    }
    else{
        document.querySelector(".menu3").style.display="";
        
    }
});

drop_down_bud3.forEach(element => {
   
    element.addEventListener("click",(e) => {
    document.querySelector(".menu3").style.display="none";
    console.log(e.target.innerText);
    drp_btn3.innerText=e.target.innerText;
    items.forEach(val =>{
        let ele=val.getElementsByClassName("bhk")[0].innerText;
        if(e.target.innerText=="above 3bhk"){
            if(ele[0]<=3){
                filter_map.set(val,filter_map.get(val)|4);
                val.style.display="none";
            }
        }
        else if(ele!=e.target.innerText){
            filter_map.set(val,filter_map.get(val)|4);
            val.style.display="none";
        }

    });



    })

});