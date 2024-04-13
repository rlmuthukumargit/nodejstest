const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { STATUS } = require('../../constants'); 

let StorySchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  title: {
    type: String,
    required: true,
    trim: true,
    index: true, 
    //max:10
  },  
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    index: true
  },  
  description: {
    type: String,
    required: true,
    trim: true,
    index: true
  },  
  location: {
    type: String,
    required: true,
    trim: true,
    index: true
  },  
  date: {
    //type: Date,
    type: Date,
    required: true,
    trim: true,
    index: true
  },  
  status: {
    type: Number, 
    default: 1
  }, 
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },


  
}, {
  timestamps: true
});


module.exports = StorySchema;
