describe("ApiMok", function() {

	var server;

	beforeEach(function() {    
    spyOn(jQuery, 'ajax');
    server = new ApiMok();
  });

	it("should throw with empty params", function() {
		var mok = function(){
			server.mok();
		}

		expect(mok).toThrow();
	});

	it("should throw when no returnValue supplied", function(){
		var mok = function() {
			server.mok({url: {}});
		}

    expect(mok).toThrow();
	});

	it("should throw when no Url supplied", function() {
		var mok = function() {
			server.mok({returnValue: {}, verb: 'GET'});
		}

    expect(mok).toThrow();
  });

  it("should throw when no Verb supplied", function() {
		var mok = function() {
			server.mok({returnValue: {}, url: 'test'});
		}

    expect(mok).toThrow();
  });

  it("should not throw when proper params supplied and jQuery present", function() {
		var mok = function() {
			server.mok({returnValue: {}, url: 'test', verb: 'GET'});
		}

    expect(mok).not.toThrow();
  });  

  it("should attempt a POST request to Mok server", function() {
  	server.mok({returnValue: {}, url: 'test', verb: 'GET'});
  	
  	expect(jQuery.ajax).toHaveBeenCalled();
  	expect(jQuery.ajax.calls.length).toEqual(1);
  });

});