$(document).ready(function(){
    $('#openNav').click(function(){
        $('#nav').toggleClass('openedNav');
        $(`.showNav span`).toggleClass('clicked');
    });
});