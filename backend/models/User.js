const mongoose = require("mongoose");

// 🔥 DELETE cached model if it exists to prevent schema conflicts during hot reloads
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("User", UserSchema);
