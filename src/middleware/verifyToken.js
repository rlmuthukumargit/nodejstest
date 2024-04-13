'use strict'

const { messages, statusCodes } = require('../configs');
const { user } = require('../database/models');
const { USER_TYPE } = require('../constants');

const { InternalServices } = require('./../apiServices');
const jwt = require('jsonwebtoken');
const unAuthorizedResponse = { status: statusCodes.HTTP_UNAUTHORIZED, message: messages.unauthorized };

module.exports = {
  validateToken: async (req, res, next) => {
    // try {
    //   req.user = await InternalServices.verifyToken(req.headers);
    //   console.log("user", req.user);
    //   next();
    // } catch (err) {
    //   console.log("error msgs", err.message);
    //   next({status: statusCodes.HTTP_UNAUTHORIZED, message: "unauthorized"})
    // }
    try {
      //To check user is using app without login
      req.user = req.user || { 'isAuthenticed': true };
      
      req.user.isAuthenticed = (!req.user.isAuthenticed) ? false : true
      
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];      
    
      //login user and token in empty
      if (req.user.isAuthenticed && token == undefined) {
        next(unAuthorizedResponse)
      }
      else if (req.user.isAuthenticed && token != undefined) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {

          if (err) {
            next(unAuthorizedResponse)
          }
          else {
            //Check for user 
            let userDetails = await user.findOne({'_id': data.userId, 'status': 1 }).select("-password"); 
            if (!userDetails || !Object.keys(userDetails).length) next(unAuthorizedResponse)
            else {
              //make the required params
              req.user = {
                'userId': userDetails._id,
                'mobileNumber': userDetails.mobileNumber,
                'emailId': userDetails.emailId,
                'name': userDetails.name,
                'userType': userDetails.userType,
                'sessionId': data.sessionId, 
                'dob': userDetails.dob, 
                'profilePic': userDetails.profilePic, 
                'referralCode': userDetails.referralCode, 
                'status': userDetails.status, 
                //'loyalityPoint': userDetails.loyalityPoint, 
                //'TBDwalletAmount': userDetails.TBDwalletAmount, 
                'citySlug': userDetails.citySlug, 
                'cityId': userDetails.cityId, 
                'pincode': userDetails.pincode, 
                'addressLine': userDetails.addressLine, 
                'city': userDetails.city, 
                'state': userDetails.state, 
                'country': userDetails.country, 
                'ristaUserId': userDetails.ristaUserId, 
                'isAuthenticed': req.user.isAuthenticed
              }  
               next();
            }
          }
        })

      }
      else if (!req.user.isAuthenticed && token == undefined) {
        req.user = req.user || {}
        next()
      }
    }
    catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse)
    }
  }, 

  validateSuperAdminToken: async (req, res, next) => {
 
    try {
      //To check user is using app without login
      req.user = req.user || { 'isAuthenticed': true };
      
      req.user.isAuthenticed = (!req.user.isAuthenticed) ? false : true
      
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];      
    
      //login user and token in empty
      if (req.user.isAuthenticed && token == undefined) {
        next(unAuthorizedResponse)
      }
      else if (req.user.isAuthenticed && token != undefined) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {

          if (err) {
            next(unAuthorizedResponse)
          }
          else {
            //Check for user 
            let userDetails = await user.findOne({'_id': data.userId, 'status': 1 }).select("-password"); 
            if (!Object.keys(userDetails).length) next(unAuthorizedResponse)
            else {
                 if(userDetails.userType === USER_TYPE.ADMIN || userDetails.userType === USER_TYPE.SUBADMIN){   
                  req.user = userDetails; 
                  req.user.userId = userDetails._id; 
                  next(); 
                } else {  
                  let err = new Error(messages.userNotMatched)
                  err.status = statusCodes.HTTP_UNAUTHORIZED;
                  next(err) 
                }
              //make the required params
   /*              req.user = {
                'userId': userDetails._id,
                'mobileNumber': userDetails.mobileNumber,
                'emailId': userDetails.emailId,
                'name': userDetails.name,
                'userType': userDetails.userType,
                'sessionId': data.sessionId, 
                'dob': userDetails.dob, 
                'profilePic': userDetails.profilePic, 
                'referralCode': userDetails.referralCode, 
                'status': userDetails.status, 
                //'loyalityPoint': userDetails.loyalityPoint, 
                //'TBDwalletAmount': userDetails.TBDwalletAmount, 
                'citySlug': userDetails.citySlug, 
                'cityId': userDetails.cityId, 
                'pincode': userDetails.pincode, 
                'addressLine': userDetails.addressLine, 
                'city': userDetails.city, 
                'state': userDetails.state, 
                'country': userDetails.country, 
                'ristaUserId': userDetails.ristaUserId, 
                'isAuthenticed': req.user.isAuthenticed
              }  */
               //next();
            }
          }
        })

      }
      else if (!req.user.isAuthenticed && token == undefined) {
        req.user = req.user || {}
        next()
      }
    }
    catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse)
    }
  },

  validateStoreManagerToken: async (req, res, next) => {
 
    try {
      //To check user is using app without login
      req.user = req.user || { 'isAuthenticed': true };
      
      req.user.isAuthenticed = (!req.user.isAuthenticed) ? false : true
      
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];      
    
      //login user and token in empty
      if (req.user.isAuthenticed && token == undefined) {
        next(unAuthorizedResponse)
      }
      else if (req.user.isAuthenticed && token != undefined) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {

          if (err) {
            next(unAuthorizedResponse)
          }
          else {
            //Check for user 
            let userDetails = await user.findOne({'_id': data.userId, 'status': 1 }).select("-password"); 
            if (!Object.keys(userDetails).length) next(unAuthorizedResponse)
            else {
                 if(userDetails.userType === USER_TYPE.STOREMANAGER){   
                  req.user = userDetails; 
                  req.user.userId = userDetails._id; 
                  next(); 
                } else {  
                  let err = new Error(messages.userNotMatched)
                  err.status = statusCodes.HTTP_UNAUTHORIZED;
                  next(err) 
                }
             
            }
          }
        })

      }
      else if (!req.user.isAuthenticed && token == undefined) {
        req.user = req.user || {}
        next()
      }
    }
    catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse)
    }
  }  


};