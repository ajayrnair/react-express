const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.model(
    'users',
    new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: String,
        token: {
            type: String,
            unique: true,
            required: true
        }
    })
);