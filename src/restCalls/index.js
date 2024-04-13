const axios = require('axios');

class Rest { }

Rest.prototype.callOTPApi = async (request) => {
    try {
        const  apiKey = process.env.AUTHKEY;         
        const  template =  process.env.OTP_TEMPLATE_ID;

        let requestOptions = {
            method: 'get',
            url: "https://api.msg91.com/api/v5/otp?template_id="+template+"&mobile="+request.mobileNumber+"&authkey="+apiKey+"&otp="+request.otp

        };
        
        let otpRes = await axios(requestOptions);
        return otpRes.data;
    } catch (err) {
        console.log('Error in Rest Call', err);
        return err.response.data
    }
}


Rest.prototype.callApi = async (request) => {
    try {
      console.log(request);
      let restResult = await axios(request);
      return restResult.data;
    } catch (err) {
      //console.log("))))))))))))))", err);
      throw new Error(  
        JSON.stringify({
          code: err.response.status,
          message: err.response.statusText,
        })
      );
    }
  };

module.exports = {
    Rest: new Rest()
}