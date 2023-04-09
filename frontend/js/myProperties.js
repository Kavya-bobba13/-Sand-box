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
                      <img src="${result[i].image}" />
                    </div>
                    <div class="col-lg-6 col-md-9">
                      <div class="head-text">
                      <a href="../html/editProperty.html" class=${result[i]._id }>
                      ${result[i].propertyName},${result[i].bhkSize}BHK ${result[i].propertyType} for rent in ${result[i].address}, ${result[i].location}.
                      </a>
                      </div>
                      <div class="body-text">
                        <div class="row inside">
                          <div class="col-4">
                            <div class="superscript">FurnishedStatus</div>
                            <div class="mainscript">${result[i].furnishedStatus}</div>
                          </div>
                          <div class="col-4">
                            <div class="superscript">SecurityDeposit</div>
                            <div class="mainscript">${result[i].securityDeposit}</div>
                          </div>
                          <div class="col-4">
                            <div class="superscript">Since</div>
                            <div class="mainscript">${result[i].since}</div>
                          </div>
                          
                        </div>
                      </div>
                      
                    </div>
                    <div class="col-2">
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
                      <button type="button" class="btn btn-primary btn-sm" id=${result[i]._id}>Requested Users</button>
                    </div>
                    <div class=" col-1 editer">
                      <img src="../images/pencil.png"  id=${result[i]._id} class=${result[i]._id}>
                    </div>
                    
                    
                  </div>`
             }
                    
                  
            }
                else{
                    window.open("../login-form-02/login.html","_self");
                }
                
                
          $(".btn-sm").on("click",(e)=>{
            console.log(e.target.id);
            localStorage.setItem("reqId",e.target.id);
            window.open("../html/manage_users.html","_self");
          })

          $(".editer img").click((e)=>{
            localStorage.iid2=$(e.target).attr('class')
            window.open("../html/editProperty.html","_self");
          })
        },
        error:function (){
            window.open("../login-form-02/login.html","_self");
        }
    })
    
}

window.addEventListener("load",loader);