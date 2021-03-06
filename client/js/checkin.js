/**
 * @file Manages checkins.
 */

// Declare JQuery and Socket globals
/* global $ */
/* global io */

$(document).ready(function () {

    let companyData = JSON.parse(localStorage.getItem("currentCompany"));
    companyData.company_id = companyData._id;
    const myCompanyId = companyData._id;
    $.ajax({
          dataType:'json',
          type: 'POST',
          data: companyData,
          url:'/api/visitorLists/validate',
          success:function(response){
          }
    });

    let formData = loadSavedForm(myCompanyId);
    let requiredFields = [{
        "type": "header",
        "subtype": "h1",
        "label": "Check In"
    }, {
        "type": "text",
        "required": true,
        "label": "First Name",
        "className": "form-control",
        "name": "first_name",
        "subtype": "text"
    }, {
        "type": "text",
        "required": true,
        "label": "Last Name",
        "className": "form-control",
        "name": "last_name",
        "subtype": "text"
    }, {
        "type": "text",
        "subtype": "tel",
        "required": true,
        "label": "Phone Number",
        "data-format": "+1 (ddd)ddd-dddd",
        "pattern": "^[\\+]1\\s[\\(]\\d{3}[\\)]\\d{3}[\\-]\\d{4}",
        "oninvalid": "setCustomValidity('Please follow the correct format (xxx)xxx-xxxx.')",
        "oninput": "setCustomValidity('')",
        "className": "form-control form-phone bfh-phone",
        "name": "phone_number"
    }];

    let submitButton = [{
        "type": "button",
        "subtype": "submit",
        "label": "Submit",
        "className": "btn btn-primary",
        "name": "submitForm",
        "style": "primary"
    }];

    if (formData !== null) {
        requiredFields = requiredFields.concat(JSON.parse(formData));
    }

    requiredFields = requiredFields.concat(submitButton);

    const formOptions = {
        formData: requiredFields,
        dataType: 'json'
    };

    let checkinform  = $('#check-in');
    let button       = $('#tap-to-check');
    let clock        = $('#clock');
    let confirmation = $('#confirmation');

    checkinform.formRender(formOptions);

    // Prevent users from scrolling around on iPad
    document.ontouchmove = function (e) {
        e.preventDefault();
    };

    // Bind Listeners
    button.on('click', startCheckIn);
    checkinform.submit(function(event) {
        event.preventDefault();
        submitForm();
    });

    /**
     * @function startCheckIn
     * @desc Starts the check in process
     */
    function startCheckIn() {
        // Hide clock and button
        button.animate({
            opacity: '0'
        }, 0);
        clock.animate({
            opacity: '0'
        }, 0);
        button.addClass('hide');
        button.addClass('hide');

        // Show form
        checkinform.removeClass('hide');
        checkinform.animate({
            top: '10%',
            opacity: '1'
        }, 500);
    }

    /**
     * @function submitForm
     * @desc When a client submits their form
     */
    function submitForm() {
        //event.preventDefault();
        let data = grabFormElements();
        let slackMessage = data.first_name + ' ' + data.last_name + ' has just checked in.';
        $.post("https://slack.com/api/chat.postMessage", {
            'token': "xoxp-167311421539-169267386423-191140632117-5263dba19bf30c7b56274a69fade6545",
            'channel': "notifications",
            'text': slackMessage
        }, function (data, status) {
        });

        triggerZapier(slackMessage);

        //socket.emit(ADD_VISITOR, data);
        console.log(data);
        $.ajax({
          dataType:'json',
          type: 'POST',
          data: data,
          url:'/api/visitorLists/',
          success:function(response){
            console.log(response);
            location.href = 'checkin.html'
          }
        });
        // Hide form
        checkinform.animate({
            top: '0%',
            opacity: '0'
        }, 0);
        checkinform.addClass('hide');

        // Show confirmation
        confirmation.removeClass('hide');
        confirmation.animate({
            opacity: '1'
        }, 500);

        // Reset form
        checkinform.formRender(formOptions);

        // Delay for 4 seconds
        setTimeout(function () {

            // Hide confirmation
            confirmation.animate({
                opacity: 0
            }, 0);
            confirmation.addClass('hide');

            // Show clock and button
            clock.removeClass('hide');
            button.removeClass('hide');
            clock.animate({
                opacity: '1'
            }, 500);
            button.animate({
                opacity: '1'
            }, 500);

        }, 4000);
    }

    function triggerZapier(message) {
        let url = companyData.zapier_url;
        let data = {};
        data.message = message;

        if(url !== undefined) {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    checkinform.unbind('submit');
                    checkinform.submit();
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    }

    /**
     * @function grabFormElements
     * @desc Grabs elements from the check in and puts it into an object
     */
    function grabFormElements() {

        let formData = JSON.parse(JSON.stringify($("#check-in").serializeArray()));

        // Finds label for each input field and appends it to the JSON.
        for (let i = 0; i < formData.length; i++) {
            let obj = formData[i];
            let label = $("label[for='" + obj.name + "']");
            obj.title = label.text();
        }

        let data = $('.check-in').serializeArray();
        let newVisitor = {};
        newVisitor.company_id = companyData._id;
        newVisitor.checkin_time = new Date();
        for (let i = 0; i < data.length; i++) {
            newVisitor[data[i].name] = data[i].value;
        }

        newVisitor.additional_info = formData;
        return newVisitor;
    }

    /**
     * @function updateClock
     * @desc gives the current time
     */
    function updateClock() {
        let currentTime = new Date();
        let currentHours = currentTime.getHours();
        let currentMinutes = currentTime.getMinutes();

        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

        // Convert an hours component of "0" to "12"
        currentHours = ( currentHours === 0 ) ? 12 : currentHours;

        // Compose the string for display
        let currentTimeString = currentHours + ":" + currentMinutes;

        $("#clock").html(currentTimeString);
    }

    updateClock();
    setInterval(updateClock, 60 * 1000);

});

function loadSavedForm(myCompanyId) {
    let url = '/api/form/template/' + myCompanyId;
    let formJSON = getFormData(url);

    if (formJSON === null) {
        return null;
    } else {
        return formJSON.template;
    }
}

function getFormData(url) {
    let json = {};
    $.ajax({
        dataType: 'json',
        type: 'GET',
        data: $('#response').serialize(),
        async: false,
        url: url,
        success: function (response) {
            json = response;
        }
    });
    return json;
}
