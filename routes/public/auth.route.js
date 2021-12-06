const express = require('express');
const passport = require("../../auth/passport");
const router = express.Router();

const authController = require('../../controllers/auth.controller');

/* GET home page. */
router.get('/login', authController.login);

router.post('/login',
    passport.authenticate('local',{ successRedirect: '/',
        failureRedirect: '/login?errorLogin' }),authController.loginP);

router.get('/logout', authController.logout);

router.get('/register', authController.register);

router.post('/register', authController.registerP);

module.exports = router;
