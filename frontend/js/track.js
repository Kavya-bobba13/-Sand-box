// var socket=io()
var time=0,intid;

function counter(){
    
    time=0
    intid=setInterval(()=>{
        time++;
    },1000)

    storagehandle()
}
function sender(){
 
    if(intid) clearInterval(intid)
    console.log(time);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/userTrack/countTime",
        contentType: 'application/json',
        headers:{
            periperi:localStorage.name
        },
        data: JSON.stringify({
            time:time
        }),
        dataType: 'json',
        success:function (resp){

        }
    })

    
    time=0
}



window.onload=counter
window.onfocus=counter
window.onblur=sender

window.onbeforeunload=sender
