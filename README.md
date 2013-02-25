apimok
======

--Not quite production ready folks

Mock web API requests with Nodejs for use in front-end testing.  
Allows you to write tests that run all the way up to the API endpoint for deep integration testing.

Requirements
============

Nodejs and NPM.

Installation
============

apimok is available as a package via NPM.  This is the recommended way to install and update apimok.

    npm install apimok
    
Usage
=====

To pull the apimok client library into your test suite runner:

    <script src="http://localhost:3001/apimok-lib"></script>

This will automatically pull the client library version corresponding to the overall version of apimok. Note that the apimok server runs on port 3001 by default.  This will be configurable in a later release.

*Create a new mok*

    mok({
        url: 'api/test',
        verb: 'GET',
        returnValue: {
            id: 1,
            name: 'Test'
        }
    });

Now anytime your code hits the endpoint at 'api/test' using a 'GET' request, the object assigned to returnValue will be returned as Json.

*Remove moks*

    destroyMoks();
    
This will remove all moks that are currently stored in the server.  Generally part of a TearDown sequence.

Check out the /samples directory for some working examples.

Running Tests
=============

Currently, cross-domain requests are not supported.  This poses 2 limitations: 1) API requests must be relative to your application in order to be mocked.  (a call to "http://api.yourmain.com/user" cannot be mocked).  2) Your test specs must be included somewhere under your app's root direction(this is typical anyway).

A solution to #1 will be available in a later relase, as there is more involved than simply enabling cross-domain requests.  For #2, the apimok node module also serves as a static file server.  All you have to do is tell it where your application is when you start the server:

    cd /Path/to/apimok
    node index.js --app /Path/to/application --target /specrunner.html
    
(Better command line support coming soon).  To see all options just run _node index.js_.

Apimok will now spin up its server and run all the tests at http://localhost:3001/specrunner.html using PhantomJs.  Output will appear in the console.

If you prefer to run the server and browse to the output page in your browser, use the _-m_ flag.  With the server running, open your test output page in the browser by going to http://localhost:3001/path/to/testrunner to run your tests.

Current Limitations
===================

- Does not support cross-domain api requests so your test suite must run with the node server. 
- No command line support
- No integration with build servers(CruiseControl, Jenkins, etc)
- Only supports Json requests
