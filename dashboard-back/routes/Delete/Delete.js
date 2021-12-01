const token = require("../../config/Token");

module.exports = function (app) {
    /*
        services
     */
    app.delete('/service/widget/:idWidget', token.checkTokenMiddleware, require('./Services/DeleteWidget'))
}