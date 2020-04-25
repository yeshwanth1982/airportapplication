var express = require('express')
var app = express()


var routes = require('./api/routes/routes') //importing route
routes(app)

var server = app.listen(3000, function () {
    'use strict'

    var host = server.address().address,
        port = server.address().port

    console.log(' Server is listening at http://%s:%s', host, port)
});
