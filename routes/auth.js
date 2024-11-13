const User = require('../models/User');
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Registration route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.render('register', { error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;
