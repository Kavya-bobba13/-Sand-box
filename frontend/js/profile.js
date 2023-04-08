

function load(){
    if(localStorage.getItem("name")!=null){

         $.ajax({   
					type: "POST",
					url: "http://127.0.0.1:3000/users/getData",
					contentType: 'application/json',
					data: JSON.stringify({
						name:localStorage.getItem("name"),
					}),
					dataType: 'json',
					success: function (result) {
						console.log("hii",result)
            $('#uname').val(result.name);
            console.log( $('#uname').val(),"btw");
            $("#mobile").val(result.mobile);
            $("#email").val(result.email);
            $("#img22").attr("src",result.image);

          }
        })
		$(".true").prop("readonly",true);
    }

}
document.querySelector("#key").value=localStorage.name;

$(".edit").click(()=>{
    console.log("edit enabled");
    $(".true").prop("readonly",false);
})
$(".save").click(()=>{
    console.log("save clicked");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/users/editData",
        contentType: 'application/json',
        data: JSON.stringify({
            cat:"details",
            name:localStorage.getItem("name"),
            cname:$("#uname").val(),
            email:$("#email").val(),
            mobileno:$("#mobile").val(),
            oldpwd:$("#cpwd").val(),
            newpwd:$("#newpwd").val(),
            cnewpwd:$("#rnewpwd").val()
        }),
        dataType: 'json',
        success: function (result) {
            console.log("hii",result)
            localStorage.setItem("name",result.token);
            load();
    // $('#uname').val(result.name);
    // $("#mobile").val(result.mobile);
    // $("#email").val(result.email);
    }
    })        
       
})


window.onload = load;