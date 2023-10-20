const express = require('express');

const expressConfig = require('./config/express');
const hbsConfig = require('./config/handlebars');
const dbConnect = require('./config/mongoose');
const { port } = require('./config/constants');

const routes = require('./router');

const app = express();

expressConfig(app);
hbsConfig(app);
dbConnect()
    .then(console.log('Db is conect'))
    .catch((err) => console.log(`Db error:${err}`));

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));