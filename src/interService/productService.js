const axios = require("axios");
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;

class ProductService {}

ProductService.getProductReviews = async (req,input)=>{
    console.log("@Service productService @Method getProductReviews @Message input")
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
            data: input
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/product/getProductReviews`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getProductReviews @ERROR", error)
        return { status: false,  message: error.message };
    }
}

ProductService.getAllProductReviews = async (req,userId)=>{
    console.log("@Service productService @Method getAllProductReviews @Message input")
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
            // params : {
            //     userId:userId
            // }
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/product/getAllProductReviews?userId=${userId}`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getAllProductReviews @ERROR", error)
        return { status: false,  message: error.message };
    }
}

ProductService.getStoreNameListById = async (req,objId)=>{
    console.log("@Service productService @Method getStoreNameListById @Message input",objId)
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
            // params : {
            //     userId:userId
            // }
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/product/getStoreNameListById?objId=${objId}`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getStoreNameListById @ERROR", error)
        return { status: false,  message: error.message };
    }
}

ProductService.getSubscriptionList = async (req, input)=>{
    console.log("@Service productService @Method getSubscriptionList @Message input")
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
            data: input
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/subscription/getSubscriptionList`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getSubscriptionList @ERROR", error)
        return { status: false,  message: error.message };
    }
}

ProductService.getSubscriptionListExport = async (req, input)=>{
    console.log("@Service productService @Method getSubscriptionListExport @Message input")
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
            data: input
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/subscription/getSubscriptionListExport`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getSubscriptionList @ERROR", error)
        return { status: false,  message: error.message };
    }
}

ProductService.getSubscriptionById = async (req,subId)=>{
    console.log("@Service productService @Method getSubscriptionList @Message input")
    try{
        
        let token = req.headers.token || req.headers["x-access-token"] || req.headers["authorization"]
        console.log("token", token)
        if(token && token.startsWith('Bearer ')){
            token = token.slice(7,token.length)
        }

        let config= {
            headers :{token:token},
        }

        const response = await axios.get(`${PRODUCT_SERVICE}/subscription/getSubscriptionById?subId=${subId}`,config);

        let result = {}
        if(response && response.data && response.data.data){
            result = response.data.data
        }
        return result

    }catch(error){
        console.log("@Service productService @Method getSubscriptionList @ERROR", error)
        return { status: false,  message: error.message };
    }
}
module.exports = ProductService