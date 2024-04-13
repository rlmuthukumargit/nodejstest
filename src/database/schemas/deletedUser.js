const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PLATFORM_TYPE } = require('../../constants'); 

let UserSchema = new Schema({

mobileNumber: {
    type: String,
    required: false,
    trim: true,
    index: true, 
    //max:10
  },  
  emailId: {
    type: String,
    trim: true
  }, 
  password: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  }, 
  userType: { // user = 1, admin = 2, subadmin = 3   
    type: Number,
    trim: true, 
    default:1
  },
  countryCode: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  dob: {
    type: String,
    trim: true
  },   
  profilePic: {
    type: String,
    trim: true
  },   
 platformType: { // Mobile , Web  
    type: String, 
    enum:[PLATFORM_TYPE.Mobile, PLATFORM_TYPE.Web, PLATFORM_TYPE.Both],
    default: "Mobile", 
    required:false,
  },   
  addressLine:{    
    type:String, 
    required:false
  },
  city:{    
    type:String, 
    required:false
  },  
  state:{
    type:String, 
    required:false
  },  
  country:{
    type:String, 
    required:false
  },  
  zip:{
    type:String, 
    required:false
  },
  landmark:{ 
    type:String, 
    required:false
  },  
  status: {
    type: Number
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  }

}, {
  timestamps: true
});

module.exports = UserSchema;
