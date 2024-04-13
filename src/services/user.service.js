const { user,userSession, userActivity, deletedUser } = require('../database/models');
const mongoose = require("mongoose")
const json2csv = require('json2csv').parse;
const {
    statusCodes,
    messages,
    config
} = require("../configs");
var _ = require('lodash');
const {
    errorObjGeneator
} = require("../middleware").errorHandler;
const {InternalServices} = require("../apiServices");
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
var axios = require("axios").default;
const objectID = require('mongoose').Types.ObjectId;
const getPagingData = require("../utils/pagination");
const {  USER_TYPE, USER_STATUS } = require('../constants/index')

class UserService { }

/**
 * @DESC : To create a User
 * @method: service call
 * @return: json
 */
UserService.create = async (payload) => {
  try {
    let newUser = new user(payload);
    return await newUser.save();
  } catch (err) {
    throw errorObjGeneator(err);
  }
};


/**
 * @DESC : Get All User
 * @method: service call
 * @return: json
 * @param: req token
 */

UserService.findAll = async (condition) => {
  try {
    return await user.find(condition).select("-password");
  } catch (err) {
    console.log(err);
    throw errorObjGeneator(err);
  }
};





//////////////////////////////////////////
////////////////////////////////////////
  
  /**
 * @DESC : To get User details by Id
 * @return: json
 * @param: req token
 */
UserService.addUserActivity = async (data) => {
  console.log("@Service user.service @Method addUserActivity input:");
  try {
    let userActivityData = new userActivity(data);
    return await userActivityData.save();
  } catch (err) {
    console.log(
      "@Service user.service @Method addUserActivity @Message ERROR :",
      err
    );
    throw new Error(err);
  }
};


/**
 * @DESC : Update an user
 * @method: service call
 * @return: json
 * @param: req token
 */
UserService.updateOne = async (condition, payload) => {
  try {
    // dont change code
    return await user.updateOne(condition, payload);
  } catch (err) {
    console.log(err);
    throw errorObjGeneator(err);
  }
};



