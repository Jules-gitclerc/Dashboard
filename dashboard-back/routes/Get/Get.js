const token = require("../../config/Token");

module.exports = function (app) {
    /*
        About fct
     */
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

    /*
        Weather
     */
    app.get('/weather/country', token.checkTokenMiddleware, require('./Weather/DataWeather'));
    app.post('/weather/data', token.checkTokenMiddleware, require('./Weather/weather'));

    /*
        League of legend
     */
    app.get('/leagueOfLegend/item', token.checkTokenMiddleware, require('./ItemLeagueOfLegend/ItemLeagueOfLegend'));
    app.get('/leagueOfLegend/champion', token.checkTokenMiddleware, require('./ItemLeagueOfLegend/champion'));
}