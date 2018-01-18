const mongoose = require("mongoose");
const configs = require("../config");

mongoose.connect(configs.MONGODB_CONNECTION);

//Import the models
require("./models/user.js");