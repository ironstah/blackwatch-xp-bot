const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userId: String,
    experiencePoints: String
})

module.exports = mongoose.model("Account", dataSchema);
