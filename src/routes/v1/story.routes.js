const { storyController } = require("../../controllers/index");
const { verifyToken,verifySession,authenticate } = require("../../middleware");
 
const express = require("express");
const storyRoutes = express.Router();
let validator = require('express-joi-validation').createValidator({
    passError: true
});
const {

    createStory,
    updateStory,
 

} = require('../../validators/story.validator');


storyRoutes.post('/createStory',verifyToken.validateToken,verifySession.validateSession, validator.body(createStory), storyController.createStory);

storyRoutes.get('/',verifyToken.validateToken,verifySession.validateSession, storyController.getStories);

storyRoutes.put('/',verifyToken.validateToken,verifySession.validateSession,validator.body(updateStory), storyController.updateStory);
  
module.exports = storyRoutes;