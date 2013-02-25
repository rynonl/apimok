function ApiMok(port) {
	var port = port || 3001;

	this.mok = function(params){
		if(!params.url){
		throw "Endpoint Url not supplied";
		}
		if(!params.returnValue){
			throw "Endpoint return value not supplied";
		}
		if(!params.verb){
			throw "Request method not supplied";
		}
		if(!jQuery){
			throw "jQuery not found";
		}

		this.requestParams = {
				url: params.url,
				verb: params.verb,
				returnValue: params.returnValue
		};

		//Make request to Mok server
		jQuery.ajax({
			url: 'http://localhost:' + port + '/_mok/',
			type: 'POST',
			async: false,
			contentType: 'application/json',
			data: JSON.stringify(this.requestParams),
			error: function(xhr, status, err){
				throw status;
			}
		});
	};

	this.destroyAll = function(){
		jQuery.ajax({
			url: 'http://localhost:' + port + '/_removeAllMoks/',
			type: 'POST',		
			async: false,
			error: function(xhr, status, err){
				throw status;
			}
		});
	};
}

