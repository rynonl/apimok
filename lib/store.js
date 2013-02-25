var list = [];

module.exports = {
	add: function(mok){
		list.push(mok);
	},

	get: function(url, verb){
		var mok;

		list.forEach(function(possible){
			if(possible.url === url && possible.verb == verb){
				mok = possible;
			}
		});

		return mok;
	},

	getAll: function(){
		return list;
	},

	removeAll: function() {
		list = [];
	},
};
