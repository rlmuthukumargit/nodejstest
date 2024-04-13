'use strict'
const { userService } = require('../services');
const { userSession,address, userActivity} = require('../database/models');
const mongoose = require("mongoose")
const { response } = require('../middleware');
const { messages, statusCodes,config } = require('../configs');
const { ThirdPartyServices } = require('../externalServices');
const {  USER_TYPE, USER_STATUS, ACTIVITY_TYPE, ACTIVITY_MESSAGE } = require('../constants/index')
//const utils = require("../utils");
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

const { InternalServices } = require("../apiServices");
const emailOTPEnv = process.env.emailOTP;
const mobileOTPEnv = process.env.mobileOTP;
const ObjectId = require("mongoose").Types.ObjectId;

class UserController { }


UserController.createUser = async (req, res, next) => {
    console.log("@Controller user.controller @Method createUser @Message Input", req.body);    
  try {
    let encryptdata = "", userInput = req.body;
        encryptdata = await getEncrptedData("Test@123");
            //userInput.password = await getDecrptedData(userInput.password);
            console.log(" bodyyyy datattata ",req.body); 
            console.log(" encryptdata datattata ", encryptdata); 
  
    let decrypPassword = await getDecrptedData(userInput.password);
    console.log(" decrypPassword ===> ", decrypPassword);
   if (!userInput.emailId || !decrypPassword) {
      return response.errors(
        req,
        res,
        statusCodes.HTTP_BAD_REQUEST,
        null,
        messages.missingFields
      );
    }

    const emailId = userInput.emailId.toLowerCase();
    const mobileNumber = userInput.mobileNumber;
    //const countryCode = userInput.countryCode;
    let countryCode = "+91";
    let isMobileExist = false;
    let isEmailExist = false , isOldUserCheck = false;
    const existingUsers = await userService.findAll({
      $or: [{ emailId: emailId }, { mobileNumber: mobileNumber }],
    });
    console.log("existingUsers =========>>>> ", existingUsers);

    existingUsers.map((existingUser) => {
      if (existingUser) {
             isOldUserCheck = existingUser.isOldUser; 
        if (
          existingUser.emailId == emailId &&
          existingUser.mobileNumber == mobileNumber
        ) {
          console.log("user came", req.isInternal);
          isMobileExist = true;
          isEmailExist = true;
        } else if (
          existingUser.emailId == emailId &&
          existingUser.mobileNumber != mobileNumber
        ) {
          console.log("only emailId exist");
          isEmailExist = true;
        } else if (
          existingUser.emailId != emailId &&
          existingUser.mobileNumber == mobileNumber
        ) {
          console.log("only mobilnumber exist");
          isMobileExist = true;
        }
      }
    });

    if (isOldUserCheck == true) {// allow to create same email as new user 
     
    } else {
     
    if (isMobileExist && isEmailExist) {
      console.log("existingUser mobilenumber and email");
      return response.errors(
        req,
        res,
        statusCodes.HTTP_BAD_REQUEST,
        null,
        messages.emailAndMobileExist
      );
    } else if (isEmailExist && !isMobileExist) {
      console.log("existingUser only email");
      return response.errors(
        req,
        res,
        statusCodes.HTTP_BAD_REQUEST,
        null,
        messages.emailExist
      );
    } else if (!isEmailExist && isMobileExist) {
      console.log("existingUser only mobilnumber");
      return response.errors(
        req,
        res,
        statusCodes.HTTP_BAD_REQUEST,
        null,
        messages.mobileNumberExist
      );
    }
   } 
    //userInput.password = await getDecrptedData(userInput.password);

    /** User payloads */
    let userData = { 
      emailId: emailId,
      password: decrypPassword,
      countryCode: countryCode,
      mobileNumber: mobileNumber,
      name: userInput.name,
      gender: userInput.gender || "", 
      dob: userInput.dob || "",
      //fcmToken: userInput.fcmToken || "",
      //password: userInput.password, 
      //userType: USER_TYPE.USER,
      profilePic: userInput.profilePic || "",
      addressLine: userInput.addressLine || "",
      city: userInput.city || "",
      state: userInput.state || "",
      country: userInput.country || "",
      zip: userInput.zip || "",
      landmark: userInput.landmark || "",
  
      createdAt: userInput.createdAt || new Date(),
      updatedAt: userInput.updatedAt || new Date(),
      status: 1,
      platformType: userInput.platformType || "",
    };

    let user = await userService.create(userData);
    user.createdBy = user._id;
    user.updatedBy = user._id;
    user.save();
    console.log("new user >>>>", user);

    return response.success(
      req,
      res,
      statusCodes.HTTP_OK,
      user,
      messages.userCreated
    );
  } catch (e) {
    console.log("err", e);
  } 

}

