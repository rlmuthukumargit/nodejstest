const Joi = require('joi').extend(require('@joi/date'));
const utils = require('../utils');
const moment = require('moment')
const { STATUS  } = require('./../constants')

 
const createStory = Joi.object().keys({
    //userId: Joi.string().custom(utils.objectIDValidator).message('Invalid user id').required(),
    title: Joi.string().min(1).max(32).messages({'string.min':'title should be minimum 1 character','string.max':'title should be maximum 500 character'}).required(), 
    shortDescription:Joi.string().required(),
    description:Joi.string().required(),
    location:Joi.string().required(),
    date:Joi.date().allow('').format("DD/MM/YYYY").utc().optional(), 
 
});
 
const updateStory = Joi.object().keys({
    id: Joi.string().custom(utils.objectIDValidator).message('Invalid id').required(),
    title: Joi.string().min(1).max(32).messages({'string.min':'title should be minimum 1 character','string.max':'title should be maximum 500 character'}).required(), 
    shortDescription:Joi.string().required(),
    description:Joi.string().required(),
    location:Joi.string().required(),
    date:Joi.date().allow('').format("DD/MM/YYYY").utc().optional(), 
 
});


module.exports = {
   
    createStory,
    updateStory,
   

};