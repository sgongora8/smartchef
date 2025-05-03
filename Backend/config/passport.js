const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');   


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      console.log('Deserialized user:', user?.email);
      done(null, user);
    })
    .catch(err => done(err));
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        user = await new User({
          googleId: profile.id,
          username: profile.displayName,
          email,
          favorites: []
        }).save();
        console.log('New user created via Google:', email);
      } else {
        console.log('Existing user logged in:', email);
      }

      done(null, user);
    } catch (err) {
      console.error('Google OAuth error:', err);
      done(err, null);
    }
  }
));

module.exports = passport;
