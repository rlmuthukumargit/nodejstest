
let { InternalAPIs } = require('../configs');
let { Rest } = require('../restCalls')
//const jwt = require('jsonwebtoken');

const ADMIN_SERVICE = process.env.ADMIN_SERVICE;
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE;

// const ristaHost = process.env.RISTA_HOST;
// const apiKey = process.env.RISTA_API_KEY;
// const secretKey = process.env.RISTA_SECRET_KEY;

class InternalServices { }

// Auth API 
InternalServices.verifyToken = async (headers) => {
    try {
        let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.userTokenVerification));
        if (headers.authorization) {
            urlPayload.headers.authorization = headers.authorization;
        } else if (headers['x-access-token']) {
            urlPayload.headers.authorization = headers['x-access-token']
        }
        //urlPayload.headers.authorization = headers.authorization;
        urlPayload.headers['content-type'] = headers['content-type'] ? headers['content-type'] : 'application/json';
        let verifyStatus = await Rest.callApi(urlPayload);
        return verifyStatus.user;
    } catch (err) {
        console.log('>>>>>>', err.message)
        throw new Error(err.message);
    }

} 

// Open API 
InternalServices.verifylocation = async (body) => { 
    try {  
      console.log("INERTNAL SERVICE FUNCTION", body)
      let urlPayload = {
        method: "POST",
        url: `${PRODUCT_SERVICE}/location/verifylocation`,
        data: body,
        headers: {
          contentType: "application/json",
        },
      };
      let response = await Rest.callApi(urlPayload);
      return response; 
    } catch (err) {
      console.log(">>>>>>", err.message);
      throw new Error(err.message);
    }
  };

// Open API   
InternalServices.getCityBySlug = async (body) => {
    try {
       let urlPayload = {
        method: "POST",
        url: `${PRODUCT_SERVICE}/location/getCityBySlug`,
        data: body,
        headers: {
          contentType: "application/json",
        },
      };
      let response = await Rest.callApi(urlPayload);
      return response.data; 
    } catch (err) {
      console.log(">>>>>>", err.message);
      throw new Error(err.message);
    }
  };


/*****************************************ADMIN related interservice api's start's  *************************************************/
InternalServices.getLoyalityPoint = async (req) => {
  console.log("@Controller internalService.js @Method getLoyalityPoint @Message input :");
  try {
    let urlPayload = {
      method: "GET",
      url: `${ADMIN_SERVICE}/siteSettings/getLoyalityPoint`,
      headers: {
        contentType: "application/json",
      },
    };
    let response = await Rest.callApi(urlPayload);
    return response.data.welcomeBonus ? response.data.welcomeBonus: 0; 
  } catch (err) {
    console.log("@Controller internalService.js @Method getLoyalityPoint @Message ERROR :", err);
    throw new Error(err.message);
  }
};

InternalServices.giftCardList = async (req) => {
  console.log("@Controller internalService.js @Method giftCardList @Message input :");
  try {
    let urlPayload = {
      method: "GET",
      url: `${ADMIN_SERVICE}/giftCard/giftCardlist`,
      headers: {
        contentType: "application/json",
      },
    };
    let response = await Rest.callApi(urlPayload);
    return response.data;
  } catch (err) {
    console.log("@Controller internalService.js @Method giftCardList @Message ERROR :", err);
    throw new Error(err.message);
  }
};

InternalServices.getGiftCardById = async (giftCardId) => {
  console.log("@Controller internalService.js @Method getGiftCardById @Message input :", giftCardId);
  try {
    let urlPayload = {
      method: "GET",
      url: `${ADMIN_SERVICE}/giftCard/giftCardById`,
      headers: {
        contentType: "application/json",
      },
      data: { id: giftCardId }
    };
    let response = await Rest.callApi(urlPayload);
    return response.data;
  } catch (err) {
    console.log("@Controller internalService.js @Method getGiftCardById @Message ERROR :", err);
    throw new Error(err.message);
  }
};
/*****************************************ADMIN related interservice api's end's  *************************************************/

/*****************************************PAYMENT related interservice api's start's  *************************************************/
InternalServices.initiatePayment = async (inputData) => {
  console.log("@Controller internalService.js @Method initiatePayment @Message input :=====================", inputData);
  try {
    let urlPayload = {
      method: "POST",
      url: `${PAYMENT_SERVICE}/payment/giftcard/initiatePayment`,
      headers: {
        contentType: "application/json",
      },
      data: inputData
    };
    let response = await Rest.callApi(urlPayload);
    return response.data;
  } catch (err) {
    console.log("@Controller internalService.js @Method initiatePayment @Message ERROR :", err);
    throw new Error(err.message);
  }
};

