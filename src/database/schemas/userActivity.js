const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {  ACTIVITY_TYPE } = require('../../constants'); 

module.exports = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    activityType:{
        type:String,
        enum:[ACTIVITY_TYPE.LoggedIn, ACTIVITY_TYPE.LoggedOut]
    },
    message:{
        type:String
    }
},{timestamps:true})