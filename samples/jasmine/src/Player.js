function Player() {
	this.loaded = false;
	this.updating = false;
	this.deleting = false;
	this.adding = false;

	this.load = function(id) {
		var _me = this;

	  $.ajax({
	  	url: '/api/player/' + id,
	  	type: 'GET',
	  	dataType: 'json',
	  	success: function(response) {
	  		_me.id = response.id;
	  		_me.name = response.name;
	  		_me.loaded = true;
	  	}
	  });
	};

	this.update = function() {
		var _me = this;
		this.updating = true;

		$.ajax({
			url: '/api/player/' + _me.id,
	  	type: 'POST',
	  	data: JSON.stringify(_me),
	  	dataType: 'json',
	  	success: function(response) {
	  		if(!response.success){
	  			throw "Player not updated";
	  		} else {
	  			_me.updating = false;
	  		}
	  	}
		});
	};

	this.delete = function() {
		var _me = this;
		this.deleting = true;

		$.ajax({
			url: '/api/player/' + _me.id,
	  	type: 'DELETE',
	  	dataType: 'json',
	  	success: function(response) {
	  		if(!response.success){
	  			throw "Player not deleted";
	  		} else {
	  			_me.deleting = false;
	  		}
	  	}
		});
	};

	this.add = function() {
		var _me = this;
		this.adding = true;

		$.ajax({
			url: '/api/player/',
	  	type: 'PUT',
	  	data: JSON.stringify(_me),
	  	dataType: 'json',
	  	success: function(response) {
	  		if(!response.success){
	  			throw "Player not added";
	  		} else {
	  			_me.id = response.id;
	  			_me.adding = false;
	  		}
	  	}
		});
	};
}
