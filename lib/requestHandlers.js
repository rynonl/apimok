
var Mok = require('./mok.js');
var mokStore = require('./store.js');
var processor = require('./processor.js');
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
	var mok = processor.getMokResponse(req.url, req.method);
	if(mok){
		res.write(mok);
	} else {
		res.writeHead(404, {"Content-Type": "text/plain"});
    res.write('Could not find resource: ' + req.url);
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