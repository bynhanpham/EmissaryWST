
'use strict';
// Import Resources and Libs
let VisitorList = require('../../models/VisitorList');
let Employee = require('../../models/Employee');
let Appointment = require('../../models/Appointment');
let Company = require('../../models/Company')
let TextModel = require('../../notification/text.js')
/* handles route for getting the Company's visitor list */
module.exports.getCompanyVisitorListReq = function(req, res){
    let company_id = req.params.id;
    module.exports.getCompanyVisitorList(company_id, function(err_msg, result){
        if(err_msg) return res.status(404).json(err_msg);
        if(result  ===  null){
            result = new VisitorList();
            result.visitors = [];
            result.company_id = company_id;
            result.save(function(err){
                if(err) {
                    return res.status(400).json(err_msg);
                } else {
                    return res.status(200).json(result);
                }
            });
        } else {
            return res.status(200).json(result);
        }
    });
};


/* logic for getting the Company's visitor list */
module.exports.getCompanyVisitorList = function(company_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    VisitorList.findOne({company_id: company_id}, function(err, list){
        if(err) return callback({error: "Getting Visitor List"}, null);
        if(list === null) {
            list = new VisitorList();
            list.visitors=[];
            list.company_id = company_id;
        }
        list.save(function(err){
            if(err)return callback({error: "Error in saving"}, null);
            return callback(null, list);
        });
    });
};

/* handles route to delete visitor in the list*/
module.exports.deleteVisitorReq = function(req, res){
    let visitor_id = req.params.visitor_id;
    let company_id = req.params.company_id;
    module.exports.deleteVisitor(company_id, visitor_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

/* logic for deleting the visitor in the list */
module.exports.deleteVisitor = function(company_id, visitor_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    if(!visitor_id)
        return callback({error: "Please send visitorList id."}, null);
    VisitorList.findOneAndUpdate(
        {company_id: company_id},
        {$pull: {visitors:{_id:visitor_id}}},
        {safe: true, upsert: true, new:true}, function(err, data){
            if(err) return callback({error: "Can't update list"}, null);
            return callback(null, data);
        });
};

/* clear the list */
module.exports.deleteReq = function(req, res){
    let list_id = req.params.id;
    module.exports.delete(list_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

module.exports.delete = function(list_id, callback){
    if(!list_id)
        return callback({error: "Please send list id."}, null);
    VisitorList.findOne({_id: list_id}, function(err, list){
        if(err || list === null) return callback({error: "Can't find company"}, null);
        list.visitors=[];
        list.save(function(err){
            if(err) return callback({error: "Can't save"}, null);
            return callback(null, list);
        });
    });
};
module.exports.validateReq = function(req, res) {
    //console.log(req.body)
    module.exports.validate(req.body, function(err_msg, result){
        if(err_msg){  
            //console.log(err_msg);
            return res.status(400).json(err_msg);
        }
        return res.status(200).json(result);
    });
};
module.exports.validate = function(data, callback){
            
            var company_id = data.company_id;
            //console.log(company_id);
            Company.findOne({_id: company_id}, function(err, c){
                if(err || !c) {
                    return callback({error: "An error was encountered. Could not find company."}, null);
                }

                else {
                    //socket.join(company_id);
                    exports.getCompanyVisitorList(company_id, function(err_msg, result){
                        if(err_msg){
                            console.log('Error Getting Visitor List');
                            return callback({error: err_msg}, company_id);
                            //exports.notifyError(company_id, {error: err_msg});
                        } else {
                            return callback(null, result);
                        }

                    });
                }
            });
};
// This route will be called when a visitor checks in
module.exports.createReq = function(req, res) {
    module.exports.create(req.body, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

module.exports.create = function(param, callback){
    //required fields
    let company_id = param.company_id;
    let first_name = param.first_name;
    let last_name = param.last_name;
    let phone_number = param.phone_number;
    let checkin_time = param.checkin_time;

    //optional dic var
    let additional_info = param.additional_info;

    // find all the appointments for this visitor
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);

    let query =
    {
        company_id: company_id,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        date: {$gte:today, $lt: tomorrow}
    };

    Appointment.find(query, function(err, appointments) {
        if(err) {
            return callback({error: "An error was encountered. Could not find appointment."}, null);
        }

        let visitor =
        {
            company_id: company_id,
            last_name: last_name,
            first_name: first_name,
            phone_number: phone_number,
            checkin_time: checkin_time,
            additional_info: additional_info,
            appointments: appointments
        };

        VisitorList.findOne(
            {company_id: company_id},
            function(err, list) {
                if(err) {
                    return callback({error: "An error was encountered. Could not find appointment."}, null);
                }

                if(list === null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = company_id;
                }
                list.visitors.push(visitor);
                list.save(function(err){
                    if(err) {
                        return callback({error: "an error in saving"}, null);
                    } else {
                        var employees      = [{phone_number: "650-450-1182", email:"kissmyapp2017@gmail.com"}];
                        TextModel.sendText("Spaghetti Johnson", employees, function(){console.log('textsent')});
                        return callback(null, list);
                    }
                });
            }
        );
    });
};

