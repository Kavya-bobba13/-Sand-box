
function loader() {
    console.log("ok");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/requests_liked",
        contentType: 'application/json',
        headers:{
          "PeriPeri":localStorage.name
        },
        // data: JSON.stringify({
        //     iid:localStorage.iid
        // }),
        dataType: 'json',
        success: function(result){
                console.log("ok");
                console.log(result);
                if(result){
                    result.requestedProperties.forEach(ele => {
                        
                
                    document.querySelector(".container.py-5.requested").innerHTML+=`
                    <div class="row justify-content-center mb-3">
                    <div class="col-md-12 col-xl-10">
                      <div class="card shadow-0 border rounded-3">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                              <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                <img src=${ele.image}
                                  class="w-100" />
                                <a href="#!">
                                  <div class="hover-overlay">
                                    <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6">
                              <h5>${ele.type} : ${ele.propertyName}</h5>
                              <div class="d-flex flex-row">
                                <span>Availability: ${ele.status}</span>
                              </div>
                              <div class="mt-1 mb-0 text-muted small">
                                <span>owner: ${ele.ownerName}</span>
                                <span class="text-primary"> • </span>
                                <span>${ele.location}</span>
                                <span class="text-primary"> • </span>
                                <span>${ele.bhkSize}BHK<br /></span>
                              </div>
                              <div class="mb-2 text-muted small">
                                <span>${ele.facing}</span>
                                <span class="text-primary"> • </span>
                                <span>${ele.area}</span>
                                <span class="text-primary"> • </span>
                                <span>${ele.furnishedStatus}<br /></span>
                              </div>
                              <p class="text-truncate mb-4 mb-md-0">
                                ...
                              </p>
                            </div>
                            <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                              <div class="d-flex flex-row align-items-center mb-1">
                                <h4 class="mb-1 me-1">${ele.cost}</h4>
                                <span class="text-danger"><s>${Number(ele.cost)+3000}</s></span>
                              </div>
                              
                              <div class="d-flex flex-column mt-4">
                                <button class="btn btn-primary btn-sm detbtn" type="button">Details</button>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
                })
                
                result.likedProperties.forEach((ele)=>{
                document.querySelector(".container.py-5.wishlisted").innerHTML+=`
                <div class="row justify-content-center mb-3">
                <div class="col-md-12 col-xl-10">
                  <div class="card shadow-0 border rounded-3">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div class="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src=${ele.image}
                              class="w-100" />
                            <a href="#!">
                              <div class="hover-overlay">
                                <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-6">
                          <h5>${ele.type} : ${ele.propertyName}</h5>
                          <div class="d-flex flex-row">
                            <span>Availability: ${ele.status}</span>
                          </div>
                          <div class="mt-1 mb-0 text-muted small">
                            <span>owner: ${ele.ownerName}</span>
                            <span class="text-primary"> • </span>
                            <span>${ele.location}</span>
                            <span class="text-primary"> • </span>
                            <span>${ele.bhkSize}BHK<br /></span>
                          </div>
                          <div class="mb-2 text-muted small">
                            <span>${ele.facing}</span>
                            <span class="text-primary"> • </span>
                            <span>${ele.area}</span>
                            <span class="text-primary"> • </span>
                            <span>${ele.furnishedStatus}<br /></span>
                          </div>
                          <p class="text-truncate mb-4 mb-md-0">
                            ...
                          </p>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div class="d-flex flex-row align-items-center mb-1">
                            <h4 class="mb-1 me-1">${ele.cost}</h4>
                            <span class="text-danger"><s>${Number(ele.cost)+3000}</s></span>
                          </div>
                          
                          <div class="d-flex flex-column mt-4">
                            <button class="btn btn-primary btn-sm detbtn" type="button">Details</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `
            });  
                    
                    
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