var mokStore = require('./../lib/store.js');
var Mok = require('./../lib/mok.js');
var processor = require('./../lib/processor.js');

module.exports = {  
  shouldReturnMokResponse: function(test){
  	var mok1 = new Mok('test', 'GET', {id:1});
		mokStore.add(mok1);

		var result = processor.getMokResponse('test', 'GET');

		test.equal('{"id":1}', result);

		mokStore.removeAll();

		test.done();
	},

	shouldReturnMokNotFound: function(test){
		var result = processor.getMokResponse('unknown', 'POST');

		test.equal('Mok not found', result);
		test.done();
	}
}