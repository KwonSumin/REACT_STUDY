const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const api = require('./routes/index');
const test = require('./routes/test');
app.use(bodyParser.json());
app.use('/api', api);
app.use('/api/test', test);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));