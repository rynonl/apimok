var express = require("express");
var fs = require('fs');
var handlers = require('./lib/requestHandlers.js');

var app = express();

//configure static file server
app.configure(function(){	
	app.use(express.bodyParser());
	app.use(express.static('/Users/roneill/dev/apimok')); //TODO: This value should be a startup param
});

//Serve client library
app.get('/apimok-lib', handlers.clientLibHandler);

//Add new mok
app.post('/_mok', handlers.addMokHandler);

//Remove all moks
app.post('/_removeAllMoks', handlers.removeAllMoksHandler);

//Handle mok responses
app.get('/*', handlers.mokResponseHandler);
app.post('/*', handlers.mokResponseHandler);
app.put('/*', handlers.mokResponseHandler);
app.delete('/*', handlers.mokResponseHandler);

app.listen(3001);