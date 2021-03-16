const passport = require('passport');

const User = require("../models/User");

userCtrl = {}

//SIGNUP
userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Password no do match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' })
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            email,
            name
        })
    }
    else {
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({ email, name, password });
            newUser.password = await newUser.encryptPassword(password)
            console.log(newUser);
            await newUser.save();
            res.redirect('/users/signin')
        }
    }

};


//SIGNIN
userCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})

//LOGOUT
userCtrl.logout = (req, res) => {
    req.logout;
    req.flash('success_msg', 'Your are logged out now')
    res.redirect('/users/signin')
};
module.exports = userCtrl;