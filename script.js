$(document).ready(function(){

    // OPEN NAVIGATION MENU
    $('#openNav').click(function() {
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');
    });

    // WHEN CLICKING ON A CERTAIN LINK WE GO TO the #element
    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 1000);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');
    });

    console.log(document.documentElement);
    console.log(window.scrollY);
    console.log(window);
    console.log($("header").height());
    console.log($("header"));


    // CHECK IF STICKY TOUCHES TOP?
    // var observer = new IntersectionObserver(function(entries) {
    //     // no intersection with screen
    //     if(entries[0].intersectionRatio === 0) {
    //         document.querySelector("#nav-container").classList.add("nav-container-sticky");
    //         console.log("no intersection with screen"); 
    //     }
    //     // fully intersects with screen
    //     else if(entries[0].intersectionRatio === 1)
    //         document.querySelector("#nav-container").classList.remove("nav-container-sticky");
    //         console.log("fully intersects with screen");
    // }, { threshold: [0,1] });
    
    // observer.observe(document.querySelector("#headerTop"));
    
    // WORKS BUT TOO MUCH LOAD ON THE SYSTEM?!

    // window.onscroll = () => {
    //     if (window.scrollY > 695) {
    //         $('#bottomSocialMedia').css({'display': 'flex'});
    //         $('#toTopLink').css({'display': 'block'});
    //     } else {
    //         $('#bottomSocialMedia').css({'display': 'none'});
    //         $('#toTopLink').css({'display': 'none'});
    //     }
    // };

});