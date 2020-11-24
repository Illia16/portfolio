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
        $(`#headerBottom`).toggleClass('toggleOpacityToLow');
        $('body').toggleClass('fixedBody');

        $(`.showNav span`).hasClass('clicked') 
        ? $(`.headerTop .logoInitials`).addClass('toggleOpacity')
        : $(`.headerTop .logoInitials`).removeClass('toggleOpacity')

        $(`.showNav span`).hasClass('clicked') 
        ? $(`#bottomSocialMedia, #toTopLink`).css({'display':'none'})
        : $(`#bottomSocialMedia, #toTopLink`).css({'display':'flex'})
    });

    // nav focus loop
    $('header .socialMedia li:last-child a').focusout( function() {
        $('.showNav').focus();
    });

    // putting focused element to the center of the screen only if it's TABBED
    $('main a, main input, main textarea, main button').bind('keyup', function(e) {
        if (e.keyCode === 9 && !myPortfolio.isInView(e.target)) {
            let center = $(window).height()/2;
            let top = $(e.target).offset().top ;
            top > center && $(window).scrollTop(top-center);
        }
    });
};

// function to check is the next focused element is visible or not
myPortfolio.isInView = function(el) {
    let rect     = el.getBoundingClientRect();
    let vWidth   = window.innerWidth || document.documentElement.clientWidth;
    let vHeight  = window.innerHeight || document.documentElement.clientHeight;
    let efp      = function (x, y) { return document.elementFromPoint(x, y) };  

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left,  rect.top)) ||  el.contains(efp(rect.right, rect.top)) ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
    );
};

myPortfolio.scrollTo = function() {
    // WHEN CLICKING ON A CERTAIN LINK WE GO TO the #element
    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 1000);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');
        $(`#headerBottom`).removeClass('toggleOpacityToLow');
        $(`body`).removeClass('fixedBody');

        // bringing back our logo initials to 1(visible)
        $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
    });
};

myPortfolio.sortProjects = function() {
    $(".sortButtons button").click(function () {
        $(`.everySortButton:first-child`).removeClass('onLoad');
        $(`.projectsList li`).slideUp(300);

        $(`.${this.value}`).delay("300").slideDown(500);
        this.value === 'featured' && $(`.projectsList featured`).delay("300").slideDown(500);
        this.value === 'all' && $(`.projectsList li`).delay("300").slideDown(500);
    });
};

// setting the min-height of UL list of projects so that to always maintain gap with bottom background img
myPortfolio.ulMinHeightSet = function() {
    let ulMinHeight = $(`.projectImage`).height().toFixed(2) + 'px';
    $('.projectsList').css({'min-height' : ulMinHeight });
};

// if width is < 500px then show only TO TOP link, otherwise TO TOP + list of my social media
myPortfolio.borderBottomContent = function() {
    if ( $(document).width() < 500 || ( $(document).width() < 500 && !myPortfolio.observeEl.isIntersects)  ) {
        $(".borderBottom .socialMedia").css({"display": "none"});
        $(".borderBottom").css({"justify-content": "center"});
    }
    else if ( !myPortfolio.observeEl.isIntersects ) {
        $(".borderBottom .socialMedia").css({"display": "flex"});
        $(".borderBottom").css({"justify-content": "space-between"});
    }
};

// so that not to change the height every time width changes in EVERY PIXES, to prevent a huge load on the system, there's a fucntion with a step i
$(window).on('resize', function() {
    const arrSizes = [];
    for (let i=250; i<=1500; i += 10) {
        arrSizes.push(i);
    }

    if( arrSizes.includes( $(this).width() ) ) {
        myPortfolio.ulMinHeightSet();
        myPortfolio.borderBottomContent();
    }
});

