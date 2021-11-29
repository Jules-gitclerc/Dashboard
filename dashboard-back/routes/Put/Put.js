const token = require("../../config/Token");

module.exports = function (app) {
    /*
        User
     */
    app.put('/user/edit', token.checkTokenMiddleware, require('./User/editUser'));
}