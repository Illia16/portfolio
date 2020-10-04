$(document).ready(function(){

    setTimeout(function() {
        $("#loadingPage").addClass('welcomeUp');

        setTimeout(() => {
            $("#loadingPage").css({'display': 'none'});
        }, 1500);
    }, 1500);

    // OPEN NAVIGATION MENU
    $('#openNav').click(function() {
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');

        $(`.showNav span`).hasClass('clicked') 
        ? $(`.headerTop .logoInitials`).addClass('toggleOpacity')
        : $(`.headerTop .logoInitials`).removeClass('toggleOpacity')
    });

    // WHEN CLICKING ON A CERTAIN LINK WE GO TO the #element
    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 1000);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');

        // bringing back our logo initials to 1(visible)
        $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
    });

    $(`.projectsList li`).hide();
    $(`.projectsList li.featured`).show();
    $(`.everySortButton:first-child`).addClass('onLoad');

    $(".sortButtons button").click(function () {
        $(`.everySortButton:first-child`).removeClass('onLoad');
        $(`.projectsList li`).slideUp(300);
            // $(`.projectsList li`).hide(300);

        $(`.${this.value}`).delay("300").slideDown(500);
            // $(`.${this.value}`).delay(300).show(500);
        this.value === 'featured' && $(`.projectsList featured`).delay("300").slideDown(500);
            // this.value === 'featured' && $(`.projectsList featured`).delay(300).show(500);
        this.value === 'all' && $(`.projectsList li`).delay("300").slideDown(500);
            // this.value === 'all' && $(`.projectsList li`).delay(300).show(500);
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
            $(`.showNav span`).hasClass('clicked') && $(`.headerTop .logoInitials`).addClass('toggleOpacity')

            $(`.headerTop`).removeClass('headerTopFixed');
            $(`.headerTop .logoInitials a`).empty();
            $(`.headerTop .logoInitials a`).append(`<img src="./img/logoWhite.png" alt="logo initials I.N.">`);
            $(".borderBottom .socialMedia").css({'display': 'none'});
            $("#toTopLink").css({'display': 'none'});
        }

    }, { threshold: [0,1] });
    
    observeEl.observe(document.querySelector("#headerBottom"));
});