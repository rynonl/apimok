var list = [];

module.exports.add = function(mok){
	list.push(mok);
}

module.exports.get = function(url, verb){
	var mok;

	list.forEach(function(possible){
		if(possible.url === url && possible.verb == verb){
			mok = possible;
		}
	});

	return mok;
}

module.exports.getAll = function(){
	return list;
}

module.exports.removeAll = function() {
	list = [];
}