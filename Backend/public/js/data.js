
function registered_user(email) {
    

    $.post("/regi",{
        email:email
    },(res)=>{
        console.log(res.status);

        return res.status=="valid";
    })
    
}

function verify_user(email,pass) {
    $.post("/valid",{
        email:email,
        password:pass
    },(res)=>{
        console.log(res);

        return res.uname;
    })
    
}

function createAccount(signf) {
    
    localStorage.setItem(signf.email.value,signf.password.value)
    localStorage.setItem(signf.email.value+"uname",signf.uname.value)
    
}

var id;



