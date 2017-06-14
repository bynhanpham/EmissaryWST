// Declare JQuery global
/* global $ */

$(document).ready(function() {
    /**
     * Fullscreen background
     */
    $.backstretch("assets/images/backgrounds/1.jpg");

    let topNavbar1 = $('#top-navbar-1');
    topNavbar1.on('shown.bs.collapse', function(){
        $.backstretch("resize");
    });
    topNavbar1.on('hidden.bs.collapse', function(){
        $.backstretch("resize");
    });

    /**
     * Form
     */
    $('#company-reg-form').find('fieldset:first-child').fadeIn('slow');
});
