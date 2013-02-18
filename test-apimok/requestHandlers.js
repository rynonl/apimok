var handlers = require('./../lib/requestHandlers.js');
var pjson = require('./../package.json');
var store = require('./../lib/store.js');
var Mok = require('./../lib/mok.js');

module.exports = {
	shouldReturnClientLib: function(test){
		var res = {
			sendfile: function(file){
				this.file = file;
			}
		};

		handlers.clientLibHandler({}, res);

		test.equal('./apimok-' + pjson.version + '.js', res.file);

		test.done();
	},

	shouldAddMokHandler: function(test){
		var req = {};
		req.body = {};
		req.body.url = 'test';
		req.body.verb = 'GET';
		req.body.returnValue = {id:1};

		var res = {
			end: function() {
				//do nothing
			}
		}

		handlers.addMokHandler(req, res);

		var mok = store.get('test', 'GET');

		test.notEqual(undefined, mok);
		test.equal('test', mok.url);
		test.equal('GET', mok.verb);
		test.deepEqual({id:1}, mok.returnValue);

		store.removeAll();

		test.done();
	},

	shouldReturnResponse: function(test){
		var res = {
			output: '',
			write: function(str){
				this.output = this.output + str;
			},
			end: function(){
				//do nothing
			}
		};

		var req = {
			url: 'test',
			method: 'GET'
		}

		test.doesNotThrow(function() {
			handlers.mokResponseHandler(req, res)
		});

		test.equal('Mok not found', res.output);

		test.done();
	},

	shouldRemoveAllMoks: function(test){
		store.add(new Mok({
			url: 'test',
			verb: 'GET',
			returnValue: {id:1}
		}));

		var res = {
			end: function() { //do nothing 
			}
		}

		handlers.removeAllMoksHandler({}, res);

		test.equal(0, store.getAll().length);

		test.done();
	}
};