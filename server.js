/* ====== External Modules  ====== */
// Required External Modules
// all required code that is not our own
require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require ("method-override");


/* ====== Internal Modules  ====== */
// Required Internal Modules
// all code that is our code
const routes = require("./routes");

/* ====== Instanced Module  ====== */
// Create the Express app
const app = express();
require("./config/database");
require("./config/passport");
// returns an object that is our server

	
/* ====== Middleware  ====== */ 
//(app.use)




/* ====== System Variables  ====== */
const PORT = process.env.PORT || 4000; // full caps signify a config variable

/* ====== App Configuration  ====== */
// app.set
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "kjadsgfjbadfgorrr!",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/", routes.landingRT);
app.use("/", routes.shopRT);
app.use("/", routes.userRT);


/* ====== Routes  ====== */
app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>');
  });
	
/* ====== Server bind  ====== */
// bind the application to the port via app.listen(number, optional function to do after bind)
app.listen(PORT, function () {
  //FIXME CHANGE THE CONSOLE LOG!
	console.log(`i'm a little server live on port http://localhost:${PORT}`);
});
