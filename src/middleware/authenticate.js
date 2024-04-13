'use strict'

const { messages, statusCodes } = require('../configs');
const { user } = require('../database/models');

const { InternalServices } = require('../apiServices');
const jwt = require('jsonwebtoken');
const unAuthorizedResponse = { status: statusCodes.HTTP_UNAUTHORIZED, message: messages.unauthorized };

module.exports = {
  authenticateUser: async (req, res, next) => {
    try {
        console.log("auther"); 
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == undefined) {
        req.user = {
          'isAuthenticed':false
        }
        next()
      }else{
          next()
      }
    } catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse)
    }
  }


};