var CONSTANTS = require('./CONSTANTS');

var db = require('oracledb');
var dbconfig = require('./dbconfig.js');
var conAttributes = {
	    user: dbconfig.user,
	    password: dbconfig.password,
	    connectString : dbconfig.connectString
	};

var get = function(req, res, query,context,type,io){	
	 db.getConnection(conAttributes)
     .then(function(conn) {
         return conn.execute(query)
             .then(function(result) {
            	if(context == CONSTANTS.API_CONTEXT){
            		res.status(200).json(result);
            	}
            	else if(context == CONSTANTS.SOCKET_CONTEXT){
            		if(io!=null){
            			io.emit(type, result);
            			res.status(200).send();
            		}
            	}
                
                 return conn.close();
             }).catch(function(err) {
                 res.status(500).json({
                     status: 500,
                     message: 'Error in retrieving the results',
                     detailed_message: err.message
                 });
                 return conn.close();
             });
     }).catch(function(err) {
         res.status(500).send(
             JSON.stringify({
                 status: 500,
                 message: 'Error in connecting to DB',
                 detailed_message: err.message
             }));
         return conn.close();
     });
}

var Repository = {
	get : get	
		
}


module.exports = Repository;