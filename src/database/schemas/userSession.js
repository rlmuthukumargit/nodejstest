const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
    required: true,
  },  
  userType: { // user = 1, admin = 2  
    type: Number,
    trim: true,
    default:1
  },
  isActive:{
    type: Boolean,
    required: true
  },  
  token: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true
});