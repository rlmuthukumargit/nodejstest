const { userController } = require("../../controllers/index");
const { verifyToken,verifySession,authenticate } = require("../../middleware");
 
const express = require("express");
const userRoutes = express.Router();
let validator = require('express-joi-validation').createValidator({
    passError: true
});
const {

    createUser,
    login,
    profileUpdate,
    findCustomer,
    deleteUser,
    //forgotPassword,
    //resetPassword
} = require('../../validators/user.validator');

  
userRoutes.post('/login', validator.body(login), userController.login);

userRoutes.post('/create',validator.body(createUser), userController.createUser);


userRoutes.get('/profile/get',verifyToken.validateToken,verifySession.validateSession, userController.getMyProfile);

userRoutes.put('/profile/update',verifyToken.validateToken,verifySession.validateSession,validator.body(profileUpdate), userController.updateProfile);
 
 // Remove user
userRoutes.delete('/delete', validator.query(deleteUser), verifyToken.validateToken, verifySession.validateSession, userController.deleteUser);

// interservice call 
userRoutes.post('/findCustomers', validator.body(findCustomer), userController.findCustomers);
    

userRoutes.post('/logOut',verifyToken.validateToken, userController.logout);

module.exports = userRoutes;