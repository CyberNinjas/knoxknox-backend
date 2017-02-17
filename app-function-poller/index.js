'use strict';

var $q = require('q');

module.exports = function(context){
    var cors_url = "https://www.google.com"
    validateToken(context).then(function(context){
        context.res =  {
            status: 200,
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Access-Control-Allow-Origin" : cors_url,
                "Content-Type" : "application/json"
            },
            body : { "status" : "alive"}
        }
        context.done();
    }, function(context){
        context.res =  {
            status: 403,
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Access-Control-Allow-Origin" : cors_url,
                "Content-Type" : "application/json"
            },
            body : { message : "Permission Denied: No valid token found." }
        }
        context.done();
    });
}

function validateToken(context){
  var deferred = q.defer();
  deferred.resolve(context);
  return deferred.promise;
}