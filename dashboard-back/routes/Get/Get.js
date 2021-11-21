const token = require("../../config/Token");

module.exports = function (app) {
    /*
        About fct
     */
    app.get('/about', require('./About/about'));
    app.get('/about.json', require('./About/AboutJson'));

    /*
        User
     */
    app.get('/userData', token.checkTokenMiddleware, require('./User/User'));
    app.get('/accessToken', require('./User/AccessToken'));

    /*
        Reddit
     */
    app.get('/apiRedditInfo', token.checkTokenMiddleware, require('./Reddit/ClientApiInfo'));

    /*
        Google
    */
    app.get('/google/O-Auth', require('./Google/GoogleAuth'));
}