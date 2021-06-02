const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        uniqued: true
    },
    password : {
        type: String,
        required: true
    }
});

mongoose.model("User",UserSchema,"users");