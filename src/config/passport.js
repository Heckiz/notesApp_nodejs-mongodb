const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{

    //Match email user
    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {message:'Not User Found'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            console.log('true')
            return done(null, user);
        }else{
            console.log('false');
            return done(null, false, {message:'Incorrect Password'})
        }
    }
       
}));

passport.serializeUser((user, done) => {
      done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        done(err, user);
    })
});