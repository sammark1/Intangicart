const passport = require("passport");
const GoogleStrategy= require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,   
        },
        function (acessToken, refreshToken, profile, cb) {
            //console.log(profile)
                User.findOne({ googleId: profile.id }, function (err, user) {
                  if (err) return cb(err);
                  if (user) {
                      //console.log(user)
                    return cb(null, user);
                  } else {
                    // we have a new user via OAuth!
                    const newUser = new User({ 
                      googleId: profile.id,
                      //name: profile.name,
                
                    });
                    newUser.save(function (err) {
                      if (err) return cb(err);
                      return cb(null, newUser);
                    });
                  }
                });
              }
            // a user has logged with OAuth 
        
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err,user) {
        console.log(user)
        done(err, user);
});
});