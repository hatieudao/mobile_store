const express = require('express');
const passport = require("../../auth/passport");
const router = express.Router();

const authController = require('../../controllers/auth.controller');

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {errorLogin: req.query.errorLogin !== undefined});
});

router.post('/login',
    passport.authenticate('local',{ successRedirect: '/',
        failureRedirect: '/login?errorLogin' }),
    function (req, res) {
        if (req.user)
            res.redirect('/');
        else
            res.redirect('/login');
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', authController.register);

module.exports = router;
