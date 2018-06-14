// bcrypt
var bcrypt = require("bcrypt");

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.render('Register.jsx');
});


// using express for post method
app.post('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		bcrypt.genSalt(10, function(errSalt, salt) {
			bcrypt.hash(req.body.pwd, salt, function(errHash, hash) {
				var body = req.body;
				var date = new Date();
				var currentDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
				var postVars = {username: body.username, password: hash, fullname: body.fullname, email: body.email, dob: body.dob, reg_date: currentDate};
				// insertion into MySQL
				conn.query("SELECT * FROM user WHERE username='"+body.username+"'", function(errSel, rows, fields){
					if(errSel) {
						req.flash('error', errSel);
						res.render('Register.jsx', {
							title: 'User Registration', 
							data: ''
						});
					} else {
						if(rows.length) {
							req.flash('error', errSel);
							res.render('Register.jsx', {
								title: 'User Registration', 
								data: ''
							});
						}
						else {
							conn.query("INSERT INTO user set ?", postVars, function(errInst, result) {
								if(errInst) {
									req.flash('error', errInst);
									res.render('Register.jsx', {
										title: 'User Registration', 
										data: ''
									});
								} else {
									res.redirect("/login");
								}
							});
						}
					}
				});
			});
		});
	});
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
