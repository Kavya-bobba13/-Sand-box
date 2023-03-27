function loader() {
    console.log("ok");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/properties/myProperties",
        contentType: 'application/json',
        headers:{
          "PeriPeri":localStorage.name
        },
        dataType: 'json',
        success: function(result){
                console.log("ok");
                console.log(result);
                if(result){
                    for(let i=0;i<result.length;i++){
                        console.log(result[i]);
                        document.querySelector("#container_main").innerHTML+=
                    `<div class="row mt-5 mr">
                    <div class="col-3">
                      <img src="../rent_images/100_frontal.jpg" />
                    </div>
                    <div class="col-lg-6 col-md-9">
                      <div class="head-text">
                      ${result[i].propertyName},${result[i].beds}BHK ${result[i].propertyType} for rent in ${result[i].address}, ${result[i].location}.
                      </div>
                      <div class="body-text">
                        <div class="row inside">
                          <div class="col-4">
                            <div class="superscript">furnishedStatus</div>
                            <div class="mainscript">${result[i].furnishedStatus}</div>
                          </div>
                          <div class="col-4">
                            <div class="superscript">securityDeposit</div>
                            <div class="mainscript">${result[i].securityDeposit}</div>
                          </div>
                          <div class="col-4">
                            <div class="superscript">since</div>
                            <div class="mainscript">${result[i].since}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="row inside2">
                        <div class="col-12">
                          <div class="superscript">Property Owner</div>
                          <div class="mainscript">${result[i].ownerName}</div>
                        </div>
                        <div class="col-12">
                          <div class="superscript">Price</div>
                          <div class="mainscript">${result[i].cost}</div>
                        </div>
                      </div>
                    </div>
                  </div>`
             }
                    
                  
            }
                else{
                    window.open("../login-form-02/login.html","_self");
                }
                
                
        },
        error:function (){
            window.open("../login-form-02/login.html","_self");
        }
    })
    
}

window.addEventListener("load",loader);