const User = require('../models/user')
const passport = require('passport')

module.exports = {

	async	loginPage (req, res){
			try {
				res.render('auth/login', {page_name: 'login'})
			}
			catch (err) {
				console.log(err)
			}
		},
//register page request
	async registerPage (req, res){
		try {
			res.render('auth/register', {page_name: 'register'})
		}
		catch (err) {
			console.log(err)
		}
	},
	async logout (req, res){
			try{
				req.logout()
				res.redirect('/login')
			}
			catch (err){

			}
	},

//user login
	async authenticate (req, res, next){
		try {
				passport.authenticate('local', function(err, user, info) {
						if (err) {
								return res.status(201).send({error: err})
						}
						if (!user) {
								return res.status(201).send({error: 'No User was found'})
						}
						req.logIn(user, function(err) {
								if (err) {
										return res.status(201).send({error: err})
								}
								return res.status(200).send({success: user, location: '/'});
						});
				})(req, res, next);
		}
		catch (err){
			console.log(err)
		}
	},
		//register new user
	async register (req, res){
			try{
					console.log('reached')
					User.register(req.body[0], req.body[1].password, function (err, doc) {
							if(err){
									console.log(err)
								return res.send({error: err})
							}else{
								res.render('landing', {page_name: 'landing'})
							}
		})
			}
			catch (error){
					console.log(error)
			}
	}
}