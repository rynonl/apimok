var Mok = require('./../lib/mok.js');

module.exports = {
	shouldConstruct: function(test){
		var retObj = {id:1};
		var newMok = new Mok('test', 'GET', retObj);

		test.equal(newMok.url, 'test');
		test.equal(newMok.verb, 'GET');
		test.equal(newMok.returnValue, retObj);

		test.done();
	}
};