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
    findUserByToken: async function(token) {
        return await User.findOne({
            token
        });
    },
    findUserByEmail: async function(email) {
        return await User.findOne({
            email
        });
    },
    createUser: async function(userDetails) {
        const user = new User(userDetails);
        return await user.save();
    }
};