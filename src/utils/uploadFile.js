const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const { config } = require('./../configs')
const { S3_FOLDER_NAME } = require('./../constants')
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// const errors = require("../responses/response").errors;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}-${file.originalname}`
    );
    //`${file.fieldname}-${uniqueSuffix}.${file.originalname.split(".")[1]}`
    //cb(null, file.originalname);
  },
});

const s3Storage = multerS3({
  s3: s3,
  bucket: function (req, file, cb) {
    let bucket = ""
    console.log("FIELD NAME", file.fieldname)
    if (file.fieldname == S3_FOLDER_NAME.PRODUCT_IMAGES) {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PRODUCT_IMAGES
    }else if(file.fieldname == S3_FOLDER_NAME.BANNER_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BANNER_IMAGES
    }else if(file.fieldname == S3_FOLDER_NAME.PROFILE_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PROFILE_IMAGES
    }else {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.OTHERS
    }
    console.log("Bucket name", bucket)
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req, file, cb) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 5000000 },
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Inside s3 upload", file)
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}-${file.originalname}`
    );
  },
});


const s3StorageByFolderNameQuery = multerS3({
  s3: s3,
  bucket: function (req, file, cb) {
    let bucket = ""
    console.log("FIELD NAME", req.query.fileFolder);
    if (req.query.fileFolder == S3_FOLDER_NAME.PRODUCT_IMAGES) {
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PRODUCT_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.BANNER_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BANNER_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.PROFILE_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PROFILE_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.BLOG_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.BLOG_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.REVIEW_REPORT_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.REVIEW_REPORT_IMAGES
    }else if(req.query.fileFolder == S3_FOLDER_NAME.WORKSHOP_IMAGES){
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.WORKSHOP_IMAGES
    }else { 
      bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.OTHERS
    }
    console.log("Bucket name", bucket);  
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req, file, cb) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 5000000 },
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Inside s3 upload", file)
    cb(
      null,
      `${req.query.fileFolder}-${uniqueSuffix}-${file.originalname}`
    );
  },
}); 


//upload the store csv files from cms
const s3uploaduploadStoresCsv = multerS3({
  s3: s3,
  bucket: function (req, file, cb) {
    let bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.OTHERS
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req, file, cb) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 5000000 },
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Inside s3 upload", file)
    cb(
      null,
      `${S3_FOLDER_NAME.OTHERS}-${uniqueSuffix}-${file.originalname}`
    );
  },
});

const documentFilter = (req, file, cb) => {
  console.log("file inside doc filter", file)
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"||
    file.mimetype == "application/pdf" ||
    file.mimetype == "image/svg+xml" ||
    file.mimetype == "application/msword" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingm" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    console.log(true)
    cb(null, true);
  } else {
    return cb(new Error("Only .png, .jpg, .svg, .doc, .docx and .jpeg format allowed!"));
  }
};

const documentFilterForVideo = (req, file, cb) => {
  console.log("Inside document filter",file.mimetype);
  if (
    file.mimetype == "video/x-flv" ||
    file.mimetype == "video/mp4" ||
    file.mimetype == "application/x-mpegURL" ||
    file.mimetype == "video/MP2T" ||
    file.mimetype == "video/3gpp" ||
    file.mimetype == "video/quicktime" ||
    file.mimetype == "video/x-msvideo" ||
    file.mimetype == "video/x-ms-wmv"||
    file.mimetype == "video/gif"
  ) {
    console.log("valid extensions");
    cb(null, true);
  } else {
    console.log("Not valid extensions");
    return cb(
      new Error(
        "Only video/x-flv,video/mp4,application/x-mpegURL,video/MP2T,video/3gpp,video/quicktime,video/x-msvideo,video/x-ms-wmv format allowed!"
      )
    );
  }
};

const s3StorageForProfilePic = multerS3({
  s3: s3,
  bucket: function (req, file, cb) {
    let bucket = BUCKET_NAME + "/" + S3_FOLDER_NAME.PROFILE_IMAGES;
    cb(null, bucket)
  },
  acl: "public-read",
  contentType: function (req, file, cb) {
    cb(null, file.mimetype)
  },
  limits: { fileSize: 5000000 },
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Inside s3 upload", file)
    cb(
      null,
      `${S3_FOLDER_NAME.GIFCARD_IMAGES}-${uniqueSuffix}-${file.originalname}`
    );
  },
});

const profilePicFilter = (req, file, cb) => {
  console.log("file inside doc filter", file)
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    console.log(true)
    cb(null, true);
  } else {
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const uploadCsv = (req, file, cb) => {
  console.log("uploadCsv file inside doc filter", file)
  if (
    file.mimetype == "text/csv" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

  ) {
    console.log(true)
    cb(null, true);
  } else {
    return cb(new Error("Only csv, xlsx format allowed!"));
  }
};


const upload = multer({
  storage: s3Storage,
  fileFilter: documentFilter,
});

const uploadByQueryPath = multer({
   storage: s3StorageByFolderNameQuery,
  fileFilter: documentFilter,
}); 

const uploadVideo = multer({
  storage: s3Storage,
  fileFilter: documentFilterForVideo,
});

const uploadProfilePic = multer({
  storage: s3StorageForProfilePic,
 fileFilter: profilePicFilter,
}); 

const uploadStoresCsv = multer({
    storage: s3uploaduploadStoresCsv,
    fileFilter: uploadCsv,
});


module.exports = {
  upload,
  uploadVideo,
  uploadByQueryPath,
  uploadProfilePic, 
  uploadStoresCsv, 
}

