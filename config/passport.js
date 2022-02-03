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
                    //console.log(profile)
                    // we have a new user via OAuth!
                    const newUser = new User({ 
                      googleId: profile.id,
                      name: profile.displayName,
                      userIcon: profile.photos[0].value,
                      userEmail: profile.emails[0].value,




                    });
                    //console.log(newUser)
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