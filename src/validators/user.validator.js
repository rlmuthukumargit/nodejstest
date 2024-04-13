const Joi = require('joi').extend(require('@joi/date'));
const utils = require('../utils');
const moment = require('moment')
const { USER_STATUS, USER_TYPE, PLATFORM_TYPE } = require('./../constants')

 
const profile = Joi.object().keys({
    //name: Joi.string().min(1).max(32).messages({'string.min':'Name should be minimum 1 character','string.max':'Name should be maximum 32 character'}).required(),
    //emailId: Joi.string().email().messages({'string.email':'Invalid email'}).required()

});

const createUser = Joi.object().keys({
    name: Joi.string().min(1).max(32).messages({'string.min':'Name should be minimum 1 character','string.max':'Name should be maximum 32 character'}).required(), 
    emailId: Joi.string().email().messages({'string.email':'Invalid email'}).required(), 
    password: Joi.string().required(),
    mobileNumber: Joi.string().custom(utils.mobileNumValidator).optional(),
    platformType:Joi.string().valid(PLATFORM_TYPE.Mobile, PLATFORM_TYPE.Web, PLATFORM_TYPE.Both).messages({'string.valid':'platformType should be Mobile , Web or Both'}).optional().allow('').default('Both'), 
 
});

const login = Joi.object().keys({
    emailId: Joi.string().email().messages({'string.email':'Invalid email'}).required(), 
    password: Joi.string().required(),
    platformType:Joi.string().valid(PLATFORM_TYPE.Mobile, PLATFORM_TYPE.Web, PLATFORM_TYPE.Both).messages({'string.valid':'platformType should be Mobile , Web or Both'}).optional().allow('').default('Both'), 
 
});

const profileUpdate = Joi.object().keys({
    name: Joi.string().min(1).max(32).messages({'string.min':'Name should be minimum 1 character','string.max':'Name should be maximum 32 character'}).optional(),
    //emailId: Joi.string().email().messages({'string.email':'Invalid email'}).optional(), 
    mobileNumber: Joi.string().custom(utils.mobileNumValidator).optional(),
    gender:Joi.string().allow('').valid('Male', 'Female').messages({'string.valid':'Gender should be Male or Female'}).optional(), 
    dob:Joi.date().allow('').format("DD/MM/YYYY").utc().optional(), 
    profilePic:Joi.string().allow('').optional(), 
    countryCode:Joi.string().allow('').optional().default(null),
    addressLine: Joi.string().max(128).messages({'string.max':'Flat, House no,Building, Company,Apartment should be maximum 128 characters'}).required(),
    city:Joi.string().required(),
    state:Joi.string().required(),
    country:Joi.string().allow('').optional().default('India'),
    landmark:Joi.string().allow('').optional().default(null),
    zip:Joi.string().allow('').optional().default(null),

});   

const findCustomer = Joi.object().keys({
   userIds: Joi.array().required(), 
});
 
const deleteUser = Joi.object().keys({
    userId: Joi.string().custom(utils.objectIDValidator).message('Invalid user id').required(),
});

// Admin forgotPassword validation 
const forgotPassword = Joi.object().keys({
    email: Joi.string().email().messages({'string.email':'Invalid email'}).required()
});

// Admin resetPassword validation 
const resetPassword = Joi.object().keys({
    // newPassword: Joi.string().required(),
    // confirmPassword: Joi.string().required(),
    data: Joi.string().required(), // encrypted data
});

module.exports = {
   
    createUser,
    login,
    profileUpdate,
    findCustomer,
    deleteUser,
    forgotPassword,
    resetPassword
};