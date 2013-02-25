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
			default: 'Current directory (' + __dirname + ')'
		},
		'p' : {
			alias: 'port',
			describe: 'Port for Apimok server',
			default: 3001
		}
	}).argv;
	
server.start(argv.app, argv.port);

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