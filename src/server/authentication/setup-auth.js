const express = require("express");
const passport = require("passport");
const GooglePassportStrategy = require("passport-google-oauth20").Strategy;
const configs = require("../config");
const User = require("../data/user");
const cookieSession = require("cookie-session");

//Once we identify a user model, how do we convert this to a serialized value?
passport.serializeUser((user, done) => {
    done(null, user.token);
});

//Once we receive a serialized value, how do we get the user?
passport.deserializeUser(async(cookieValue, done) => {
    const user = await User.findUserByToken(cookieValue);
    if (user) {
        done(null, user);
    } else {
        done({
            type: "USER_NOT_AUTHENTICATED"
        });
    }
});


passport.use(new GooglePassportStrategy({
    clientID: configs.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: configs.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: configs.GOOGLE_OAUTH_REDIRECT_URL,
}, async function(accessToken, refreshToken, profile, done) {
    if (!profile) {
        done({
            type: "USER_NOT_AUTHENTICATED"
        }, null);
    }
    const userDetails = {
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos.length > 0 ? profile.photos[0].value : null
    }
    try {
        const user = await User.findOrCreateUser(userDetails);
        done(null, user);
    } catch (e) {
        console.error("Error while retrieving user after login");
        console.error(userDetails);
        console.error(e);
        done({
            type: "UNKNOWN_ERROR"
        }, null);
    }

}));

module.exports.configureSession = (app) => {
    app.use(cookieSession({
        maxAge: configs.SESSION_EXPIRY_TIME,
        keys: [configs.SESSION_COOKIE_SECRET]
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};