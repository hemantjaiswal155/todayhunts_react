// bcrypt
var bcrypt = require("bcrypt");

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.render('Login.jsx');
});

app.post('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		var  body = req.body;
		conn.query("SELECT * FROM user WHERE username='"+body.username+"'",function(err, rows, fields) {
			//if(err) throw err
			if(err) {
				req.flash('error', err);
				res.render('Login.jsx', {
					title: 'User Login', 
					data: ''
				});
			} else {
				if(rows.length) {
					bcrypt.compare(body.pwd, rows[0].password, function(errLogin, resLogin) {
						if(resLogin) {
							res.redirect("/user");
						} else {
							req.flash('error', errLogin);
							res.render('Login.jsx', {
								title: 'User Login', 
								data: ''
							});
						}
					});
				} else {
					req.flash('error', err);
					res.render('Login.jsx', {
						title: 'User Login', 
						data: ''
					});
				}
			}
		})
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
