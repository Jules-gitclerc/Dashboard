const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.use(bodyParser.json());


    require('./Get/Get')(app);
    require('./Post/Post')(app);
    require('./Put/Put')(app);
    require('./Delete/Delete')(app);
};