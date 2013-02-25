var handlers = require('./requestHandlers.js');
var express = require("express");
var fs = require('fs');

module.exports = {
	start: function(staticDir, port) {

		var app = express();

		//configure static file server
		app.configure(function(){	
			app.use(express.bodyParser());
			app.use(express.static(staticDir)); 
		});

		//Serve client library
		app.get('/apimok-lib', handlers.clientLibHandler);

		//JUnit Xml Jasmine Reporter
		app.get('/junit-xml-reporter', handlers.jUnitXmlReporter);

		//Add new mok
		app.post('/_mok', handlers.addMokHandler);

		//Remove all moks
		app.post('/_removeAllMoks', handlers.removeAllMoksHandler);

		//Handle mok responses
		app.get('/*', handlers.mokResponseHandler);
		app.post('/*', handlers.mokResponseHandler);
		app.put('/*', handlers.mokResponseHandler);
		app.delete('/*', handlers.mokResponseHandler);

		app.listen(port);
	}
}