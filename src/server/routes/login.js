const express = require("express");
const router = express.Router();
const passport = require("passport");

//The first time the user wants to sign in using Google oAuth
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

//After user gives permission, and google redirects the user back to redirect url
router.get("/google/callback", passport.authenticate("google"), (req, resp) => {
    resp.redirect("/");
});

router.get("/signout", (req, resp) => {
    req.logout();
    resp.redirect("/");
})

router.get("/user", (req, resp) => {
    console.log(req.user);
    resp.json({
        user: req.user
    });
})

module.exports = router;