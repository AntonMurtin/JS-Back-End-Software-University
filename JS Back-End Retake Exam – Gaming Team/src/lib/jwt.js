const jsonwebtoken = require('jsonwebtoken');
const util = require('util');


const jwt = {
    sing: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify),
}

module.exports = jwt;