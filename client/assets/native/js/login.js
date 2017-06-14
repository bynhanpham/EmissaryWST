/**
 * @file Provides Login functionality.
 */

// Declare JQuery global
/* global $ */

/**
 * Bind login functionality to button
 */
$(function() {
    $('#loginButton').click(function () {
        let userData = grabUserData();
        event.preventDefault();
        ajaxPostUser('/api/employees/login', userData);
    });
});


/**
 * Bind logout functionality to button
 */
$(function() {
    $('#logoutButton').click(function() {
        localStorage.removeItem('userState');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentCompany');
    });
});

/**
 * @func ajaxPostUser
 * @desc Ajax function to create a POST request to server (user).
 * @param {url} url
 * @param {data} data
 */
function ajaxPostUser(url, data){
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        success: function(response){
            if(response.role === 'a_admin'){
                localStorage.setItem('userState' , 2);
                location.href = '/admin-dashboard.html';
            }
            else{
                localStorage.setItem('userState' , 1);
                localStorage.setItem('currentUser', JSON.stringify(response));
                ajaxGetCompanyInfo('/api/companies/' + response.company_id);
                location.href = '/visitors.html';
            }
        },
        error: function() {
            window.onerror = handleError();
            event.preventDefault();
        }
    });
}

/**
 * @func ajaxGetCompanyInfo
 * @desc Ajax function to create a POST request to server (company).
 * @param {url} url
 */
function ajaxGetCompanyInfo(url){
    $.ajax({
        type: "GET",
        url: url,
        data: $('#response').serialize(),
        async: false,
        dataType: 'json',
        success: function(response){
            localStorage.setItem('currentCompany', JSON.stringify(response));
        }
    });
}


/**
 * @func grabUserData
 * @desc Grab the corresponding user's information
 * @returns user
 */
function grabUserData(){
    let user = {};
    user.email = $('#username').val();
    user.password = $('#password').val();
    return user;
}


/**
 * @func handleError
 * @desc Checks for valid username/password entry
 * @returns {boolean} True
 */
function handleError() {
    $('#errorlog').html("Sorry, that email/password combination was not found.");
    return true;
}
