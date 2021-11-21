const google = require('./google_O_Auth2.json')

module.exports = function (req, res) {
    res.send({
        googleClientId: google.web.client_id
    }).status(200)
}