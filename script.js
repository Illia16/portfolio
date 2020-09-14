$(document).ready(function(){

    // OPEN NAVIGATION MENU
    $('#openNav').click(function() {
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');

        $(`.headerTop .logoInitials`).toggleClass('toggleOpacity');
    });

    // WHEN CLICKING ON A CERTAIN LINK WE GO TO the #element
    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 1000);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');

        // bringing back our logo initials to 1(visible)
        $(`.headerTop .logoInitials`).toggleClass('toggleOpacity');
        //$(`.headerTop .logoInitials`).css({'opacity': '1'});
    });

    $(".sortButtons button").click(function () {
        $(`.${this.value}`).delay("500").slideDown();
        $(`.projectsList li`).not(`.${this.value}`).slideUp();
        this.value === 'all' && $(`.projectsList li`).delay("500").slideDown();
    });


    // CHECK IF HEADER TOUCHES TOP SO THAT TO MOVE HAMBURGER
    let observeEl = new IntersectionObserver(function(domEl) {
        //console.log(entries);
        //console.log(entries[0].target.id);
        //console.log(entries[0].intersectionRatio);

        if(domEl[0].intersectionRatio < 1) {
            //console.log("no intersection with screen");

            $(`.headerTop`).addClass('headerTopFixed');
            $(`.headerTop .logoInitials a`).empty();
            $(`.headerTop .logoInitials a`).append(`<img src="./img/logoBlack.png" alt="logo initials I.N.">`);
            $(".borderBottom .socialMedia").css({'display': 'flex'});
            $("#toTopLink").css({'display': 'block'});
            $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
        }
        else {
            //console.log("fully intersects with screen");

            $(`.headerTop`).removeClass('headerTopFixed');
            $(`.headerTop .logoInitials a`).empty();
            $(`.headerTop .logoInitials a`).append(`<img src="./img/logoWhite.png" alt="logo initials I.N.">`);
            $(".borderBottom .socialMedia").css({'display': 'none'});
            $("#toTopLink").css({'display': 'none'});
        }

    }, { threshold: [0,1] });
    
    observeEl.observe(document.querySelector("#headerBottom"));
    
    // WORKS BUT I THINK IT'S TOO MUCH LOAD ON THE SYSTEM
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