/**
 * @DESC : To login by email
 * @method: POST
 * @return: json
 * @param: null
 */
UserController.login = async (req, res, next) => {
  try {
    console.log(
      " in user-ms userController @login  login ==========> ",
      req.body
    );
    let { emailId, password, deviceToken } = req.body;
    let decrypPassword = await getDecrptedData(password);
    //let enpassword = await getEncrptedData("Test@123");
    //console.log(" enpassword =====> ",  enpassword );

    let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const user = await userService.findSingleUserLogin({        
          emailId: emailId, isOldUser: false      
    });

    if (user) {
      // userMobileNotFound
      let sendObj = {
        status: user.status,
        mobileNumber: user.mobileNumber,
        emailId: user.emailId,
      };
      if (
        user.status == USER_STATUS['IN-ACTIVE'] ||
        user.status == USER_STATUS.DELETED
      ) {
        return response.success(
          req,
          res,
          statusCodes.HTTP_OK,
          sendObj,
          messages.UserDeactive
        );
      }  

      console.log(" body params pass ", decrypPassword);
      console.log(" DB pass ", user.password);
      user.comparePassword(decrypPassword, async (err, isMatch) => {
        console.log(" isMatch ", isMatch);
        if (err || isMatch == false) {
          return response.errors(
            req,
            res,
            statusCodes.HTTP_BAD_REQUEST,
            {},
            messages.userPasswordNotMatch
          );
        } else {
          // isMatch == true
          let sessionCreateResult = await userService.createSession({
            platformType: req.body.platformType ? req.body.platformType : "",
            userId: user._id,
            isActive: true,
            userType: USER_TYPE.USER,
          });
          let jwtTokenInput = {
            sessionId: sessionCreateResult._id,
            createdAt: Date.now(),
            userId: user._id,
            userType: user.userType,
           
          };

          let token = generateAccessToken(jwtTokenInput);
          let userProfileResults = await userService.getUserById(user._id);
          let userProfileResult = {
            _id: userProfileResults._id,
            platformType: userProfileResults.platformType,
            mobileNumber: userProfileResults.mobileNumber,
            emailId: userProfileResults.emailId,
            name: userProfileResults.name,
            userType: userProfileResults.userType,
            countryCode: userProfileResults.countryCode,
            //gender: userProfileResults.gender,
            dob: userProfileResults.dob,
            profilePic: userProfileResults.profilePic,
            createdAt: userProfileResults.createdAt,
            updatedAt: userProfileResults.updatedAt,            
            token: token,
            status: userProfileResults.status,
            country: userProfileResults.country,
            state: userProfileResults.state,
            city: userProfileResults.city,
            zip: userProfileResults.zip,
            addressLine: userProfileResults.addressLine,
 
          };

          let activity = {
            userId: userProfileResults._id,
            activityType: ACTIVITY_TYPE.LoggedIn,
            message: ACTIVITY_MESSAGE.LoggedIn,
          };

          let activityData = await userService.addUserActivity(activity);

          let userUpdateData = await userService.updateOne(
            { _id: ObjectId(userProfileResults._id) },
            { deviceToken: deviceToken !== undefined ? deviceToken : "" }
          );

          return response.success(
            req,
            res,
            statusCodes.HTTP_OK,
            userProfileResult,
            messages.dataFetched
          );
        }
      });
    } else {
      // no records found in DB
      if (regexEmail.test(emailId)) {
        // // Emailid validation
        return response.errors(
          req,
          res,
          statusCodes.HTTP_BAD_REQUEST,
          {},
          messages.userEmailIdNotFound
        );
      } else {
        // mobilenumber validation
        return response.errors(
          req,
          res,
          statusCodes.HTTP_BAD_REQUEST,
          {},
          messages.userMobileNotFound
        );
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};


UserController.logout = async (req, res, next) => {
    try {
        let sessionId = req.user.sessionId;
        await userService.deleteSession({ _id: sessionId });
        return response.success(req, res, statusCodes.HTTP_OK, req.body, messages.logoutSuccess);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

UserController.getMyProfile = async (req, res, next) => {
    try {
        let userId = req.user.userId;
        console.log("userId", userId)
        let userProfileResults = await userService.getUserById(userId);
        console.log("userProfileResult", userProfileResults)
        let role;
        let array =[];          

        let userProfileResult = { 
            _id: userProfileResults._id,
             platformType: userProfileResults.platformType,
            mobileNumber: userProfileResults.mobileNumber,
            emailId: userProfileResults.emailId,
            name: userProfileResults.name,
            userType: userProfileResults.userType,
            countryCode: userProfileResults.countryCode,
            gender: userProfileResults.gender,
            dob: userProfileResults.dob,
             status: userProfileResults.status,
             createdAt: userProfileResults.createdAt,
            updatedAt: userProfileResults.updatedAt,
            createdBy: userProfileResults.createdBy,
            updatedBy: userProfileResults.updatedBy, 
             
          };

        return response.success(req, res, statusCodes.HTTP_OK, userProfileResult, messages.userDetailsRetrived);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

UserController.updateProfile = async (req, res, next) => {
    try { 
        
        let body = req.body;
        let updateData = {};

        if (body.name) {
            updateData['name'] = body.name;
        }

        if (body.emailId) {
            updateData['emailId'] = body.emailId;
        }

        if (body.gender) {
            updateData['gender'] = body.gender;
        }

        if (body.profilePic) { 
            updateData['profilePic'] = body.profilePic;
        }

        if (body.dob) {
            updateData['dob'] = dateFormat(body.dob);
        }

         
        if (body.mobileNumber) {
            let userRes = await userService.findSingleUserLogin({mobileNumber: body.mobileNumber});
            if(userRes && userRes.mobileNumber != req.user.mobileNumber){
                return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, [], messages.phoneExist);  
            }
            
            updateData['mobileNumber'] = body.mobileNumber;
        }

        if (!Object.keys(updateData).length) {
            return response.success(req, res, statusCodes.HTTP_OK, body, messages.everythingUptoDate);
        }
        updateData['_id'] = req.user.userId;

        let profileUpdateResult = await userService.updateUserById(updateData);
        return response.success(req, res, profileUpdateResult.code, profileUpdateResult.data, profileUpdateResult.message);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


/**
* @DESC : To get the users details by userids bulk array       
* @method: post 
* @return: json  
* @param: req token 
*/
UserController.findCustomers = async (req, res, next) => {

    try {
        console.log(" @findcustomers controller call testtstts "); 
        let userIds = req.body.userIds , finalResult = [];  
         if(userIds.length>0){  
            let condition = { "_id": {'$in': userIds } }; // $in  
            let userResult = await userService.findCustomers(condition); 
              if(userResult !== "") {                 
                finalResult = userResult;
            } 
            return response.success(req, res, statusCodes.HTTP_OK, finalResult, messages.dataFetched); 
        } else {
        return response.errors(req, res, statusCodes.HTTP_OK, [], messages.dataErrorFetched);  
        } 

    } catch (err) { 
        console.log("@Controller product.controller @Method getSubCategoriesByCategoryId @Message ERROR: ", err );
        next(err);
    } 
}


/**
* @DESC : To update the remove profilepic status by loggedin user      
* @method: PUT 
* @return: json  
* @param: req token 
*/ 
UserController.removeProfilePic = async (req,res,next)=> {
    try{
       
        let userId = req.user.userId;
        let removedPic = {};
        removedPic['profilePic'] = ""; 
        let removedProPic = await userService.removeProfilePicByUpdating(userId, removedPic)
        console.log('removedPic', removedProPic);  
        return response.success(req, res, statusCodes.HTTP_OK, removedProPic.data, removedProPic.message);  
    }catch(err){
        console.log(err)
        next(err)
    }
} 

/**
* @DESC : To update the profilepic by loggedin user      
* @method: PUT 
* @return: json  
* @param: req token 
*/ 
UserController.updateProfilePic = async (req, res, next)=> {
    console.log("@Controller user.controller @Method updateProfilePic @Message input", req.files);
    try{
        let input = req.body;
        input.userId = req.user.userId;
        input.profilePic = (req.files && req.files["profile-images"] && req.files["profile-images"][0].location) ? req.files["profile-images"][0].location: null;

        let result = await userService.updateProfilePic(input);
        return response.success(req, res, statusCodes.HTTP_OK, result.data, result.message);  
    }catch(err){
        console.log("@Controller user.controller @Method updateProfilePic @Message ERROR", err)
        next(err)
    }
} 
  

/**
* @DESC : To get user data by id
* @method: GET  
* @return: json  
* @param: req token 
*/
UserController.getUserById = async (req, res, next) => {
    console.log("@Controller user.controller @Method getUserById @Message input :", req.query);
    try { 
        let userId = req.query.userId;    
        let result = await userService.getUserById(userId); 
        return response.success(req, res, statusCodes.HTTP_OK, result, messages.userDetailsRetrived);
   } catch (err) {
   console.log("@Controller user.controller @Method getUserById @Message ERROR :", err);
   next(err);
   }
}

/**
* @DESC : To get session data by id
* @method: GET  
* @return: json  
* @param: req token 
*/
UserController.getUserSessionBySessionId = async (req, res, next) => {
    console.log("@Controller user.controller @Method getUserSessionBySessionId @Message input :", req.query);
    try { 
        let sessionId = req.query.sessionId;    
        let result = await userService.getSessionById(sessionId); 
        return response.success(req, res, statusCodes.HTTP_OK, result, messages.userDetailsRetrived);
   } catch (err) {
   console.log("@Controller user.controller @Method getUserSessionBySessionId @Message ERROR :", err);
   next(err);
   }
}

 
 
 
// Admin 
UserController.getAllUserInformation = async (req,res,next)=>{
    console.log("@Controller user.controller @Method getAllUserInformation @Message input")
    try{

        let reqQuery = req.query;
        let search = req.query.search;
        let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
        let page = parseInt(req.query.page) ? (parseInt(req.query.page) - 1) : 0;
        let offset = parseInt(limit) * parseInt(page);

        // Filter query
        let sortingFilter = { "$sort": { createdAt: - 1 } };
        if(reqQuery.sortBy){
            let orderBy = reqQuery.sortBy === "asc" ? 1: -1;

            if(reqQuery.filter === "name"){
                sortingFilter = { "$sort": { "name": orderBy } }; 
            }else if(reqQuery.filter === "emailId"){
                sortingFilter = { "$sort":{"emailId":orderBy}}
            }      
        }

        let query = {
            page:page,
            limit:limit,
            offset:offset
        }

        let searchQuery = {};
        if(search !="" && search !== undefined){
            searchQuery = {
                $or:[
                    { "name": { $regex: req.query.search, $options: "i" }},
                    { "emailId": { $regex: req.query.search, $options: "i" }},
                    { "mobileNumber": { $regex: req.query.search, $options: "i" }},
                ]
            }
        }
        let lookupData = await userService.getAllUserInformation(query, searchQuery, sortingFilter);
        //return response.success(req, res, findResult.code, findResult.data, findResult.message);
        // console.log("lookup",lookupData)

        let result = []
        for(let item of lookupData.list){
            let finalData = {}
            finalData["customerId"]= item._id
            finalData["name"] = item.name,
            finalData["mobileNumber"] = item.mobileNumber,
            finalData["emailId"] = item.emailId ,
            finalData["status"] = item.status,
            finalData["registeredDate"] = item.createdAt
            for(let items of item.UserInfo){
            finalData["address"] = items.addressLine1 +','+ items.addressLine2 +','+ items.landmark +','+ items.city+','+ items.state +'-'+ items.pincode +'.'
            }
            //(Axios will come here)
            let orderResult = await getOrderDetails(req,item._id)
          finalData["lastOrderDate"] = orderResult.orderPlacedOn
          result.push(finalData);
        }

        let pageMetaData = lookupData.pageMeta;
        let resultData ={result,pageMetaData}
        return response.success(req, res, statusCodes.HTTP_OK, resultData, messages.dataFetched);

    }catch(err){
        console.log("@Controller user.controller @Method getAllUserInformation  @Message ERROR :", err)
        next(err)
    }
}
 
 

/**
* @DESC : Find Order Details By Id
* @method: GET  
* @return: json  
* @param: req token 
*/
UserController.findOrderDetailsById = async (req,res,next)=>{
    console.log("@Controller user.controller @Method findOrderDetailsById @Message input")
    try{
        // let orderId = req.query.orderId
        let _id = req.query._id
        let orderResult = await findOrderDetailsById(req,_id)
        console.log("orderResult", orderResult)

        let order = []
        for(let item of orderResult){
            let product =[]
            let image=[]
            let orderHistory = {}
            orderHistory["_id"] = item._id
            orderHistory["orderId"]= item.invoiceNumber 
            // let orderPlacedOn = new Date(item.createdAt)
            // orderHistory["orderDate"] = `${orderPlacedOn.getDate()} ${orderPlacedOn.toLocaleString('default', {month:'long'})} ${orderPlacedOn.getFullYear()}`
            // orderHistory["orderTime"] = `${orderPlacedOn.getHours()}:${orderPlacedOn.getMinutes()}`
            orderHistory["orderDate"] = item.createdAt
            orderHistory["orderTime"] = item.createdAt
            orderHistory["paymentMethod"]= item.paymentMethod
            console.log("productData", item.productData)
            for(let items of item.productData){
                let products={}
                products["productName"] = items.itemName
                products["productDetails"]= items.description
                products["images"]= items.images
                product.push(products)
            }
            orderHistory["orderDetails"]= product
            // for(let items of item.productData){
            //     let productImage={}
            //     productImage["images"]= items.images
            //     image.push(productImage)
            // }
            // orderHistory["images"]= image

            order.push(orderHistory)
            
        }

        return response.success(req, res, statusCodes.HTTP_OK, order, messages.dataFetched);

    }catch(err){
        console.log("@Controller user.controller @Method findOrderDetailsById @Message Error:", err)
        next(err)
    }
}
 
 
/**
* @DESC : To delete user by id
* @method: DELETE  
* @return: json  
* @param: req token 
*/
UserController.deleteUser = async (req, res, next) => {
    console.log("@Controller user.controller @Method deleteUser @Message input :");
    try { 
        let input = req.query; 
        let result = await userService.deleteUser(input); 
        return response.success(req, res, result.code, result.data, result.message);
        
    } catch (err) {
    console.log("@Controller user.controller @Method deleteUser @Message ERROR :", err);
    next(err);
    }
}

module.exports = UserController;

