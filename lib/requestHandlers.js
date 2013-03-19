
var Mok = require('./mok.js');
var mokStore = require('./store.js');
var processor = require('./processor.js');
var url = require('url');
var path = require('path');

module.exports.clientLibHandler = function(req, res){
	res.sendfile(path.resolve(__dirname + '/../apimok-client.js'));
};

module.exports.addMokHandler = function(req, res){
	mokStore.add(new Mok(
			req.body.url,
			req.body.verb,
			req.body.returnValue
		));
	res.end();
};

module.exports.mokResponseHandler = function(req, res){
	var urlParts = url.parse(req.url);

	var baseUrl = req.url.replace(urlParts.search, '').replace(urlParts.hash, '');

	var mok = processor.getMokResponse(baseUrl, req.method);
	if(mok){
		res.write(mok);
	} else {
		res.writeHead(404, {"Content-Type": "text/html"});
    res.write('Could not find resource: ' + baseUrl + '<br/>');
    res.write('Mok count: ' + mokStore.getAll().length + '<br/>');
    mokStore.getAll().forEach(function(mok){
    	res.write(' - ' + mok.url + '<br/>');
    });
	}
	res.end();
};

module.exports.removeAllMoksHandler = function(req, res){
	mokStore.removeAll();
	res.end();
}

module.exports.jUnitXmlReporter = function(req, res){
	res.sendfile(path.resolve(__dirname + '/junit_reporter.js'));
}