InternalServices.processTransactionInterserviceCall = async (inputData) => {
  console.log("@Controller internalService.js @Method processTransactionInterserviceCall @Message input :", inputData);
  try {
    let urlPayload = {
      method: "POST",
      url: `${PAYMENT_SERVICE}/payment/giftcard/processTransaction`,
      headers: {
        contentType: "application/json",
      },
      data: inputData
    };
    let response = await Rest.callApi(urlPayload);
    return response.data;
  } catch (err) {
    console.log("@Controller internalService.js @Method processTransactionInterserviceCall @Message ERROR :", err);
    throw new Error(err.message);
  }
};

InternalServices.createOrder = async (inputData) => {
  console.log("@Controller internalService.js @Method createOrder @Message input :");
  try {
    let urlPayload = {
      method: "POST",
      url: `${PAYMENT_SERVICE}/payment/giftcard/createOrder`,
      headers: {
        contentType: "application/json",
      },
      data: inputData
    };
    let response = await Rest.callApi(urlPayload);
    return response.data;
  } catch (err) {
    console.log("@Controller internalService.js @Method createOrder @Message ERROR :", err);
    throw new Error(err.message);
  }
};

InternalServices.verifyOrderInterserviceCall = async (inputData) => {
  console.log("@Controller internalService.js @Method verifyOrderInterserviceCall @Message input :", inputData);
  try {
    let urlPayload = {
      method: "POST",
      url: `${PAYMENT_SERVICE}/payment/giftcard/verifyOrder`,
      headers: {
        contentType: "application/json",
      },
      data: inputData
    };
    let response = await Rest.callApi(urlPayload);
    return response;
  } catch (err) {
    console.log("@Controller internalService.js @Method verifyOrderInterserviceCall @Message ERROR :", err);
    throw new Error(err.message);
  }
};

/*****************************************PAYMENT related interservice api's end's  *************************************************/


/*****************************************My reviews related interservice api's start's  *************************************************/
// InternalServices.getListOfMyReviews = async (inputData) => {
//   console.log("@Controller internalService.js @Method getListOfMyReviews @Message input :", inputData);
//   try {
//     let urlPayload = {
//       method: "GET",
//       url: `${PRODUCT_SERVICE}/rating/myReviewList`,
//       headers: {
//         contentType: "application/json",
//       },
//       data: inputData
//     };
//     let response = await Rest.callApi(urlPayload);
//     return response.data;
//   } catch (err) {
//     console.log("@Controller internalService.js @Method getListOfMyReviews @Message ERROR :", err);
//     throw new Error(err.message);
//   }
// };
/*****************************************My reviews related interservice api's end's  *************************************************/

// InternalServices.createCustomer = async (body) => {
//   console.log("@Service thirdParties.service @Method createCouponFromRista @Message input :", body);
//   try {
//     const tokenCreationTime = Math.floor(Date.now() / 1000);
//     const payload = { iss: apiKey, iat: tokenCreationTime };

//     const token = jwt.sign(payload, secretKey);
//     var options = {
//       'method': 'POST',
//       'url': `https://${ristaHost}/v1/customer`,
//       'headers': {
//         'x-api-key': apiKey,
//         'x-api-token': token,
//         'content-type': 'application/json'
//       },
//       data: JSON.stringify(body)
//     };
//     console.log('createCouponFromRista options', options)

//     // console.log("apiResp=======================================", options.body);
//     let apiResp = await Rest.callApi(options);
//     return apiResp;
//   } catch (err) {
//     console.log("@Service thirdParties.service @Method createCouponFromRista @Message ERROR :", err.response);
//     throw new Error(err.message);
//   }

// }


// InternalServices.loyaltyPoint = async (body) => {
//   console.log("@Service thirdParties.service @Method createCouponFromRista @Message input :", body);
//   try {
//     const tokenCreationTime = Math.floor(Date.now() / 1000);
//     const payload = { iss: apiKey, iat: tokenCreationTime };

//     const token = jwt.sign(payload, secretKey);
//     var options = {
//       'method': 'POST',
//       'url': `https://${ristaHost}/v1/customer/loyalty/points`,
//       'headers': {
//         'x-api-key': apiKey,
//         'x-api-token': token,
//         'content-type': 'application/json'
//       },
//       data: JSON.stringify(body)
//     };
//     console.log('createCouponFromRista options', options)

//     // console.log("apiResp=======================================", options.body);
//     let apiResp = await Rest.callApi(options);
//     console.log("apiResp", apiResp)
//     return apiResp;
//   } catch (err) {
//     console.log("@Service thirdParties.service @Method createCouponFromRista @Message ERROR :", err.response);
//     throw new Error(err.message);
//   }

// }
module.exports = InternalServices;