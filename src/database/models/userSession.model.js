const mongoose = require("mongoose");
const userSessionSchema = require("../schemas").userSession;

module.exports = mongoose.model("user_session", userSessionSchema);