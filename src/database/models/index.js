const { dbConfig } = require("./../../configs")

dbConfig();

module.exports = {
    user:require("./user.model"),
    userSession:require("./userSession.model"),
    userActivity:require('./userActivity.model'),
    deletedUser: require('./deletedUser.model'), 
    story: require('./story.model'), 
};