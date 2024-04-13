'use strict'
const { storyService } = require('../services');
const { userSession,address, userActivity} = require('../database/models');
const mongoose = require("mongoose")
const { response } = require('../middleware');
const { messages, statusCodes,config } = require('../configs');
const {  STATUS } = require('../constants/index')
const {
  generateAccessToken,
  genHash,
  getDecrptedData,
  getEncrptedData,
  dateFormat, 
} = require("../utils");
const user = require('../database/schemas/user');
const falseValues = [undefined, 'undefined', null, 'null'];
const jwt = require('jsonwebtoken');
const moment = require('moment');
const https = require('https'); 

const ObjectId = require("mongoose").Types.ObjectId;

class StoryController { } 

StoryController.createStory = async (req, res, next) => {
    console.log("@Controller story.controller @Method createstory @Message Input", req.body);    
    try { 
        
        let body = req.body;
        let userId = req.user.userId;
        if (body.title) { 
            let createStory = { 
                title: body.title, 
                userId: userId, 
                shortDescription: body.shortDescription, 
                description: body.description, 
                location: body.location, 
                date: body.date, 
                status: STATUS.ACTIVE, 
                createdBy: userId,
                updatedBy: userId

            }; 
            let userRes = await storyService.create(createStory);
            return response.success(req, res, statusCodes.HTTP_OK, userRes, messages.detailsAdded);

        } else {
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, [], messages.requireFieldMiss);  
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}


StoryController.getStories = async (req, res, next) => {
    try {
        let userId = req.user.userId , search = req.query.search , searchQuery;
        console.log("userId", userId)
        let condition = { 
            userId: userId
        }
        console.log(" search ", search);

       //db.posts.find({created_on: {$gte: start, $lt: end} });

       if(search === "All" || search == undefined){ 
        searchQuery = condition;
       } else { 
        let searchYear = search, querySDate = "01", querySMonth = "01", queryEDate = "30", queryEMonth = "12"; 
        let start = new Date(searchYear, querySMonth, querySDate,0,0,0,0);
        let end = new Date(searchYear, queryEMonth, queryEDate, 0,0,0,0);
        condition.Date =  {$gte: start, $lt: end} ;

        searchQuery = {...condition }; 
       }
        
        console.log(" searchQuery ", searchQuery); 
        let result = await storyService.findAll(searchQuery);

        return response.success(req, res, statusCodes.HTTP_OK, result, messages.dataFetched);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

StoryController.updateStory = async (req, res, next) => {
    try { 
        
        let body = req.body;
        let userId = req.user.userId, storyId =  ObjectId(body.id) ;

        let updateData = { 
            title: body.title, 
            shortDescription: body.shortDescription, 
            description: body.description, 
            location: body.location, 
            date: body.date, 
            status: STATUS.ACTIVE, 
            updatedBy: userId, 

        }; 
        let condition = { _id : storyId };
         console.log(" condition ", typeof(condition._id) ); 

        if (body.title) {   
            let updateResult = await storyService.updateOne(condition, updateData);
            updateData._id = storyId;
            return response.success(req, res, statusCodes.HTTP_OK, updateData, messages.dataUpdated);
        }

        if (!Object.keys(updateData).length) {
            return response.success(req, res, statusCodes.HTTP_OK, body, messages.everythingUptoDate);
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
}






module.exports = StoryController;

