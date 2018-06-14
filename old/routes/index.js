var express = require('express');
var app = express();

app.get('/', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('Login.jsx');
});

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
