//var express = require('express')
const getCSV = require('get-csv');
var oracledb = require('oracledb')
var config = require('../../config')

let url = config.url;

var connStr = {
    'user': config.user,
    'password': config.password,
    'connectString': config.connectString
}


exports.healthcheck = function(req, res){
    return res.send('Success!')
}

exports.processdata = function(req, res){

    getCSV(url,{headers: false})
    .then(rows =>
       // console.log("row")
       processd(rows)
        //console.log(rows)
        );
}

function processd(rows)
{
    //console.log("----");
    //console.log(rows);
    for(var i=0; i< rows.length; i++)
    {
 // values.push([rows[i].name,jsondata[i].age]);
  console.log(rows[i][1]);

  // insert values into Oracle DB

  oracledb.getConnection(connStr, function(err, connection) {
    if (err) {
      // Error connecting to DB
      res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
          }));
      return;
    }
    var bindvars = {
      p_airlineid: rows[i][0], // Bind type is determined from the data.  Default direction is BIND_IN
      p_name: rows[i][1],
      p_alias: rows[i][2],
      p_iata: rows[i][3],
      p_icao: rows[i][4],
      p_callsign: rows[i][5],
      p_country: rows[i][6],
      p_active: rows[i][7],
      p_return: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };

    connection.execute('BEGIN PROC_ADD_DATA(:p_airlineid,:p_name,:p_alias,:p_iata,:p_icao,:p_callsign,:p_country,:p_active,:p_return); END;',bindvars,{
        outFormat: oracledb.OBJECT // Return the result as Object
      }, function(err, result) {
        if (err || result.outBinds.length < 1) {
          res.set("Content-Type", "application/json");
          var status = err ? 500 : 404;
          res.status(status).send(
            JSON.stringify({
              status: status,
              message: err
                ? "Error while inserting datae"
                : "error while inseting data",
              detailed_message: err ? err.message : ""
            })
          );
        } else {
          // res.contentType('application/json').status(200).send(JSON.stringify(result.rows));

          res.json({
            success: true
         });
        }
        // Release the connection

        doRelease(connection);
      }
    );
  });

  // end inserting values into ZOracle DB


}
}

function doRelease(connection)
{
  connection.close(
    function(err)
    {
        if (err) {
            console.error(err.message)
        } else {
            console.log('Connection released')
        }
    });
}

