const  express 				= require('express'),
		   bodyParser			= require('body-parser'),
			 config 				= require('./config/config'),
			 app 						= express(),
		   flash          = require("connect-flash"),
			 passport 			= require('passport'),
			 LocalStrategy  = require("passport-local"),
		   session        = require("express-session"),
		   methodOverride = require("method-override"),
		   morgan         = require('morgan')

		   User           = require("./models/user");


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));
// app.use(morgan('combined'))

app.use(session({
		secret: config.authentication.secret,
		resave: false,
		saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
		res.locals.currentUser = req.user;
		res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
		next();
});

require('./router')(app)



app.listen(config.port, () => {
 console.log(`Server has started on PORT: ${config.port}`)
})
