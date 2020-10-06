const myPortfolio = {};

myPortfolio.loadingPage = function() {
    setTimeout(function() {
        $("#loadingPage").addClass('welcomeUp');

        setTimeout(() => {
            $("#loadingPage").css({'display': 'none'});
        }, 1500);
    }, 1500);

    // hiding all projects
    $(`.projectsList li`).hide();
    // showing only featured ones
    $(`.projectsList li.featured`).show();
    // making underline on featured ones by default
    $(`.everySortButton:first-child`).addClass('onLoad');
};

myPortfolio.openNav = function() {
    // OPEN NAVIGATION MENU
    $('#openNav').click(function() {
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');

        $(`.showNav span`).hasClass('clicked') 
        ? $(`.headerTop .logoInitials`).addClass('toggleOpacity')
        : $(`.headerTop .logoInitials`).removeClass('toggleOpacity')
    });

    // nav focus loop
    $('.socialMedia li:last-child a').focusout( function() {
        $('.showNav').focus();
    });

    // putting focused element to the center of the screen only if it's TABBED
            // $('main a, main input, main textarea, main button').focus(function(){
            //         let center = $(window).height()/2;
            //         let top = $(this).offset().top ;
            //         top > center && $(window).scrollTop(top-center);
            // });
    $('main a, main input, main textarea, main button').bind('keyup', function(e) {
        console.log(e.keyCode, e.target, myPortfolio.isInView(e.target));

        if (e.keyCode === 9 && myPortfolio.isInView(e.target)) {
            console.log('tab pressed');
            let center = $(window).height()/2;
            let top = $(e.target).offset().top ;
            top > center && $(window).scrollTop(top-center);
        }
    });
};

myPortfolio.isInView = function(el){
    let r, html;
    if ( !el || 1 !== el.nodeType ) { return false; }
    html = document.documentElement;
    r = el.getBoundingClientRect();

    return ( !!r
        && r.bottom >= 0
        && r.right >= 0
        && r.top <= html.clientHeight
        && r.left <= html.clientWidth
    );
}

myPortfolio.scrollTo = function() {
    // WHEN CLICKING ON A CERTAIN LINK WE GO TO the #element
    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 1000);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');

        // bringing back our logo initials to 1(visible)
        $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
    });
};

myPortfolio.sortProjects = function() {
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
};

// setting the min-height of UL list of projects so that to always maintain gap with bottom background img
myPortfolio.ulMinHeightSet = function() {
    let ulMinHeight = $(`.projectImage`).height().toFixed(2) + 'px';
    $('.projectsList').css({'min-height' : ulMinHeight });
    // console.log('resized!!!!', ulMinHeight);
    // console.log( $(window).width()    );
};



// so that not to change the height every time width changes in EVERY PIXES, to prevent a huge load on the system, there's a fucntion with a step i
$(window).on('resize', function(){
    const arrSizes = [];
    for (let i=250; i<=1500; i += 10) {
        arrSizes.push(i);
    }

    if( arrSizes.includes( $(this).width() ) ) {
        myPortfolio.ulMinHeightSet();
    }
});


// CHECK IF HEADER TOUCHES TOP SO THAT TO MOVE HAMBURGER
myPortfolio.observeEl = new IntersectionObserver(function(domEl) {
    //console.log(entries);
    //console.log(entries[0].target.id);
    //console.log(entries[0].intersectionRatio);

    if(domEl[0].intersectionRatio < 1) {
        //console.log("no intersection with screen");

        $(`.headerTop`).addClass('headerTopFixed');
        $(`.headerTop .logoInitials`).empty();
        $(`.headerTop .logoInitials`).append(`<img src="./img/logoBlack.png" alt="logo initials I.N.">`);
        $(".borderBottom .socialMedia").css({'display': 'flex'});
        $("#toTopLink").css({'display': 'block'});
        $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
    }
    else {
        //console.log("fully intersects with screen");
        $(`.showNav span`).hasClass('clicked') && $(`.headerTop .logoInitials`).addClass('toggleOpacity')

        $(`.headerTop`).removeClass('headerTopFixed');
        $(`.headerTop .logoInitials`).empty();
        $(`.headerTop .logoInitials`).append(`<img src="./img/logoWhite.png" alt="logo initials I.N.">`);
        $(".borderBottom .socialMedia").css({'display': 'none'});
        $("#toTopLink").css({'display': 'none'});
    }

}, { threshold: [0,1] });

myPortfolio.init = function() {
    myPortfolio.loadingPage();
    myPortfolio.ulMinHeightSet();
    myPortfolio.openNav();
    myPortfolio.scrollTo();
    myPortfolio.sortProjects();
    myPortfolio.observeEl.observe(document.querySelector("#headerBottom"));
}

$(document).ready(function(){
    myPortfolio.init();
});


// function checkTabPress(e) {
//     console.log(e.keyCode);
//     var ele = document.activeElement;
//     console.log(ele, ele.nodeName);
//     // 'use strict';

//     // if (e.keyCode === 9 && ele.nodeName.toLowerCase() === 'a') {
//     //     console.log(ele.href);
//     // }
// }

// document.addEventListener('keyup', function (e) {
//     checkTabPress(e);
// }, false);