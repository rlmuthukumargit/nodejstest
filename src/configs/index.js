// const internalAPI = require('./internalAPI');

module.exports = {
    dbConfig: require('./db.config'),
    messages: require('./codeMsgs'),
    statusCodes: require('./httpCodes'),
    config: require('./config'),
    thirdPartyAPI: require('./thirdPartAPI'),
    InternalAPIs:require('./internalAPI')
}