// Declare JQuery and Handlebars globals */
/* global $ */
/* global Handlebars */

$(document).ready(function(){

    let io = io(); // Initialize Socket

    // Socket variables
    //let CONNECTION = "connection";
    let VALIDATE_COMPANY_ID = "validate_company_id";
    let VISITOR_LIST_UPDATE = "visitor_list_update";
    //let DISCONNECT = "disconnect";
    //let REMOVE_VISITOR = "remove_visitor";
    //let ADD_VISITOR = "add_visitor";

    /***
     * Compile all the Handle Bar Templates
     */

    // DashBoard Template
    let source = $("#visitor-list-template").html();
    let template = Handlebars.compile(source);

    // Modal Template
    let modal = $('#visitor-info-template').html();
    let modalTemplate = Handlebars.compile(modal);

    // Update Patient List
    io.on(VALIDATE_COMPANY_ID, function(socket) {
        socket.on(VISITOR_LIST_UPDATE, function (data) {
            let compiledHtml = template(data);
            $('#visitor-list').html(compiledHtml);
        });
    });

    /***
     * Function Listener for Opening a Modal
     */
    $(document).on('click','.patient-check-out',function(){
        let uniqueId = $(this).attr('value');

        io.on(VALIDATE_COMPANY_ID, function(socket) {
            socket.emit('send Id', uniqueId);
            socket.on('send visitorData', function (data) {
                let compiledTemplate = modalTemplate(data);
                $('.modal-dialog').html(compiledTemplate);
            });
        });
    });

    $(document).on('click','.check-in-btn',function(){
        let id = $(this).closest('.modal-content').find('.phone-number').attr('value');

        io.on(VALIDATE_COMPANY_ID, function(socket) {
            socket.emit('check-in-patient', id);
        });
    });

});
