//jQuery time
(function($) {
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches
  
    $(".next").click(function() {
      if (animating) return false;
      animating = true;
  
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();
  
      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
  
      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({
        opacity: 0
      }, {
        step: function(now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = (now * 50) + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale(' + scale + ')'
          });
          next_fs.css({
            'left': left,
            'opacity': opacity
          });
        },
        duration: 800,
        complete: function() {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });
  
    $(".previous").click(function() {
      if (animating) return false;
      animating = true;
  
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
  
      //de-activate current step on progressbar
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  
      //show the previous fieldset
      previous_fs.show();
      //hide the current fieldset with style
      current_fs.animate({
        opacity: 0
      }, {
        step: function(now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = ((1 - now) * 50) + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'left': left
          });
          previous_fs.css({
            'transform': 'scale(' + scale + ')',
            'opacity': opacity
          });
        },
        duration: 800,
        complete: function() {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });
  
  })(jQuery);  //template js ends

  //image is uploaded
  // var e=document.getElementById("imgUpload");
  // e.addEventListener("click",()=>{
  //   $.ajax({
  //     type: "POST",
  //     url: "http://127.0.0.1:3000/imgUploads",
  //     contentType: 'application/json',
  //     data: 
  //     dataType: 'json',
  //     success: function(result){

  // })
  function fun1(){
    console.log("loc obj:", $(".pac-input").val());
  }
  console.log("loc obj:", $(".pac-input").val());
 
  //submit is clicked
  var ele=document.getElementById("submit");
  // ele.addEventListener("click",fun2);

  function fun2(){
    var obj={};
    var arr=[];
    obj.ownerName=document.getElementById("ownerName").value;
    console.log("kavya",document.getElementById("propertyName").value); 
    obj.propertyName=document.getElementById("propertyName").value;
    var e=document.getElementById("propertyType");
    console.log("ele type",e);
    obj.propertyType=e.options[e.selectedIndex].text;
    var loc=document.getElementById("location");
    obj.location=loc.options[loc.selectedIndex].text;
    console.log("ele loc",e);
    console.log((obj.propertyType),"and",obj.location);
    obj.facing=document.getElementById("facing").value;
    obj.cost=document.getElementById("cost").value;
    obj.securityDeposit=document.getElementById("securityDeposit").value;
    obj.address=document.getElementById("address").value;
    obj.furnishedStatus=document.getElementById("furnishedStatus").value;
    obj.beds=document.getElementById("beds").value;
    obj.since=document.getElementById("since").value;
    obj.baths=document.getElementById("baths").value;
    obj.balconies=document.getElementById("balconies").value;
    
    console.log(obj);
    localStorage.store_details=JSON.stringify(obj);
    
    
  }

  function calling(e) {
    // e.preventDefault()
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/properties/uploadfile",
      headers:{
        periperi:localStorage.name
      },
      // contentType: "application/json",
      data: new FormData($('#myform')[0]),
      processData: false,
      contentType: false,
      dataType: "json",
      success: function(result){

        console.log(result);

        if(result=="okdone")
          window.open("../html/property_added_successfully.html","_self");
        else window.open("../html/myProperties.html","_self");
    } ,
    });
    window.open("../html/property_added_successfully.html","_self");
  }
  
