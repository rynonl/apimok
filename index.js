#!/usr/bin/env node

var server = require('./lib/server.js');
var spawn = require('child_process').spawn;

var argv = require('optimist')
	.usage('Run Jasmine tests with an Apimok server\nUsage: $0')
	.options({
		't' : {
			alias: 'target',
			describe: 'Target relative url for PhantomJs to run test suite',
			demand: true
		},
		'a' : {
			alias: 'app',
			describe: 'Path to application root',
			default: __dirname
		},
		'p' : {
			alias: 'port',
			describe: 'Port for Apimok server',
			default: 3001
		},
		'm' : {
			describe: 'Run server in manual standalone mode(no PhantomJs)'
		}
	}).argv;
	
server.start(argv.app, argv.port);

if(!argv.m){
	//Run tests in phantomjs
	var phantom = spawn('phantomjs', ['run-jasmine.js', 'http://localhost:' + argv.port + '/' + argv.target]);

	phantom.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	phantom.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	phantom.on('exit', function (code) {
	  console.log('Exiting');
	  process.exit();
	});
} else {
	console.log('Server running in manual standalone mode');
}