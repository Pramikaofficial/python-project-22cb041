const Post = require('../models/Post');
const express = require('express');
const router = express.Router();

// Dashboard route
router.get('/dashboard', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.send(err);
        }
        res.render('dashboard', { posts: posts });
    });
});

// Like route
router.post('/like/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            return res.send(err);
        }
        if (!req.user.likes.includes(post._id)) {
            post.likes++;
            post.save();
            req.user.likes.push(post._id);
            req.user.save();
        }
        res.redirect('/dashboard');
    });
});

module.exports = router;
const User = require('../models/User');
const express = require('express');
const router = express.Router();

// Profile update route (GET)
router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});

// Profile update route (POST)
router.post('/profile', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            return res.send(err);
        }
        user.username = req.body.username || user.username;
        user.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/profile');
        });
    });
});

module.exports = router;
