// bcrypt
var bcrypt = require("bcrypt");

// express
var express = require("express");
var app = express();

var mysql = require('mysql');

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection');

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config');
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'));


//setting up the templating view engine
var reactViews = require('express-react-views');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
var options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));
/*var expressLayouts = require('express-ejs-layouts');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);*/

/**
 * import routes
 */ 
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var user = require('./routes/user');

/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator');
app.use(expressValidator());

// body-parser
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// requesting express to get data as text
app.use(bodyParser.text());

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override');

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}));

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'));
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/user', user);

/*****************************************************************/
// Setup social-login
var socialLoginClass    = require("social-login");

// Init
var socialLogin			= new socialLoginClass({
    app:	app,    // ExpressJS instance
    url:	'http://localhost:3000',  // Your root url
    onAuth:	function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
        
        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.
        
        findOrCreate({
            profile:	profile,        // Profile is the user's profile, already filtered to return only the parts that matter (no HTTP response code and that kind of useless data)
            property:	uniqueProperty, // What property in the data is unique: id, ID, name, ...
            type:		type            // What type of login that is: facebook, foursquare, google, ...
        }, function(user) {
            done(null, user);   // Return the user and continue
        });
    }
});

// Setup the various services:
socialLogin.use({
    facebook:	{
        settings:	{
            clientID:		config.socialLogin.facebook.clientID,
            clientSecret: 	config.socialLogin.facebook.clientSecret,
            authParameters:	{
                scope: 'read_stream,manage_pages'
            }
        },
        url:	{
            auth:		"/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback: 	"/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
            success:	'/',                        // Where to redirect the user once he's logged in
            fail:		'/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    },
    google:	{
        settings:	{}, // Google doesn't take any API key or API secret
        url:	{
            auth:		"/auth/google",
            callback: 	"/auth/google/callback",
            success:	'/',
            fail:		'/auth/google/fail'
        }
    },
    /*linkedin:	{
        settings:	{
            clientID: 		config.socialLogin.linkedin.clientID,
            clientSecret: 	config.socialLogin.linkedin.clientSecret,
            authParameters:	{
                scope: ['r_basicprofile', 'r_emailaddress', 'r_fullprofile', 'r_contactinfo', 'r_network', 'rw_nus']
            }
        },
        url:	{
            auth:		"/auth/linkedin",
            callback: 	"/auth/linkedin/callback",
            success:	'/',
            fail:		'/auth/linkedin/fail'
        }
    },
    twitter:	{
        settings:	{
            clientID: 		config.socialLogin.twitter.clientID,
            clientSecret: 	config.socialLogin.twitter.clientSecret
        },
        url:	{
            auth:		"/auth/twitter",
            callback: 	"/auth/twitter/callback",
            success:	'/',
            fail:		'/auth/twitter/fail'
        }
    },
    instagram:	{
        settings:	{
            clientID: 		config.socialLogin.instagram.clientID,
            clientSecret: 	config.socialLogin.instagram.clientSecret
        },
        url:	{
            auth:		"/auth/instagram",
            callback: 	"/auth/instagram/callback",
            success:	'/',
            fail:		'/auth/instagram/fail'
        }
    },
    github:	{
        settings:	{
            clientID: 		config.socialLogin.github.clientID,
            clientSecret: 	config.socialLogin.github.clientSecret
        },
        url:	{
            auth:		"/auth/github",
            callback: 	"/auth/github/callback",
            success:	'/',
            fail:		'/auth/github/fail'
        }
    },
    amazon:	{
        settings:	{
            clientID: 		config.socialLogin.amazon.clientID,
            clientSecret: 	config.socialLogin.amazon.clientSecret,
            authParameters:	{
                scope: ['profile', 'postal_code']
            }
        },
        url:	{
            auth:		"/auth/amazon",
            callback: 	"/auth/amazon/callback",
            success:	'/',
            fail:		'/auth/amazon/fail'
        }
    },
    dropbox:	{
        settings:	{
            clientID: 		config.socialLogin.dropbox.clientID,
            clientSecret: 	config.socialLogin.dropbox.clientSecret
        },
        url:	{
            auth:		"/auth/dropbox",
            callback: 	"/auth/dropbox/callback",
            success:	'/',
            fail:		'/auth/dropbox/fail'
        }
    },
    foursquare:	{
        settings:	{
            clientID: 		config.socialLogin.foursquare.clientID,
            clientSecret: 	config.socialLogin.foursquare.clientSecret
        },
        url:	{
            auth:		"/auth/foursquare",
            callback: 	"/auth/foursquare/callback",
            success:	'/',
            fail:		'/auth/foursquare/fail'
        }
    },
    imgur:	{
        settings:	{
            clientID: 		config.socialLogin.imgur.clientID,
            clientSecret: 	config.socialLogin.imgur.clientSecret
        },
        url:	{
            auth:		"/auth/imgur",
            callback: 	"/auth/imgur/callback",
            success:	'/',
            fail:		'/auth/imgur/fail'
        }
    },
    meetup:	{
        settings:	{
            clientID: 		config.socialLogin.meetup.clientID,
            clientSecret: 	config.socialLogin.meetup.clientSecret
        },
        url:	{
            auth:		"/auth/meetup",
            callback: 	"/auth/meetup/callback",
            success:	'/',
            fail:		'/auth/meetup/fail'
        }
    },
    // http://developer.wordpress.com/docs/oauth2/
    wordpress:	{
        settings:	{
            clientID: 		config.socialLogin.wordpress.clientID,
            clientSecret: 	config.socialLogin.wordpress.clientSecret
        },
        url:	{
            auth:		"/auth/wordpress",
            callback: 	"/auth/wordpress/callback",
            success:	'/',
            fail:		'/auth/wordpress/fail'
        }
    },
    tumblr:	{
        settings:	{
            clientID: 		config.socialLogin.tumblr.clientID,
            clientSecret: 	config.socialLogin.tumblr.clientSecret
        },
        url:	{
            auth:		"/auth/tumblr",
            callback: 	"/auth/tumblr/callback",
            success:	'/',
            fail:		'/auth/tumblr/fail'
        }
    }*/
});
/*****************************************************************/

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
});