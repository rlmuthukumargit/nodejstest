'use strict'
const { response } = require('../middleware');
const { statusCodes, messages } = require("../configs");

class authController { }

/**
* @DESC : To get verifyToken
* @method: GET  
* @return: json  
* @param: req token 
*/
authController.verifyToken = async (req, res, next) => {
    console.log("@Controller user.controller @Method verifyToken @Message input :", req.user);
    try { 
        // let isAuthenticed = req.user.isAuthenticed; 
        return response.success(req, res, statusCodes.HTTP_OK, { isAuthenticed: req.user.isAuthenticed }, messages.sucess);
   } catch (err) {
   console.log("@Controller user.controller @Method verifyToken @Message ERROR :", err);
   next(err);
   }
}

module.exports = authController;

