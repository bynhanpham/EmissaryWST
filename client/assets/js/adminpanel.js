// Declare JQuery and Handlebars globals
/* global $ */
/* global Handlebars */

$(document).ready(function(){
   console.log('ready');

   function getCompanies() {
        let json = {};
        $.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/companies',
            success: function(response) {
                json = response;
                console.log(response);
            }
        });
        return json;
    }

    let companies = getCompanies();

    //DashBoard Template
    let source = $("#company-list-template").html();
    let template = Handlebars.compile(source);

    let compiledHtml = template(companies);
    
    $('#company-list').html(compiledHtml);
});
