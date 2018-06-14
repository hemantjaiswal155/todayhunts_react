var express = require('express');
var app = express();

app.get('/', function(req, res) {
	req.getConnection(function(error, conn) {
		conn.query("SELECT * FROM user", function(err, rows, fields){
			if(err) {
				req.flash('error', err);
				res.render('users/List.jsx', {
					title: 'Users List', 
					data: ''
				});
			} else {
				if(rows.length > 0) {
					res.render( "users/List.jsx", {data: rows});
				} else {
					req.flash('error', err);
					res.render('users/List.jsx', {
						title: 'Users List', 
						data: ''
					});
				}
			}
		});
	});
});

// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('users/Add.jsx', {
		title: 'Add New User',
		username: '',
		pwd: '',
		fullname: '',
		email: '',
		dob:''	
	});
});

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('username', 'Username is required').notEmpty();
	req.assert('pwd', 'Password is required').notEmpty();	
	req.assert('fullname', 'Name is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    req.assert('dob', 'A valid dob is required').isDate();

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		var user = {
			username: req.sanitize('username').escape().trim(),
			pwd: req.sanitize('pwd').escape().trim(),
			fullname: req.sanitize('fullname').escape().trim(),
			email: req.sanitize('email').escape().trim(),
			dob: req.sanitize('dob').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO user SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/user/add.ejs
					res.render('users/Add.jsx', {
						title: 'Add New User',
						username: user.username,
						pwd: user.pwd,
						fullname: user.fullname,
						email: user.email,
						dob: user.dob					
					})
				} else {				
					req.flash('success', 'Data added successfully!')
					
					// render to views/user/add.ejs
					res.render('users/Add.jsx', {
						title: 'Add New User',
						username: '',
						pwd: '',
						fullname: '',
						email: '',
						dob:''
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('users/Add.jsx', { 
            title: 'Add New User',
            username: req.body.username,
            pwd: req.body.pwd,
            fullname: req.body.fullname,
            email: req.body.email,
            dob: req.body.dob
        })
    }
});



// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM user WHERE id = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'User not found with id = ' + req.params.id)
				res.redirect('/user')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('users/Edit.jsx', {
					title: 'Edit User', 
					//data: rows[0],
					id: rows[0].id,
					username: rows[0].username,
					pwd: rows[0].pwd,
					fullname: rows[0].fullname,
					email: rows[0].email,
					dob: rows[0].dob,					
				})
			}			
		})
	})
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('username', 'Username is required').notEmpty();
	req.assert('pwd', 'Password is required').notEmpty();
    req.assert('fullname', 'Name is required').notEmpty();
	req.assert('email', 'A valid email is required').isEmail();
	req.assert('dob', 'dob is required').isDate();

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		var user = {
			username: req.sanitize('username').escape().trim(),
			pwd: req.sanitize('pwd').escape().trim(),
			fullname: req.sanitize('fullname').escape().trim(),
			email: req.sanitize('email').escape().trim(),
			dob: req.sanitize('dob').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/user/add.ejs
					res.render('users/Edit.jsx', {
						title: 'Edit User',
						id: req.params.id, 
						username: req.body.username,
						pwd: req.body.pwd, 
						fullname: req.body.fullname,
						email: req.body.email, 
						dob: req.body.dob
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/user/add.ejs
					res.render('users/Edit.jsx', {
						title: 'Edit User',
						id: req.params.id, 
						username: req.body.username,
						pwd: req.body.pwd, 
						fullname: req.body.fullname,
						email: req.body.email, 
						dob: req.body.dob
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('users/Edit.jsx', { 
            title: 'Edit User',            
			id: req.params.id, 
			username: req.body.username,
			pwd: req.body.pwd, 
			fullname: req.body.fullname,
			email: req.body.email, 
			dob: req.body.dob
        })
    }
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
	console.log("delete: req.body: " + JSON.stringify(req.body));
  res.json(req.body);
	/*var user = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM user WHERE id = ' + req.params.id, user, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err);
				// redirect to users list page
				res.redirect('/user');
			} else {
				req.flash('success', 'User deleted successfully! id = ' + req.params.id);
				// redirect to users list page
				res.redirect('/user');
			}
		});
	});*/
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
