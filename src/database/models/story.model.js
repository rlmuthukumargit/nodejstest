const mongoose = require("mongoose");
const storySchema = require("../schemas").story;
// banner model
module.exports = mongoose.model("story", storySchema);