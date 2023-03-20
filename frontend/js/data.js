
function registered_user(email) {
    
    $.ajax({
        
        url:"localhost:5500/regi",
        
    }).done((res)=>{
        console.log(res);
    })
    return localStorage.getItem(email)!=null;
}

function verify_user(email,pass) {
    
    return localStorage.getItem(email)==pass;
}

function createAccount(signf) {
    
    localStorage.setItem(signf.email.value,signf.password.value)
    localStorage.setItem(signf.email.value+"uname",signf.uname.value)
    
}

var data=[
    {
        "id":1,
        "name":"Ramu",
        "propertyName":"Sita nilayam",
        "type":"flat",
        "image":"../images/pic1.jpg",
        "location":"Bengaluru",
        "cost":"₹70000",
        "bhkSize":3,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":3,
        "baths":3,
        "balconies":3

    },
    {
        "id":2,
        "name":"Somu",
        "propertyName":"Somu nilayam",
        "type":"house",
        "image":"../images/pic2.jpg",
        "location":"Hyderabad",
        "cost":"₹7000",
        "bhkSize":2,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":2,
        "baths":3,
        "balconies":3

    },
    {
        "id":3,
        "name":"Shekar",
        "propertyName":"Hema nilayam",
        "type":"house",
        "image":"../images/pic3.jpg",
        "location":"Delhi",
        "cost":"₹2Lac",
        "bhkSize":"2",
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":2,
        "baths":3,
        "balconies":3

    },
    {
        "id":4,
        "name":"Rama",
        "propertyName":"Rama nilayam",
        "type":"flat",
        "image":"../images/pic4.jpg",
        "location":"Mumbai",
        "cost":"₹2000",
        "bhkSize":1,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":1,
        "baths":1,
        "balconies":0

    },
    {
        "id":5,
        "name":"Bhavani",
        "propertyName":"Bhavani nilayam",
        "type":"pg",
        "image":"../images/pic5.jpg",
        "location":"Bengaluru",
        "cost":"₹7Lac",
        "bhkSize":5,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":5,
        "baths":3,
        "balconies":3

    },
    {
        "id":6,
        "name":"Sulochana",
        "propertyName":"Sita nilayam",
        "type":"pg",
        "image":"../images/pic6.jpg",
        "location":"Hyderabad",
        "cost":"₹3300",
        "bhkSize":3,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":3,
        "baths":3,
        "balconies":3

    },
    {
        "id":7,
        "name":"Teena",
        "propertyName":"Sita nilayam",
        "type":"ofc-space",
        "image":"../images/pic1.jpg",
        "location":"Chennai",
        "cost":"₹7700",
        "bhkSize":2,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":2,
        "baths":3,
        "balconies":3

    },
    {
        "id":8,
        "name":"Shravs",
        "propertyName":"Sita nilayam",
        "type":"ofc-space",
        "image":"../images/pic2.jpg",
        "location":"Noida",
        "cost":"₹90000",
        "bhkSize":2,
        "area":"3200 sqft",
        "securityDeposit":"10000",
        "since":2015,
        "facing":"nort-east",
        "address":"ummin, 342402",
        "furnishedStatus":"fully furnished",
        "beds":2,
        "baths":3,
        "balconies":3

    }

]



