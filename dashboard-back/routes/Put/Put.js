const token = require("../../config/Token");

module.exports = function (app) {
    /*
        User
     */
    app.put('/user/edit', token.checkTokenMiddleware, require('./User/editUser'));
    app.put('/user/services/edit', token.checkTokenMiddleware, require('./User/Services'));
}