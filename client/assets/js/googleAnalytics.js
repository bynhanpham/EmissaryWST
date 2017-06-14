// Declare Google Analytics global
/* global ga */

/**
 * Created by bchoi on 3/3/16.
 */
window.onload = function() {
    let buttonElm = document.getElementById("loginButton");
    // attach the onclick listener to the button
    buttonElm.addEventListener("click", function() {
        // send it to google analytics
        ga('send', {
            hitType: 'event',
            eventCategory: 'buttons',
            eventAction: 'click',
            eventLabel: 'loginButtonClick'
        });
    });
};