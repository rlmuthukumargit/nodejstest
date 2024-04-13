const { address, subAdminRoles } = require("../database/models")
const { userService } = require('../services');
const { getOrderDetails, getProductList, getAllOrderDetails, getAllTransactionDetails,getAllPurchaseOrderDetails, findOrderDetailsById,getPointsEarned, getPointsEarnedExport } = require("../interService/paymentService")
const { getProductReviews,getAllProductReviews,getStoreNameListById, getSubscriptionList, getSubscriptionListExport } = require("../interService/productService")


class exportUtil {}

exportUtil.exportSavedAddresses = async (id)=>{
    console.log("@Controller exportUtil.js @Method exportSavedAddresses @Message input: ");
    try{
        
        let addressData = await address.find({userId:id})
        
        let savedAddress = []
        for(let item of addressData){
            let address = {}
            address["name"] = item.name
            address["savedAddress"] = item.addressLine1 +','+ item.addressLine2 +','+ item.city+','+ item.state +'-'+ item.pincode +'.' 
            address["landmark"] = item.landmark
            address["mobileNumber"] = item.mobileNumber
            address["type"] = item.type

            savedAddress.push(address)
        }

        return {
            status: true,
            result:savedAddress
        }
    }catch(err){
        console.log("@Controller user.controller @Method getSavedAddresses @Message Error:", err)
        return err
    }
}

exportUtil.exportCustomerReviews = async (req,id)=>{
    console.log("@Controller exportUtil.js @Method exportCustomerReviews @Message input: ");
    try{

        //let userId = "62458aa322f865e6733619a1"
        let reviewResult = await getAllProductReviews(req,id)
        let review = []
        for(let item of reviewResult){
            let productReview = {}
            productReview["rating"] = item.rating
            productReview["reviewedItems"] = item.description
            let reviewedDate = new Date(item.createdAt)
            productReview["reviewedDate"] = `${reviewedDate.getDate()} ${reviewedDate.toLocaleString('default', {month:'long'})} ${reviewedDate.getFullYear()}`

            review.push(productReview)
        }

        return {
            status: true,
            result: review
        }
        
    }catch(err){
        console.log("@Controller exportUtil.js @Method exportCustomerReview @Message Error:", err)
        return err
    }
}

exportUtil.exportOrderHistory = async (req,id)=>{
    console.log("@Controller exportUtil.js @Method exportCustomerReviews @Message input: ");
    try{
        //let userId = "62458aa322f865e6733619a1"
        let orderResult = await getAllOrderDetails(req,id)
         
        let order = []
        for(let item of orderResult){
            let orderHistory = {}
            orderHistory["orderId"] = item._id
            let orderPlacedOn = new Date(item.orderPlacedOn)
            orderHistory["orderDate"] = `${orderPlacedOn.getDate()} ${orderPlacedOn.toLocaleString('default', {month:'long'})} ${orderPlacedOn.getFullYear()}`
            orderHistory["orderTime"] = `${orderPlacedOn.getHours()}:${orderPlacedOn.getMinutes()}`
            orderHistory["orderStatus"] = item.orderStatus

            order.push(orderHistory)

        }

        return {
            status: true,
            result: order
        }
    }catch(err){
        console.log("@Controller exportUtil.js @Method exportOrderHistory @Message Error:", err)
        return err
    }
}

