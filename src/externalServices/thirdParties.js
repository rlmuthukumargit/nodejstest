let { thirdPartyAPI } = require('./../configs');
let { Rest } = require('./../restCalls')

class ThirdPartyServices { }

ThirdPartyServices.getSMSOTP = async (mobileNo) => {
    try {
        let OTP = Math.floor(1000 + Math.random() * 9000);
        OTP = parseInt(OTP);
        let sendOptions = {
            mobileNumber: mobileNo,
            otp: OTP
        }

        //Calling msg91 api to send SMS to the user
        await Rest.callOTPApi(sendOptions);
        return OTP;

        /*  thirdPartyAPI.smsOTPAPI.data = {
            "mobileNumber": mobileNo,
            "message": OTP,
            "messageTemplate": "smsOTP"
        }
        let apiResp = await Rest.callApi(thirdPartyAPI.smsOTPAPI); */

    } catch (err) {
        console.log(err)
        throw new Error('Error in sending SMS. ::' + err.message);
    }

}
ThirdPartyServices.getCallOTP = async (mobileNo) => {
    try {
        let OTP = Math.floor(1000 + Math.random() * 9000);
        // let OTPString = (OTP+"").split('').join(' ');
        thirdPartyAPI.callOTPAPI.data = {
            "mobileNumber": mobileNo,
            "message": OTP,
            "messageTemplate": "callOTP"
        }
        console.log("thirdPartyAPI.callOTPAPI",thirdPartyAPI.callOTPAPI);
        let apiResp = await Rest.callOTPApi(thirdPartyAPI.callOTPAPI);
        return OTP;
    } catch (err) {
        console.log(err)
        throw new Error('Error in sending SMS. ::' + err.message);
    }

}

module.exports = { ThirdPartyServices }