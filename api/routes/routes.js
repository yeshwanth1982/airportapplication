'use strict'
module.exports = function(app) {
  var CtrlUpload = require('../controller/dataupload')
  
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
})

  app.route('*/healthcheck')
  .get(CtrlUpload.healthcheck)

  app.route('*/processdata')
  .get(CtrlUpload.processdata)

  
 


 

   




};