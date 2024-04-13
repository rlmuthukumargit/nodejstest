const mongoose = require("mongoose");
const activitySchema = require('../schemas').userActivity;

module.exports = mongoose.model("userActivity", activitySchema);