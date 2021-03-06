const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { route } = require('./campgrounds');

router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync (users.register));

router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;