/**
* @DESC : Get User  by id 
* @method: service call 
* @return: json  
* @param: req token 
*/ 
UserService.getUserById = async (id) => {
    try {
        return await user.findById(id).select("-password");
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
} 
 
UserService.updateUserById = async (body) => {
    try {
        let result = await user.findByIdAndUpdate({_id:body._id}, { $set: body},{new: true, upsert: true}).select("-password").lean();
        return {
            code: statusCodes.HTTP_OK,
            message: messages.userUpdated,
            data: result
        };
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
}
 
UserService.createSession = async (body) => {
    try {
        let newSession = new userSession(body);
        return await newSession.save(body);
    } catch (err) {
        throw errorObjGeneator(err);
    }
}

UserService.updateSession = async (body) => {
    try {
        return await userSession.findByIdAndUpdate({_id:body._id}, { $set: body});
    } catch (err) {
        throw errorObjGeneator(err);
    }
}

UserService.deleteSession = async (body) => {
    try {
        return await userSession.deleteOne({_id:body._id}).lean();
    } catch (err) {
        throw errorObjGeneator(err);
    }
}
 
/**
* @DESC : To get the users details by userids bulk array       
* @return: json  
* @param: req token 
*/
UserService.findCustomers = async (condition) => {
    try {
        return await user.find(condition).select("-password").lean();
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
}

/**
* @DESC : To update the remove profilepic status by loggedin user      
* @method: service call 
* @return: json  
* @param: req token 
*/ 
UserService.removeProfilePicByUpdating = async (body, updateData) => {
    try {
        let result = await user.findByIdAndUpdate(body, updateData).select("-password");
        return {
            code: statusCodes.HTTP_OK,
            message: messages.profilePicRemoved,
            data: result
        }
    } catch (err) {
        console.log(err)
        throw errorObjGeneator(err)
    }
}

/**
* @DESC : To update the profilepic by loggedin user      
* @method: service call 
* @return: json  
* @param: req token 
*/ 
UserService.updateProfilePic = async (input) => {
    console.log("@Service user.service @Method updateProfilePic @Message Input :", input);

    try {
        let result = await user.findByIdAndUpdate(input.userId, input).select("-password");
        return {
            code: statusCodes.HTTP_OK,
            message: messages.profilePicRemoved,
            data: result
        }
    } catch (err) {
        console.log("@Service user.service @Method updateProfilePic @Message ERROR :", err);
        throw errorObjGeneator(err)
    }
}


/**
* @DESC : Get session by id 
* @method: service call 
* @return: json  
* @param: req token 
*/ 
UserService.getSessionById = async (sessionId) => {
    console.log("@Service user.service @Method getSessionById @Message input :", sessionId);
    try {
        return await userSession.findById(sessionId);
    } catch (err) {
        console.log("@Service user.service @Method getUserById @Message ERROR :", err);
        throw errorObjGeneator(err);
    }
}
 
/**
* @DESC : Get forgotPassword
* @method: service call 
* @return: json  
* @param: req token 
*/ 
UserService.forgotPassword = async (input) => {
    console.log("@Service user.service @Method forgotPassword @Message input :", input.email);
    try {
        let userRes = await user.findOne({ emailId: input.email });
        if(!userRes) {
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.userEmailNotFound,
                data: {}
            }
        }

        var options = {
            method: 'POST',
            url: `https://api.mailmodo.com/api/v1/triggerTemplateEmail/t/${mailModoForgotPWDTemplateId}`,
            headers: {'Content-Type': 'application/json', mmApiKey: mailModoAPIKey },
            data: {
              toEmail: input.email,
              senderEmail: mailModoSenderEmail,
              subject: 'Reset Your Password',
              senderName: 'The Backers Dozen',
              // replyTo: 'string',
                data: { 
                  userName: input.user.name, 
                  userEmail: input.email,
                  userToken: input.token
                },
              //campaignName: 'string'
            }
        };
        let result = await axios.request(options);
        return {
            code: result.data.status,
            message: messages.emailSent
        }
          
    } catch (err) {
        console.log("@Service user.service @Method forgotPassword @Message ERROR :", err);
        throw errorObjGeneator(err.response.data);
    }
}

/**
* @DESC : To reset user password  
* @return: json  
* @param: req token 
*/
UserService.resetPassword = async (input) => {
    console.log("@Service user.service @Method resetPassword @Message input :", input);
    try {

        if (input.newPassword !== input.confirmPassword){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.passwordMismatch,
                data: {}
            }
        }

        // Get encrypted password
        let encryptedPassword = await encryptPassword(input.newPassword);

        // Update password
        let result = await user.findByIdAndUpdate({ _id: input.userId }, { $set: { password:  encryptedPassword }},{ new: true }).select("-password").lean();
        return {
            code: statusCodes.HTTP_OK,
            message: messages.sucess,
            data: result
        }

    } catch (err) {
        console.log("@Service user.service @Method resetPassword @Message ERROR :", err);
        throw new Error(err)
    }
}
 
//////////////////// RETURN //////////////////

/**
* @DESC : To get User details by Id  
* @return: json  
* @param: req token 
*/
UserService.getUserDetailsById = async (userId)=>{
    console.log("@Service user.service @Method getUserDetailsById input:",userId, typeof(userId))
    try{
        
        let data = await user.find({_id:userId})
        console.log("user", data)
        return data

    }catch(err){
        console.log("@Service user.service @Method getUserDetailsById @Message ERROR :", err)
        throw new Error(err)
    }
}


UserService.getUserEmail = async (body)=>{
    try{
       // let totalResult = await user.find({userType:1})
        let result = await user.find({userType:1, emailId:{$ne:null}} ,{emailId:1, _id:0}) 
       console.log("result", result)
       let finalResult = result.map(item =>{
        //console.log("items", item.emailId);
        return item.emailId;
       } )
        return finalResult;
    }catch(err){
        console.log(err);
        throw new Error(err)
    }
}

 
 
 
UserService.getUsers = async (body)=>{
    try{
       // let totalResult = await user.find({userType:1})
        let result = await user.find({}) //.select(emailId)  //.skip(body.offset).limit(body.limit)
       // let pageMetaData = getPagingData(result, body.page, body.limit,totalResult.length)
        return result
    }catch(err){
        console.log(err);
    }
} 



/**
* @DESC : To Export User SubscriptionList
* @return: json  
* @param: req token 
*/
UserService.deleteUser = async (input)=>{
    console.log("@Service user.service @Method deleteUser Input : ", input)
    try{
        let userRes = await user.findById(input.userId);
        let updateData = {isOldUser: true, status: USER_STATUS.DELETED} ; 
        let result = await user.findByIdAndUpdate({_id: input.userId}, { $set: updateData },{new: true, upsert: true}).lean();

        if(!userRes){
            return { 
                code: statusCodes.HTTP_NOT_FOUND,
                message: messages.userNotFound,
                data: {}
            }
        }

        await insertDeletedUser(JSON.parse(JSON.stringify(userRes)));

        return { 
            code: statusCodes.HTTP_OK,
            message: messages.sucess,
            data: {}
        }
    }catch(err){
        console.log("@Service user.service @Method deleteUser ERROR :", err)
        throw new Error(err)
    }
}

async function insertDeletedUser(deletedUserInput){
    delete deletedUserInput._id;
    delete deletedUserInput.__v;
    delete deletedUserInput.createdAt;
    delete deletedUserInput.updatedAt;

    let newdeletedUser = new deletedUser(deletedUserInput);
    await newdeletedUser.save();

    return true;
}

/**
 * @DESC : To get the users details by condition for customer
 * @return: json
 * @param: req token
 */
UserService.findSingleUserLogin = async (condition) => {
  try {
    return await user.findOne(condition);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


module.exports = UserService
