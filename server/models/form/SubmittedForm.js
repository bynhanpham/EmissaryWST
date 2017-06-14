/**
 * @file Schema for submitted forms
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let submittedForm = new mongoose.Schema({
    form : {type: Object},
    firstName : {type: String},
    lastName : {type: String},
    patientEmail : {type: String},
    date : {type: Date, default: Date.now},
    _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }
});

module.exports = mongoose.model('SubmittedForm', submittedForm);
