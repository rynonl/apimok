describe("ApiMok", function() {

	beforeEach(function() {    
    spyOn(jQuery, 'ajax');
  });

	it("should throw with empty params", function() {
		var mok = function(){
			Mok();
		}

		expect(mok).toThrow();
	});

	it("should throw when no returnValue supplied", function(){
		var mok = function() {
			Mok({url: {}});
		}

    expect(mok).toThrow();
	});

	it("should throw when no Url supplied", function() {
		var mok = function() {
			Mok({returnValue: {}, verb: 'GET'});
		}

    expect(mok).toThrow();
  });

  it("should throw when no Verb supplied", function() {
		var mok = function() {
			Mok({returnValue: {}, url: 'test'});
		}

    expect(mok).toThrow();
  });

  it("should not throw when proper params supplied and jQuery present", function() {
		var mok = function() {
			Mok({returnValue: {}, url: 'test', verb: 'GET'});
		}

    expect(mok).not.toThrow();
  });  

  it("should attempt a POST request to Mok server", function() {
  	Mok({returnValue: {}, url: 'test', verb: 'GET'});
  	
  	expect(jQuery.ajax).toHaveBeenCalled();
  	expect(jQuery.ajax.calls.length).toEqual(1);
  });

});