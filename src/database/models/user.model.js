const mongoose = require("mongoose");
const userSchema = require("../schemas").user;
// banner model
module.exports = mongoose.model("user", userSchema);