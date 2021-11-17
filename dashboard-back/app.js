const express = require('express');
const app = express();

require('./routes/routes')(app);

app.listen(8080, function () {
  console.log('Listening on port 8080.');
});
