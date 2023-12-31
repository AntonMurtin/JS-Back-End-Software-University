const handlebars = require('express-handlebars');

const path = require('path');

function hbsConfig(app) {
    app.set('views', path.resolve(__dirname, '../views'));
    app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs')
}

module.exports = hbsConfig;
