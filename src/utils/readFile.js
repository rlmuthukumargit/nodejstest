"use strict"
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});


class readFileAws { }

readFileAws.readFileFromAws = async (bucketName,fileKeyName) => {
    console.log("@Controller readFileFromAws.js ^^^^^^^^^^^^^^^^^^ ");
    try {

        var params = {
            Bucket: bucketName,
            Key: fileKeyName
        };

        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data) => {
                if (err) {
                    return reject({
                        'status': false,
                        'result': err
                    })
                }
                else {
                    console.log('elseeeeeeeeeeeeeeeeee');
                    return resolve({
                        'status': true,
                        'result': (data && data.Body) ? data.Body : ""
                    })

                }// successful response
            });

        })


    } catch (err) {
        console.log("@Controller readFileFromAws.js ", err);
        return err
    }
}


module.exports = readFileAws;