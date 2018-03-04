const authenticationService = require('./controllers/AuthenticationController')
const isAuthenticated = require('./policies/isAuthenticated')
const landingPage = require('./controllers/landing')
const orders = require('./controllers/orders')
const passport = require('passport')

module.exports = (app) => {
		/* ===================================================== */
										/* WORK PROCESS ROUTES */
		/* ===================================================== */
		//landing page after login
		app.get('/', landingPage.landing)

		/* ===================================================== */
											/* ORDERS ROUTES */
		/* ===================================================== */
		app.get('/orders', orders.ordersPage)
		app.get('/ordersGetter', orders.ordersGetter)
		app.post('/order', orders.newOrder)
		app.put('/order/modify', orders.modifyOrder)
		app.post('/order/remove', orders.removeOrder)
		/* ===================================================== */
											/* STOCK ROUTES */
		/* ===================================================== */


		/* ===================================================== */
									/* AUTHENTICATION ROUTES */
		/* ===================================================== */
		//open login page
		app.get('/login', authenticationService.loginPage)
		//open register page
		app.get('/register', authenticationService.registerPage)
		//logout user
		app.get('/logout', authenticationService.logout)
		//login user
		app.post('/login', authenticationService.authenticate)
		//register user
	  app.post('/register', authenticationService.register)
}
