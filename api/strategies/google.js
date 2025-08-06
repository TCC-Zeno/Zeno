/* eslint-disable no-undef */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
});
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.VITE_CLIENT_ID,
  clientSecret: process.env.VITE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));