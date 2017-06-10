const companyData = JSON.parse(localStorage.getItem("currentCompany"));
const myCompanyId = companyData._id;

var options = {
    formData: loadSavedForm(),
    subtypes: {
        text: ['datetime-local']
    },
    prepend: '<h1 id="control-7092891">Check In</h1><div class="fb-text form-group field-text-1496299533016"><label for="text-1496299533016" class="fb-text-label">First Name<span class="fb-required">*</span></label><input type="text" class="form-control" name="text-1496299533016" id="text-1496299533016" required="required" aria-required="true"></div><div class="fb-text form-group field-text-1496299552960"><label for="text-1496299552960" class="fb-text-label">Last Name<span class="fb-required">*</span></label><input type="text" class="form-control" name="text-1496299552960" id="text-1496299552960" required="required" aria-required="true"></div><div class="fb-text form-group field-text-1496299568961"><label for="text-1496299568961" class="fb-text-label">Phone Number<span class="fb-required">*</span></label><input type="tel" class="form-control" name="text-1496299568961" id="text-1496299568961" required="required" aria-required="true"></div>',
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
    disableFields: ['autocomplete']
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
