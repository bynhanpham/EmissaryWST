/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
    var r = require;
    app.use(r('./routes/home'));
    app.use('/api/form'         , r('./routes/form'));
    app.use('/api'              , r('./routes/theme'));
    app.use('/api/employee'     , r('./routes/employee'));
    app.use('/api/patient'      , r('./routes/patientqueue'));
    app.use('/api/companies'    , r('./routes/company'));
    app.use('/api/appointments'  , r('./routes/appointment'));
};
