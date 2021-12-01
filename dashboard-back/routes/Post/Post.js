const token = require("../../config/Token");

module.exports = function (app) {
    /*
        User
     */
    app.post('/createAccount', require('./User/CreateAccount'));
    app.post('/login', require('./User/Login'));
    app.post('/disconnect', token.checkTokenMiddleware, require('./User/Disconnect'));
    app.post('/identified', require('./User/Identified'));

    /*
        Services
     */
    app.post('/service/widget', token.checkTokenMiddleware, require('./Services/AddNewServices'));

    /*
        Theme
     */
    app.post('/theme', token.checkTokenMiddleware, require('./Theme/changeTheme'));
}