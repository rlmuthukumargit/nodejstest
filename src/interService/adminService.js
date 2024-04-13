const axios = require('axios');
const ADMIN_SERVICE = process.env.ADMIN_SERVICE;

class adminService {};

adminService.referralCodeList = async (input) => {
    console.log("@Service adminService @Method referralCodeList @Message input");
    try {
        const response = await axios.get(`${ADMIN_SERVICE}/referralCode/byCustomerId?userId=${input.userId}`);
        return (response.data && response.data.data) ? response.data.data: {};
    } catch (error) {
        console.log("@Service adminService @Method referralCodeList @Message ERROR :", error);
        return { status: false,  message: error.message };
    }
};

adminService.getSingleReferralCode = async (referralCode) => {
    console.log("@Service adminService @Method getSingleReferralCode @Message input");
    try {
        const response = await axios.get(`${ADMIN_SERVICE}/referralCode/details?code=${referralCode}`);
        return (response.data && response.data.data) ? response.data.data: {};
    } catch (error) {
        console.log("@Service adminService @Method getSingleReferralCode @Message ERROR :", error);
        return { status: false,  message: error.message };
    }
};

adminService.getReferralBenifit = async (referralCode) => {
    console.log("@Service adminService @Method getReferralBenifit @Message input");
    try {
        const response = await axios.get(`${ADMIN_SERVICE}/siteSettings/getReferralBenifit`);
        return (response.data && response.data.data) ? response.data.data: {};
    } catch (error) {
        console.log("@Service adminService @Method getReferralBenifit @Message ERROR :", error);
        return { status: false,  message: error.message };
    }
};

module.exports = adminService;