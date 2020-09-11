$(document).ready(function(){
    $('#openNav').click(function(){
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');
    });

    $("a.scrollTo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);

        $('#nav').removeClass('openedNav');
        $(`.showNav span`).removeClass('clicked');
    });
});