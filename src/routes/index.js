const initializeRoutes = (app) => {
    app.use('/api/v1/user', require('./v1/user.routes'));
    app.use('/api/v1/auth', require('./v1/auth.routes'));
    app.use('/api/v1/story', require('./v1/story.routes'));
};

module.exports = initializeRoutes;