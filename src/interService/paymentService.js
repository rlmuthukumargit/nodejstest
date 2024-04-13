const axios = require('axios');
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE;

class PaymentService {}

PaymentService.getOrderDetails = async (req,userId) => {
    console.log("@Service paymentService @Method getOrderDetails @Message input");
    try {
          console.log("token",req.headers.token)
          let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
          if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
          }
  
          let config = {
              headers: { token: token },
              // params: { 
              //   userId: userId
              // }
          }
          const response = await axios.get(`${PAYMENT_SERVICE}/trackingOrder/getTrackingOrder?userId=${userId}`, config);

          let result = {}
          if(response && response.data && response.data.data){
            result = response.data.data;
          }
          return result;
  
    } catch (error) {
        console.log("@Service paymentService @Method getOrderDetails @Message ERROR :", error);
        return { status: false,  message: error.message };
    }
};

PaymentService.findOrderDetailsById = async (req,orderId) => {
  console.log("@Service paymentService @Method findOrderDetailsById @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getSingleOrderDetails?_id=${orderId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method findOrderDetailsById @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};


PaymentService.getProductList = async (req,userId) => {
  console.log("@Service paymentService @Method getProductList @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            params: { 
              userId: userId
            }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getProductList`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getProductList @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getAllOrderDetails = async (req,userId) => {
  console.log("@Service paymentService @Method getAllOrderDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/trackingOrder/getAllTrackingOrders?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getAllOrderDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};


PaymentService.getTransactionDetails = async (req,input) => {
  console.log("@Service paymentService @Method getProductList @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            data: input
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getTransaction`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getProductList @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getPointsEarned = async (req,input) => {
  console.log("@Service paymentService @Method getPointsEarned @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            data:input
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getPointsEarned`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getPointsEarned @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getPointsEarnedExport = async (req,input) => {
  console.log("@Service paymentService @Method getPointsEarnedExport @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            data:input
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getPointsEarnedExport`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getPointsEarned @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getAllTransactionDetails = async (req,userId) => {
  console.log("@Service paymentService @Method getAllTransactionDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getAllTransaction?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getAllTransactionDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getTransactionByWeb = async (req,userId) => {
  console.log("@Service paymentService @Method getTransactionByWeb @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getTransactionByWeb?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getTransactionByWeb @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getTransactionByMobile = async (req,userId) => {
  console.log("@Service paymentService @Method getTransactionByWeb @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getTransactionByMobile?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getTransactionByMobile @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getPurchaseOrderDetails = async (req,input) => {
  console.log("@Service paymentService @Method getPurchaseOrderDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            data: input
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getPurchaseOrderDetails`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getPurchaseOrderDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getAllPurchaseOrderDetails = async (req,userId) => {
  console.log("@Service paymentService @Method getAllPurchaseOrderDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getAllPurchaseOrderDetails?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getAllPurchaseOrderDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getUserProductDetails = async (req,userId) => {
  console.log("@Service paymentService @Method getUserProductDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getProductDetails?userId=${userId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getUserProductDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

///////////////////           RETURN             /////////////////////////////
PaymentService.getReturnDetails = async (req) => {
  console.log("@Service paymentService @Method getReturnDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getReturnDetails`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getReturnDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getReturnPaymentDetails = async (req,orderId) => {
  console.log("@Service paymentService @Method getReturnDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getReturnPaymentDetails?orderId=${orderId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getReturnDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getReturnProductDetails = async (req,orderId) => {
  console.log("@Service paymentService @Method getReturnProductDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getReturnProductDetails?orderId=${orderId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getReturnProductDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

//////////////////////////////////////           REPLACEMENT             ///////////////////////////////////////////
PaymentService.getReplacementDetails = async (req) => {
  console.log("@Service paymentService @Method getReplacementDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/purchaseOrder/getReplacementDetails`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getReplacementDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

//////////////////////////////////////           CANCEL             ///////////////////////////////////////////
PaymentService.getCancelOrderList = async (req) => {
  console.log("@Service paymentService @Method getCancelOrderList @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/trackingOrder/getCancelOrderList`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getCancelOrderList @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getCancelDetails = async (req,orderId) => {
  console.log("@Service paymentService @Method getCancelDetails @Message input");
  try {
        console.log("token",req.headers.token)
        let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        let config = {
            headers: { token: token },
            // params: { 
            //   userId: userId
            // }
        }
        const response = await axios.get(`${PAYMENT_SERVICE}/trackingOrder/getCancelDetails?orderId=${orderId}`, config);

        let result = {}
        if(response && response.data && response.data.data){
          result = response.data.data;
        }
        return result;

  } catch (error) {
      console.log("@Service paymentService @Method getCancelDetails @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};

PaymentService.getMostPurchasedItem = async (req, userId) => {
  console.log("@Service paymentService @Method getMostPurchasedItem @Message input");
  try {
      let result = {};
      let token = req.headers.token || req.headers['x-access-token'] || req.headers['authorization'];
      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

      let config = {
        headers: { authorization: token },
        params: { 
          userId: userId
        }
      }
      const response = await axios.get(`${PAYMENT_SERVICE}/trackingOrder/getMostPurchasedItem`, config);

      if(response && response.data && response.data.data){
        result = response.data.data;
      }
      return result;

  } catch (error) {
      console.log("@Service paymentService @Method getMostPurchasedItem @Message ERROR :", error);
      return { status: false,  message: error.message };
  }
};
module.exports = PaymentService