Apimok
======

Mock web API requests with Nodejs for use in front-end testing.  
Allows you to write tests that run all the way up to the API endpoint for deep integration testing.

Supports any browser-based Javascript testing framework.  Currently has command line(via PhantomJS) support for Jasmine.

Requirements
============

Nodejs, PhantomJS, and NPM.

Installation
============

apimok is available as a package via NPM.  This is the recommended way to install and update Apimok.

    npm install apimok
    
Usage
=====

To pull the apimok client library into your test runner:

    <script src="/apimok-lib"></script>

This will automatically pull the current client library into your page. Note that the apimok server runs on port 3001 by default(configurable from command line using the -p flag).

If you are running Jasmine, use the following as a template for your SpecRunner.html.  It pulls in both the client library and the JUnitXmlReport(required).

    <!DOCTYPE HTML>
    <html>
    <head>
      <title>Jasmine Spec Runner</title>

      <link rel="stylesheet" type="text/css" href="lib/jasmine-1.3.1/jasmine.css">
      <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine.js"></script>
      <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine-html.js"></script>  
      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

      <!-- ApiMok library REQUIRED-->
      <script type="text/javascript" src="/apimok-lib"></script>
      
      <!-- JUnitXmlReporter REQUIRED -->
      <script type="text/javascript" src="/junit-xml-reporter"></script>

      <!-- include source files here... -->
      <script type="text/javascript" src="src/Player.js"></script>

      <!-- include spec files here... -->
      <script type="text/javascript" src="spec/PlayerSpec.js"></script>

      <script type="text/javascript">
      (function() {    

        var currentWindowOnload = window.onload;

        window.onload = function() {
          if (currentWindowOnload) {
            currentWindowOnload();
          }
          execJasmine();
        };

        function execJasmine() {
          jasmine.getEnv().addReporter(new jasmine.TrivialReporter());  //REQUIRED
          jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter()); //REQUIRED
          jasmine.getEnv().execute();
        }

       })();
       </script>

    </head>
    <body>
    </body>
    </html>


*Create a new mok*

    var mokServer = new ApiMok(port[optional]);
    
    mokServer.mok({
        url: 'api/test',
        verb: 'GET',
        returnValue: {
            id: 1,
            name: 'Test'
        }
    });
    
    mokServer.mok({
        url: 'api/test',
        verb: 'POST',
        returnValue: {
            success: true
        }
    });

Now anytime your code hits the endpoint at 'api/test' using a 'GET' request, the object assigned to returnValue will be returned as Json.  Same with the POST below it.

*Remove moks*

    mokServer.destroyMoks();
    
This will remove all moks that are currently stored in the server.  Generally part of a TearDown sequence.

Check out the /samples directory for some working examples.

Running Tests
=============

Currently, cross-domain requests are not supported.  This poses 2 limitations: 1) API requests must be relative to your application in order to be mocked.  (a call to "http://api.yourmain.com/user" cannot be mocked).  2) Your test specs must be included somewhere under your app's root direction(this is typical anyway).

A solution to #1 will be available in a later relase, as there is more involved than simply enabling cross-domain requests.  For #2, the apimok node module also serves as a static file server.  All you have to do is tell it where your application is when you start the server:

    cd /path/to/application
    apimok --with jasmine --target app-test/specrunner.html
    
To see all options run _apimok_.

Apimok will now spin up its server and run all the tests at http://localhost:3001/app-test/specrunner.html using PhantomJs.  Output will appear in the console.

If you prefer to run the server and browse to the output page(or you are using a framework that is NOT Jasmine) in your browser, use the _-m_ flag.  With the server running, open your test output page in the browser by going to http://localhost:3001/path/to/testrunner to run your tests.

Current Limitations
===================

- Does not support cross-domain api requests so your test suite must run with the node server. 
- Only supports Json responses.

Coming In Later Releases
========================

- Support for more testing frameworks in the command line
- Integration with common CI servers(CruiseControl, Jenkins)
