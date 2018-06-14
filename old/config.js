var config = {
	database: {
		host:	  'localhost', 	// database host
		user: 	  'root', 		// your database username
		password: '', 		// your database password
		port: 	  3306, 		// default MySQL port
		db: 	  'todayhunts' 		// your database name
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	},
	socialLogin: {
		facebook: {
			clientID: '1903845369848111',
			clientSecret: 'ead6bef08f9ef92e0ffdd4e6e3872f7f'
		}, 
		google: {
			clientID: '1047108856592-hg15nnnp70ng8r6le33poftv6l7r47l8.apps.googleusercontent.com',
			clientSecret: 'gwWYhpNNmM7NAQQqM3KGCAxy'
		}, 
		linkedin: {
			clientID: '',
			clientSecret: ''
		}, 
		twitter: {
			clientID: '',
			clientSecret: ''
		}, 
		instagram: {
			clientID: '',
			clientSecret: ''
		}, 
		github: {
			clientID: '',
			clientSecret: ''
		}, 
		amazon: {
			clientID: '',
			clientSecret: ''
		}, 
		dropbox: {
			clientID: '',
			clientSecret: ''
		}, 
		foursquare: {
			clientID: '',
			clientSecret: ''
		}, 
		imgur: {
			clientID: '',
			clientSecret: ''
		}, 
		meetup: {
			clientID: '',
			clientSecret: ''
		}, 
		wordpress: {
			clientID: '',
			clientSecret: ''
		}, 
		tumblr: {
			clientID: '',
			clientSecret: ''
		}
	}
}

module.exports = config