// CHECK IF HEADER TOUCHES TOP SO THAT TO MOVE HAMBURGER
myPortfolio.observeEl = new IntersectionObserver(function(domEl) {

    myPortfolio.observeEl.element = domEl[0].target.id;

    //console.log("no intersection with screen");
    if(!domEl[0].isIntersecting) {
        myPortfolio.observeEl.isIntersects = false;
    }
    //console.log("fully intersects with screen");
    else {
        myPortfolio.observeEl.isIntersects = true;
    }

    myPortfolio.checkIntersection();
    console.log(myPortfolio.observeEl);
}, { threshold: [0,1] });


myPortfolio.checkIntersection = function() {
    if ( myPortfolio.observeEl.element === 'headerBottom' && myPortfolio.observeEl.isIntersects === false) {
        $(`.headerTop`).addClass('headerTopFixed');
        $(`.headerTop .logoInitials`).empty();
        $(`.headerTop .logoInitials`).append(`<img src="./img/logoBlack.png" alt="logo initials I.N.">`);
        $(".borderBottom .socialMedia").css({'display': 'flex'});
        $("#toTopLink").css({'display': 'block'});
        $(`.headerTop .logoInitials`).removeClass('toggleOpacity');
    } else if ( myPortfolio.observeEl.element === 'headerBottom' && myPortfolio.observeEl.isIntersects === true) {
        $(`.showNav span`).hasClass('clicked') && $(`.headerTop .logoInitials`).addClass('toggleOpacity');
        $(`.headerTop`).removeClass('headerTopFixed');
        $(`.headerTop .logoInitials`).empty();
        $(`.headerTop .logoInitials`).append(`<img src="./img/logoWhite.png" alt="logo initials I.N.">`);
        $(".borderBottom .socialMedia").css({'display': 'none'});
        $("#toTopLink").css({'display': 'none'});
    } else if (myPortfolio.observeEl.element === 'contact' && myPortfolio.observeEl.isIntersects === true) {
        $(".borderBottom .socialMedia").css({"display": "none"});
        $(".borderBottom").css({"justify-content": "center"});
    } else if (myPortfolio.observeEl.element === 'contact' && myPortfolio.observeEl.isIntersects === false) {
        $(".borderBottom .socialMedia").css({"display": "flex"});
        $(".borderBottom").css({"justify-content": "space-between"});
    } else null

    myPortfolio.borderBottomContent();
};


myPortfolio.checkIfValidInput = (input, pattern) => {
    if ( pattern.test(input) ) {
        return true
    }
};

$('#send').click( function(e) {
    e.preventDefault();

    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    const emailSpamPattern = /(?:admin|reply|sales|product|noreply|no-reply|spam|subscribe|register|online)\S*/;
    // right email pattern
    const emailValidation = /\S+@\S+\.\S+/;
    // checking textarea for links
    const linkPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    $('.nameError').css({"display": "none"});
    $('.emailError').css({"display": "none"});
    $('.textFieldError').css({"display": "none"});

    console.log(myPortfolio.checkIfValidInput(email, emailSpamPattern));

    if ( !name ) {
        $('.nameError').css({"display": "block"});
        $(`.nameError`).fadeOut(1500);
    } else if ( !email || myPortfolio.checkIfValidInput(email, emailSpamPattern) || !myPortfolio.checkIfValidInput(email, emailValidation) ) {
        $('.emailError').css({"display": "block"});
        $(`.emailError`).fadeOut(1500);
    } else if ( !message || myPortfolio.checkIfValidInput(message, linkPattern) ) {
        $('.textFieldError').css({"display": "block"});
        $(`.textFieldError`).fadeOut(1500);
    } else {
        $("form")[0].submit();
    }
});

myPortfolio.init = function() {
    myPortfolio.loadingPage();
    myPortfolio.ulMinHeightSet();
    myPortfolio.openNav();
    myPortfolio.scrollTo();
    myPortfolio.sortProjects();
    myPortfolio.observeEl.observe(document.querySelector("#headerBottom"));
    myPortfolio.observeEl.observe(document.querySelector("#contact"));
}

$(document).ready(function(){
    myPortfolio.init();
});