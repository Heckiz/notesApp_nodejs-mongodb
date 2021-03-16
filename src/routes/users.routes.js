const {Router} = require('express');
const router=Router();
const {renderSignUpForm,renderSigninForm,logout,signin,signup} = require('../controllers/users.controller')

//SIGNUP
router.get('/users/signin',renderSigninForm);
router.post('/users/signin',signin);

//SIGNUP
router.get('/users/signup',renderSignUpForm);
router.post('/users/signup',signup);

//LOGOUT
router.get('/users/logout',logout);

module.exports = router;