exportUtil.exportAllCustomerDetails = async (req, searchQuery, sortingFilter)=>{
    console.log("@Controller exportUtil.js @Method exportAllCustomerDetails @Message input: ");
    try{

        // let lookupData = await userService.exportAllCustomers(req,query,reqQuery) getAllUserInformation
        let lookupData = await userService.getUserListExport( searchQuery)

        //return response.success(req, res, findResult.code, findResult.data, findResult.message);
        console.log("lookup",lookupData)
        let result = []
        for(let item of lookupData){
            let finalData = {}
            finalData["name"] = item.name,
            finalData["mobileNumber"] = item.mobileNumber,
            finalData["emailId"] = item.emailId ,
            finalData["status"] = item.status,
            finalData["createdAt"] = item.createdAt
            for(let items of item.UserInfo){
                //will insert ',' afterwards
            finalData["address"] = items.addressLine1 +','+ items.addressLine2 +','+ items.landmark +','+ items.city+','+ items.state +'-'+ items.pincode +'.'
            }
            //(Axios will come here)
            let orderResult = await getOrderDetails(req,item._id)
          finalData["orderPlacedOn"] = orderResult.orderPlacedOn
          result.push(finalData)
        }
        // let pageMetaData = lookupData.pageMeta;
        // let final = {result, pageMetaData}

        return {
            status: true,
            result: result
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllCustomerDetails @Message Error:", err)
        return err
    }
}
exportUtil.exportSingleCustomerDetails = async (req,res,next)=>{
    console.log("@Controller exportUtil.js @Method exportSingleCustomerDetails @Message input: ");
    try{
    let lookupData = await userService.getAllUserInformation2(userId)
    console.log("lookupData", lookupData)
    let lookUp = []
    for(let item of lookupData){
        let addressList = []
        let finalData = {}
        finalData["name"] = item.name,
        finalData["status"] = item.status,
        finalData["id"] = item._id,
        finalData["dob"] = item.dob,
        finalData["email"] = item.emailId,
        finalData["gender"] = item.gender,
        finalData["anniversary"] = item.anniversary,
        finalData["phone"] = item.mobileNumber,
        finalData["registrationDate"] = item.createdAt,
        finalData["activeSubscriptions"]= "",
        finalData["totalPointsEarned"] = "",
        finalData["lastLoginDate"] = ""


        for(let items of item.UserInfo){
            let addressData ={}
            addressData["savedAddresses"] = items.addressLine1 +','+ items.addressLine2 +','+ items.landmark +','+ items.city+','+ items.state +'-'+ items.pincode +'.'
            addressList.push(addressData)

        }
        console.log("address", addressList)
        finalData["savedAddresses"] = addressList

        //AXIOS(product)
        console.log("token",req.headers)
        let reviewResult = await getAllProductReviews(req,item._id)
        finalData["numberOfReviews"] = reviewResult.length

        //AXIOS(payment-order)
        let orderResult = await getAllOrderDetails(req,item._id)
        console.log("order", orderResult)
        finalData["numberOfOrders"] = orderResult.length

        //AXIOS (MoneySpent)
        let allDetails = await getAllTransactionDetails(req,item._id) 

        let sum = allDetails.reduce((accumulator,object)=>{
            return accumulator + parseInt(object.transactionAmount);
        },0)
        finalData["TotalMoneySpent"]= sum


        //axios product
        // let productList = await getProductList(req,item._id)
        // let maxGame = productList.reduce((max, productList) => max.votes > game.votes ? max : game);

        lookUp.push(finalData)

        }

        return {
            status: true,
            result: lookUp
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportSingleCustomerDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportAllTransactionDetails = async (req,userId)=>{
    console.log("@Controller exportUtil.js @Method exportAllCustomerDetails @Message input:" )
    try{
   
        let details = await getAllTransactionDetails(req,userId)
        console.log("axios", details)

        let sum = details.reduce((accumulator,object)=>{
            return accumulator + parseInt(object.transactionAmount)
        },0)
        console.log("sum",sum)

        let transaction = []
        for(let item of details){
            let product=[]
            let moneySpent = {}
            moneySpent["date"]= item.transactionDate
            moneySpent["amount"]= item.transactionAmount
            moneySpent["paymentMode"]= item.paymentMode
            //moneySpent["orderItems"]= item.productList
            for(let items of item.productList){
                let productName ={}
                productName["orderItems"]= items.itemName
                product.push(productName)
            }
            moneySpent["orderItems"]= product

            transaction.push(moneySpent)
        }
        return {
            status:true,
            result: transaction
        }
    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllTransactionDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportAllPurchaseOrderDetails = async (req,userId)=>{
    console.log("@Controller exportUtil.js @Method exportAllPurchaseOrderDetails @Message input:" )
    try{
        let details = await getAllPurchaseOrderDetails(req,userId)
        let purchase =[]
        for(let item of details){
            let purchaseOrder = {}
            purchaseOrder["orderId"] = item._id
            let orderDate = new Date(item.createdAt)
            purchaseOrder["orderDate"] = `${orderDate.getDate()} ${orderDate.toLocaleString('default', {month:'long'})} ${orderDate.getFullYear()}`
            purchaseOrder["orderTime"] = `${orderDate.getHours()}: ${orderDate.getMinutes()}`
            purchaseOrder["orderStatus"] = item.status

            purchase.push(purchaseOrder)
        }
        return {
            status:true,
            result:purchase
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllPurchaseOrderDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportSingleOrderDetails = async(req,orderId)=>{
    try{
        let orderResult = await findOrderDetailsById(req,orderId)
        console.log("orderResult", orderResult)

        let order = []
        for(let item of orderResult){
            let product =[]
            let image=[]
            let orderHistory = {}
            orderHistory["OrderId"] = item._id
            let orderPlacedOn = new Date(item.createdAt)
            orderHistory["orderDate"] = `${orderPlacedOn.getDate()} ${orderPlacedOn.toLocaleString('default', {month:'long'})} ${orderPlacedOn.getFullYear()}`
            orderHistory["orderTime"] = `${orderPlacedOn.getHours()}:${orderPlacedOn.getMinutes()}`
            orderHistory["paymentMethod"]= item.paymentMethod
            for(let items of item.productData){
                let products={}
                products["orderDetails"]= items.description
                product.push(products)
            }
            orderHistory["orderDetails"]= product
            for(let items of item.productData){
                let productImage={}
                productImage["images"]= items.images
                image.push(productImage)
            }
            orderHistory["images"]= image

            order.push(orderHistory)
            
        }

        return{
            status:true,
            result: order
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllPurchaseOrderDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportAllSubAdminDetails = async (req)=>{
    console.log("@Controller exportUtil.js @Method exportAllSubAdminDetails @Message input:" )
    try{
        let data = await userService.getFullSubAdminUser()
        let result=[]
        for(let item of data){
            let subAdminData = {}
            subAdminData["employeeId"]= item._id
            subAdminData["employeeName"]= item.name
            subAdminData["emailId"]= item.emailId
            //subAdminData["storeName"]= item.storeId
            subAdminData["contactNumber"]= item.mobileNumber
            subAdminData["status"]= item.status
           // subAdminData["rightsAndPermission"]= item.subAdminRoles

            let subRoles =[]
            for(let items of item.subAdminRoles){
                let roleName={}
                roleName["_id"]= items._id
                roleName["roleId"]= items.roleId
                roleName["activity"]= items.activity
                let roleData = await subAdminRoles.find({_id:items.roleId});
                roleName["roleData"]= roleData[0]

                subRoles.push(roleName)
            }

            subAdminData["rightsAndPermission"]= subRoles

            let storeData= await getStoreNameListById(req,item.storeId)
            subAdminData["storeName"]= storeData.branchName +','+storeData.city

            

            result.push(subAdminData)

        }
        return{
            status:true,
            result:result
        }

        
    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllSubAdminDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportAllActivityLogList = async (req,query,reqQuery)=>{
    console.log("@Controller exportUtil.js @Method exportActivityLogList @Message input:" )
    try{
        let resultData = await userService.getAllActivityLogList(query, reqQuery)
        let result=[]
        let resObj={}
        for(let item of resultData){
            resObj["_id"] = item._id
            resObj["personId"]= item.userId
            resObj["name"]= item.userDetails.name
            resObj["designation"]= item.userDetails.userType
            resObj["platform"]= "Web"
            resObj["Date"]= item.createdAt
            resObj["activity"]= item.activityType

            let storeData = await getStoreNameListById(req, item.userDetails.storeId)
            resObj["storeName"]=storeData.branchName

            result.push(resObj)

        }
        return{
            status:true,
            result:result
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportActivityLogList @Message Error:", err)
        return err
    }
}

exportUtil.exportUserSubscriptionList = async (req,input)=>{
    console.log("@Controller exportUtil.js @Method exportAllCustomerDetails @Message input: ");
    try{

        let details = await getSubscriptionListExport(req,input);
        console.log("details______", details)
        let result =[]
        for(let item of details){
           let finalData={}
           finalData["_id"]= item._id
           finalData["subscription"]= item.subscription
           finalData["fromDate"] = item.fromDate
           finalData["toDate"] = item.toDate
           finalData["noOfDeliveries"] = ""
           finalData["deliveriesPerDay"] = ""
           finalData["deliveriesDone"] = ""

           result.push(finalData)

        }

        return {
            status: true,
            result: result
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportAllCustomerDetails @Message Error:", err)
        return err
    }
}

exportUtil.exportUserPointsEarned = async (req,input)=>{
    console.log("@Controller exportUtil.js @Method exportUserPointsEarned @Message input: ");
    try{

        let details = await getPointsEarnedExport(req,input)
        console.log("axios", details)

        let total = ""

        let result = []
        for(let item of details){
            let moneySpent = {}
            moneySpent["date"]= item.transactionDate
            moneySpent["pointsEarned"]= ""
            for(let items of item.productList){
                moneySpent["orderItems"]= items.itemName
            }

            result.push(moneySpent)
        }
        
       

        return {
            status: true,
            result: result
        }

    }catch(err){
        console.log("@Controller exportUtil.js @Method exportUserPointsEarned @Message Error:", err)
        return err
    }
}
module.exports = exportUtil