const mongoose = require("mongoose");
const deletedUsersSchema = require("../schemas").deletedUser;

// deleted users model
module.exports = mongoose.model("deleted_users", deletedUsersSchema);