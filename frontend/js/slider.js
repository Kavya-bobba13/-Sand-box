const swiper = new Swiper(".heroslider", {
  spaceBetween: 30,
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

var lastScrollTop = 0;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   let nav=document.querySelectorAll(".navigation");
   if(nav){

    
        if (st > lastScrollTop) {
            // downscroll code
            nav[0].style.display="none";
        } else if (st < lastScrollTop) {
            nav[0].style.display="";
            nav[0].style.backgroundColor="#06406d";
            // upscroll code
        } // else was horizontal scroll
    }

   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   if(lastScrollTop==0) nav[0].style.backgroundColor="";
}, false);


$(".dropdown").click((e)=>{
	console.log($($(e.target).children()[1]).toggleClass("active"));
})

$(".dropdown-item").click((e)=>{
	console.log($($(e.target).parent().parent().children()[0]).text(e.target.innerText));
	$($(e.target).parent()).toggleClass("active")

})

$(".search-btn").click((e)=>{
  
	localStorage.search_prop=JSON.stringify({
		val1:$(".val1").text().trim(" "),
		val2:$(".val2").text().trim(" "),
		val3:$(".val3").text().trim(" ")
	});
  console.log(localStorage.search_prop);
  window.open("../../frontend/html/rent_type.html","_self")


})
