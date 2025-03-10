'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.hostname,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.hostname);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.status(200).send('Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    console.log("5 -- For Save");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    res.status(200).send('Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = async (req, res) => {
  console.log("5 -- For Execute");	
  console.log("4");	
  console.log("3");	
  console.log("2");	
  console.log("1");	
  
  try {
    const requestBody = req.body.inArguments[0];
    const {accountSid, authToken, to, messagingService, body} = requestBody;
    console.log(`requestBody: ${JSON.stringify(requestBody)}`);
    console.log({ 
      body,
      messagingServiceSid: messagingService,
      to
    });
    const client = require('twilio')(accountSid, authToken); 
    const result = await client.messages.create({ 
      body,
      messagingServiceSid: messagingService,
      to
    });
    console.log(`SMS Result: ${JSON.stringify(result)}`);
    const {sid} = result;

    res.status(200).send({sid});
  } catch (e) {
    console.error(`An error has occur when executing. \n${e}`);
    res.status(401).send(e);
  }
};

exports.testSave = async (req, res) => {
  try {
    return await exports.execute(req, res);
  } catch (e) {
    console.error(`An error has occur when executing. \n${e}`);
    res.status(401).send(e);
  }
}


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

  console.log("5 -- For Publish");	
  console.log("4");	
  console.log("3");	
  console.log("2");	
  console.log("1");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
//     logData(req);
res.status(200).send('Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("5 -- For Validate");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Validated: "+req.body.inArguments[0]);       
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.status(200).send('Validate');
};
