const express = require('express');
const router = express.Router();

const resetPasswordController = require('../../controllers/resetPassword.controller');

router.get('/', (req, res) => {
  res.render('login/reset-password', { title: 'Forgot Password' });
});
router.get('/verify/:token', resetPasswordController.verifyToken);
router.post('/new', resetPasswordController.updateNewPassword);
router.post('/', resetPasswordController.resetPassword);
module.exports = router;
