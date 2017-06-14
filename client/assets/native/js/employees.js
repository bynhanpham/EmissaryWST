/**
 * @file Manages the employees.
 */

// Declare JQuery and Handlebars globals
/* global $ */
/* global Handlebars */

$(document).ready(function(){
    let companyData = JSON.parse(localStorage.getItem("currentCompany"));
    let myCompanyId = companyData._id;

    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);

    let employees = getEmployees();

    let source = $("#employee-list-template").html();
    let template = Handlebars.compile(source);
    let compiledHtml = template(employees);

    $("#employee-list").html(compiledHtml);
    $('#employee-form').submit(function () {
        submitForm();
        return false;
    });

    /**
     * @function getEmployees
     * @desc Makes a get request to display list of employees
     * @returns displays the employee list
     */
    function getEmployees() {
        let json = {};
        $.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/employees/company/' + myCompanyId,
            success: function(response) {
                json = response;
            }
        });
        return json;
    }

    /**
     * @function updateEmployeeList
     * @desc Makes a post request to update list of employees when adding a new employee
     * @param {employee} obj employee
     * @returns updates the employee list
     */
    function updateEmployeeList(obj) {
        $.ajax({
            dataType: 'json',
            type: 'POST',
            data: obj,
            async: false,
            url: '/api/employees',
            success: function(response) {
                employees.push(response);
            }
        });
    }

    /***
     * When a patient submits their form
     * @param none
     * @returns updates the employee list
     */
    function submitForm(){
        let d = grabFormElements();
        updateEmployeeList(d);
        $("#employee-list").html(template(employees));
        document.getElementById("employee-form").reset();
        $("#myModal").modal("toggle");
    }

    /***
     * Grabs elements from the check in and puts it into an object
     * @param none
     * @returns new employee object
     */
    function grabFormElements(){
        let newEmployee = {};
        newEmployee.company_id = myCompanyId;
        newEmployee.role = "c_employee";
        newEmployee.first_name= $('#employee-first').val();
        newEmployee.last_name = $('#employee-last').val();
        newEmployee.phone_number = $('#employee-number').val();
        newEmployee.email = $('#employee-email').val();
        newEmployee.password = $('#employee-pw').val();
        newEmployee.confirm_password = $('#employee-confirm-pw').val();
        return newEmployee;
    }

    /**
     * @function findEmployee
     * @desc Find Specific Employee Given Employee ID within the Employee Array
     * @param {string} id id of employee.
     * @returns {string} Employee name
     */
    /*
    function findEmployee(id){
        for(let employee in employeeList) {
            if(employeeList.hasOwnProperty(employee)){
                if(employeeList[employee]._id === id){
                    return employeeList[employee];
                }
            }
        }
    }
    */

    $('#logoutButton').on('click',function(){
        localStorage.setItem('userState',0);
    });

});
