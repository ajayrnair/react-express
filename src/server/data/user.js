const mongoose = require("mongoose");
const User = mongoose.model('users');
const UUID = require("uuid");

module.exports = {
    findOrCreateUser: async function(userDetails) {
        let user = await this.findUserByEmail(userDetails.email);
        if (user === null) {
            userDetails.token = UUID.v4();
            user = await this.createUser(userDetails);
        }
        return user;
    },
    findUserByToken: function(token) {
        return User.findOne({
            token
        });
    },
    findUserByEmail: function(email) {
        return User.findOne({
            email
        });
    },
    createUser: async function(userDetails) {
        const user = new User(userDetails);
        return await user.save();
    }
};