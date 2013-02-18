var store = require('./store.js');

module.exports.getMokResponse = function(url, method) {
	var mok = store.get(url, method);
	if(mok) {
		return JSON.stringify(mok.returnValue);
	} else {
		return "Mok not found";
	}
}