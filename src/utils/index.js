const bcrypt = require("bcrypt");
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
// const objectID = require("mongodb").ObjectID;
const objectID = require('mongoose').Types.ObjectId;

const CRYPTLIB_SECRET_KEY = process.env.CRYPTLIB_SECRET_KEY;
//var CryptoJS = require('crypto-js');
const cryptLib = require('@skavinvarnan/cryptlib');


module.exports = {
    genHash: function (data) {
        let salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(data, salt);
    },
    cleanSensitiveData: function (data) {
        (data.password) ? data.password = "" : data;
        return data;
    },
    pagingData: require("./pagination"),
    upload: require("./uploadFile").upload,
    uploadVideo: require("./uploadFile").uploadVideo,
    uploadByQueryPath: require("./uploadFile").uploadByQueryPath,
    uploadProfilePic: require("./uploadFile").uploadProfilePic,
    uploadStoresCsv: require("./uploadFile").uploadStoresCsv,
    currentDate: function (format = "YYYY-MM-DD") {
        return moment(new Date()).tz('Asia/kolkata').format(format)
    },
    currentTime: function (format = "HH:mm:ss") {
        return moment(new Date()).tz('Asia/kolkata').format(format)
    },
    currentDateTime: function () {
        return +moment(new Date()).tz('Asia/kolkata')
    },
    generateAccessToken: function (data) {
        // return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
        return jwt.sign(data, process.env.JWT_SECRET);
    },
    dateFormat: (date) => {
        let curDate = date.getDate();
        curDate = curDate <= 9 ? '0' + curDate : curDate;
        let month = date.getMonth() + 01;
        let year = date.getFullYear();
        let finalMonth = ("0" + month).slice(-2)
        return `${curDate}/${finalMonth}/${year}`;
    },
    countryCodeValidadtor: (value, helper) => {
        var countryCodeRegex = /^(\+?\d{1,3}|\d{1,4})$/gm;
        if (!value.match(countryCodeRegex)) {
            return helper.message("Invalid Country Code")
        }
        return value;
    },
    mobileNumValidator: (value, helper) => {
        var mobileNumberRegex = /^[a-zA-Z0-9\-().\s]{10}$/gm;
        if (!value.match(mobileNumberRegex)) {
            return helper.message("Invalid Mobile Number")
        }
        return value;
    },
    objectIDValidator: (value, helper) => {
        if (!objectID.isValid(value)) {
            return helper.message("Invalid ObjectID")
        }
        return value;

    },
    setOTPType: (otpType) => {
        return (req, res, next) => {
            req.otpType = otpType;
            next();
        };

    },

getDecrptedData: async (encryptedData) => { // decrypt 
        // Decrypt
        // let originalText = '';
        // const bytes = CryptoJS.AES.decrypt(encryptedData, secret_key);
        // originalText = bytes.toString(CryptoJS.enc.Utf8);     
        // return originalText;
        const decryptedString = cryptLib.decryptCipherTextWithRandomIV(encryptedData, CRYPTLIB_SECRET_KEY);
        console.log('decryptedString is ', decryptedString);
        return decryptedString;
    },    
    getEncrptedData: async (text) => {// Encrypt     
        const cipherText = cryptLib.encryptPlainTextWithRandomIV(text, CRYPTLIB_SECRET_KEY);
        console.log('cipherText is', cipherText); 
        return cipherText;
    }



}
//console.log(cryptLib.encryptPlainTextWithRandomIV('Test@12', CRYPTLIB_SECRET_KEY));
//console.log(cryptLib.encryptPlainTextWithRandomIV('Test@123', CRYPTLIB_SECRET_KEY));