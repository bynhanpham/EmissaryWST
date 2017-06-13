const companyData = JSON.parse(localStorage.getItem("currentCompany"));
const myCompanyId = companyData._id;

var options = {
    formData: loadSavedForm(),
    subtypes: {
        text: ['datetime-local']
    },
    prepend: '<h1 id="control-7092891">Check In</h1><div class="fb-text form-group first_name"><label for="first_name" class="fb-text-label">First Name<span class="fb-required">*</span></label><input type="text" class="form-control" name="first_name" id="first_name" required="required" aria-required="true"></div><div class="fb-text form-group last_name"><label for="last_name" class="fb-text-label">Last Name<span class="fb-required">*</span></label><input type="text" class="form-control" name="last_name" id="last_name" required="required" aria-required="true"></div><div class="fb-text form-group phone_number"><label for="phone_number" class="fb-text-label">Phone Number<span class="fb-required">*</span></label><input type="tel" class="form-control" name="phone_number" id="phone_number" required="required" aria-required="true"></div>',
    append: '<button type="submit" class="btn btn-primary" style="primary">Submit</button>',
    onSave: function (e, formData) {
        var formJSON = formatFormData(formData);
        var url = '/api/form/template';
        ajaxPut(url, formJSON);
    },
    stickyControls: {
        enable: true
    },
    sortableControls: true,
    disableInjectedStyle: false,
    disableFields: ['autocomplete'],
    fields: [{
        label: 'Email',
        required: true,
        attrs: {
            type: 'text'
        },
        icon: '📧',
        pattern: "^.*@.*\\..*$",
        oninvalid: "setCustomValidity('Please enter a valid email!')",
        oninput: "setCustomValidity('')",
        className: "form-control, form-email"
    }, {
        label: 'Telephone',
        required: true,
        attrs: {
            type: 'text'
        },
        icon: '☎',
        pattern: "^[\\+]1\\s[\\(]\\d{3}[\\)]\\d{3}[\\-]\\d{4}",
        oninvalid: "setCustomValidity('Please follow the correct format (xxx)xxx-xxxx.')",
        oninput: "setCustomValidity('')",
        className: "form-phone form-control bfh-phone",
        'data-format': '+1 (ddd)ddd-dddd'
    }],
    typeUserAttrs: {
        text: {
            pattern: {
                label: ' ',
                type: 'hidden'
            },
            oninvalid: {
                label: ' ',
                type: 'hidden'
            },
            oninput: {
                label: ' ',
                type: 'hidden'
            },
            'data-format': {
                label: ' ',
                type: 'hidden'
            }
        }
    }
};

function formatFormData(formData) {
    var form = {};

    form._admin_id = myCompanyId;
    form.template = formData;

    return form;
}

function getFormData(url) {
    var json;

    $.ajax({
        dataType: 'json',
        type: 'GET',
        data: $('#response').serialize(),
        async: false,
        url: url,
        success: function (response) {
            json = response;
            //console.log(response);
        }
    });

    return json;
}

/**
 * @function ajaxPut
 * @param {string} url
 * @param {data} data
 * @desc Ajax function to create a POST request to server.
 */
function ajaxPut(url, data) {
    $.ajax({
        type: "PUT",
        url: url,
        data: data,
        dataType: 'json',
        success: function (response) {
            console.log("SUCCESS!" + response);
        },
        error: function (response) {
            //console.log(response);
            //alert(jQuery.parseJSON(resJSON).responseText);
            event.preventDefault();
        }
    });
}

function loadSavedForm() {
    var url = '/api/form/template/' + myCompanyId;
    var formJSON = getFormData(url);

    if (formJSON === null) {
        return null;
    } else {
        return formJSON.template;
    }
}

jQuery(function ($) {
    $('#form-builder').formBuilder(options);
});
