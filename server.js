var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var http = require('http').Server(app);


var index = require('./routes/index');
var apis = require('./routes/apis')(http);


//console.log(http);

//module.exports = http;
var port = 3007;

//view engine
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html' , require('ejs').renderFile);

//set static folder for angular/ css/ html

app.use(express.static(path.join(__dirname, 'client')));
//body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.use('/', index);
//apis
app.use('/api', apis);


app.get("/api")

app.get('/*',function(req,res){
	res.redirect('/');
});


/*app.listen(port, function () { 
    console.log("started the server on port " + port);
});*/


// socket.io connection


http.listen(port,function(){	
	console.log("server started on port " + port);
});





