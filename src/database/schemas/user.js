const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PLATFORM_TYPE } = require('../../constants'); 
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
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
    default: 1
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
 addressLine:{ //    
    type:String, 
    required:false
  },
  city:{//    
    type:String, 
    required:false
  },  
  state:{//    
    type:String, 
    required:false
  },  
  country:{//    
    type:String, 
    required:false
  },  
  zip:{//    
    type:String, 
    required:false
  },
  landmark:{//    
    type:String, 
    required:false
  },  
  deviceToken:{//    
    type:String, 
    required:false
  },
  status: {
    type: Number
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  isOldUser: {
    type: Boolean,
    default: false
  }

  
}, {
  timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = UserSchema;
