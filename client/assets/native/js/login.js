// with Button named loginButton
$(function() {
   $('#loginButton').click(function () {
       var userData = grabUserData();
       event.preventDefault();
       ajaxPostUser('/api/employees/login', userData);
       
   });
});


// with Button named signin-bt
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
           console.log(response);
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

           window.onerror=handleError();
           event.preventDefault();
           alert("Username and Password Combination Incorrect. Please Try Again.");
        }
   });
}
// ex) company_id : 56e8a51293a19986040e93fe
//Ajax function to create a POST request to server
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
           console.log(response);
           //alert(response.name);
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
   var user = {};
   user.email = $('#username').val();
   user.password = $('#password').val();
   return user;
}


/**
 * @func handleError
 * @desc Checks for valid username/password entry
 * @returns {boolean} True
 */
function handleError()
{
   errorlog.innerHTML="Not Valid Username and Password, please type valid one.";
   return true;
}
