
function registered_user(email) {
    
    return localStorage.getItem(email)!=null;
}

function verify_user(email,pass) {
    
    return localStorage.getItem(email)==pass;
}

function createAccount(signf) {
    
    localStorage.setItem(signf.email.value,signf.password.value)
    localStorage.setItem(signf.email.value+"uname",signf.uname.value)
    
}

var id;



