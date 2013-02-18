var mokStore = require('./../lib/store.js');
var Mok = require('./../lib/mok.js');

module.exports = {
 setUp: function (callback) {  
 		var mok1 = new Mok('test', 'GET', {id:1});
		mokStore.add(mok1);
		var mok2 = new Mok('test2', 'GET', {id:2});
		mokStore.add(mok2);    
    
    callback();
  },
	tearDown: function (callback) {
    mokStore.removeAll();
    
    callback();
  },
  
  shouldRetrieveByUrlAndVerb: function(test){
  	var mok = new Mok('test', 'GET', {id:1});
		var newMok = mokStore.get('test', 'GET');

		test.deepEqual(newMok, mok);

		test.done();
	},

	shouldReturnUndefined: function(test){
		var newMok = mokStore.get('does-not-exist', 'GET');

		test.equal(undefined, newMok);

		test.done();
	},

	shouldReturnAll: function(test){
		list = mokStore.getAll();

		test.equal(2, list.length);

		test.done();
	}
}
