var express = require('express');
var router = express.Router();
var db = require('oracledb');
var dbconfig = require('./dbconfig.js');
var Repository = require('./Repository');
var http = require('../server');


//console.log(http);
var io = null;
var CONSTANTS = require('./CONSTANTS');
console.log(CONSTANTS);

//console.log(io);
var conAttributes = {
    user: dbconfig.user,
    password: dbconfig.password,
    connectString : dbconfig.connectString
};

//context = "API"
router.get('/slas', function (req, res, next) { 
	query = 'select  * from Sla_delivery_log where rownum <= 100 order by SLA_DELIVERY_TS desc';
	return Repository.get(req,res,query,CONSTANTS.API_CONTEXT,CONSTANTS.CHANGE_IN_SLA,io);

});

router.get('/slas/latest/summary', function(req,res,next){
	query = 'select * from latest_sla_smry_v order by SLA_DELIVERY_TS desc';
	return Repository.get(req,res,query,CONSTANTS.API_CONTEXT,CONSTANTS.CHANGE_IN_LATEST_SUMM,io);
	
});

router.get('/slas/daily/summary', function(req,res,next){
	query = 'select * from daily_sla_smry_v order by SLA_DELIVERY_TS desc';
	return Repository.get(req,res,query,CONSTANTS.API_CONTEXT,CONSTANTS.CHANGE_IN_DAILY_SUMM,io);
	
});

router.get('/slas/integration/flow', function(req,res,next){
	query = 'select * from Sla_intg_flow_depend_config order by SLA_CONFIG_KEY desc';
	return Repository.get(req,res,query,CONSTANTS.API_CONTEXT,CONSTANTS.CHANGE_IN_INTEGRATION_FLOW,io);
	
});




//module.exports = router;
exports.CONTANTS = CONSTANTS;


module.exports = function(http){
	//console.log(http);
	var io = require('socket.io')(http);
	
	io.on('connection', (socket) => {
		  //console.log('user connected');		  
		  socket.on('disconnect', function(){
		    //console.log('user disconnected');
		  });		    
		});
	
	
	//SOCKET.IO 
	router.get('/slas/db/change', function(req,res,next){
		query = 'select  * from Sla_delivery_log where rownum <= 100 order by SLA_DELIVERY_TS desc';
		return Repository.get(req,res,query,CONSTANTS.SOCKET_CONTEXT,CONSTANTS.CHANGE_IN_SLA,io);
		
	});


	router.get('/slas/latest/summary/db/change', function(req,res,next){
		query = 'select * from latest_sla_smry_v order by SLA_DELIVERY_TS desc';
		return Repository.get(req,res,query,CONSTANTS.SOCKET_CONTEXT,CONSTANTS.CHANGE_IN_LATEST_SUMM,io);
		
	});

	router.get('/slas/daily/summary/db/change', function(req,res,next){
		query = 'select * from daily_sla_smry_v order by SLA_DELIVERY_TS desc';
		return Repository.get(req,res,query,CONSTANTS.SOCKET_CONTEXT,CONSTANTS.CHANGE_IN_DAILY_SUMM,io);
		
	});

	router.get('/slas/integration/flow/db/change', function(req,res,next){
		query = 'select * from Sla_intg_flow_depend_config order by SLA_CONFIG_KEY desc';
		return Repository.get(req,res,query,CONSTANTS.SOCKET_CONTEXT,CONSTANTS.CHANGE_IN_INTEGRATION_FLOW,io);
		
	});

	
	return router;
}
