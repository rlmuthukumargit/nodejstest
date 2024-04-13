require("dotenv/config");
module.exports = {
    'smsOTPAPI': {
        method: 'POST',
        url: `${process.env.communicationBaseURL}/sms/send`,
        headers: {
            contentType: 'application/data',
        },
        auth: {
            username: process.env.smsApiUname,
            password: process.env.smsApiPassword
        }
    },
    'callOTPAPI': {
        method: 'POST',
        url: `${process.env.communicationBaseURL}/call/init`,
        headers: {
            contentType: 'application/data',
        },
        auth: {
            username: process.env.smsApiUname,
            password: process.env.smsApiPassword
        }
    }
}