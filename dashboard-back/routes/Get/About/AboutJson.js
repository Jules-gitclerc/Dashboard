const moment = require('moment');

module.exports = function(req, res) {
    res.json({
        client: {
            host: req.connection.remoteAddress.replace(/^.*:/, '')
        },
        server: {
            current_time: moment().unix(),
        },
    })
}