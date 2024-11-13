const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Import the User model
const app = express();
const authRoutes = require('./routes/auth');
app.use(authRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use(dashboardRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use(dashboardRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://localhost/forum', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
