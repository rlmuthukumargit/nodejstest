// require('dotenv').config();

module.exports = function (env) {

 const DEV_CONSTANTS = {
    PORT: 27017,
    MONGO_URL: "mongodb://localhost/mytask-users",
    NODE_ENV: process.env.NODE_ENV,
    200: "success", 
    SECRET_KEY: "",
    DB_NAME: "mytask-users",
  };
  const LOCAL_CONSTANTS = {
    PORT: 27017,
    MONGO_URL: "mongodb://localhost/mytask-users",
    NODE_ENV: process.env.NODE_ENV,
    200: "success", 
    SECRET_KEY: "",
    DB_NAME: "mytask-users",
  };
 
  const PROD_CONSTANTS = {
    //PORT: process.env.PORT,
    PORT: 27017,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    200: "success", 
    SECRET_KEY: "",
    DB_NAME: "mytask-users",
  };  
 
  const PREPROD_CONSTANTS = {
    //PORT: process.env.PORT,
    PORT: 27017,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    200: "success",
    SECRET_KEY: "",
    DB_NAME: "mytask-users",
  };
  let envType;

  switch(env){
      
    case "DEV": envType = DEV_CONSTANTS;
                break;

    case "LOCAL": envType = LOCAL_CONSTANTS;
                break;
    
    case "PROD": envType = PROD_CONSTANTS;
                break;

    case "PREPROD": envType = PREPROD_CONSTANTS;
                break;
                
    default   : envType = {NA: "NA"};
                break;
  }

  return envType;
};
