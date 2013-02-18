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

Currently, cross-domain requests are not supported.  This poses 2 limitations: 1) API requests must be relative to your application in order to be mocked.  (a call to "http://api.yourmain.com/user" cannot be mocked).  2) The apimok server must serve your test .js files.

A solution to #1 will be available in a later relase, as there is more involved than simply enabling cross-domain requests.  For #2, the apimok node module also serves as a static file server.  All you have to do is tell it where your applicatoin is when you start the server:

    cd /Path/to/apimok
    node index.js /Path/to/application
    
(Better command line support coming soon)

With the server running, simply open your test .html file to run your test suite.

Current Limitations
===================

- Does not support cross-domain api requests so your test suite must run with the node server. 
- No command line support
- No integration with build servers(CruiseControl, Jenkins, etc)
- Only supports Json requests
