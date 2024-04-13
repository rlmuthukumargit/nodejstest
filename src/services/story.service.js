const { story } = require('../database/models');
const mongoose = require("mongoose")
const {
    statusCodes,
    messages,
    config
} = require("../configs");
var _ = require('lodash');
const {
    errorObjGeneator
} = require("../middleware").errorHandler;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
var axios = require("axios").default;
const objectID = require('mongoose').Types.ObjectId;
const getPagingData = require("../utils/pagination");
const {  STATUS } = require('../constants/index')

class StoryService { }

/**
 * @DESC : To create a story
 * @method: service call
 * @return: json
 */
StoryService.create = async (payload) => {
  try {
    let newData = new story(payload);
    return await newData.save();
  } catch (err) {
    throw errorObjGeneator(err);
  }
};


/**
 * @DESC : Get All story
 * @method: service call
 * @return: json
 * @param: req token
 */

StoryService.findAll = async (condition) => {
  try {
    return await story.find(condition);
  } catch (err) {
    console.log(err);
    throw errorObjGeneator(err);
  }
};


/**
 * @DESC : Update an story
 * @method: service call
 * @return: json
 * @param: req token
 */
StoryService.updateOne = async (condition, payload) => {
  try {
    // dont change code
    return await story.updateOne(condition, payload);
  } catch (err) {
    console.log(err);
    throw errorObjGeneator(err);
  }
};



/**
* @DESC : Get story  by id 
* @method: service call 
* @return: json  
* @param: req token 
*/ 
StoryService.getStoryById = async (id) => {
    try {
        return await story.findById(id);
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
} 






module.exports = StoryService
