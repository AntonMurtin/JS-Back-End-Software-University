const mongoose = require('mongoose');

const { conectionStr, dataBase } = require('./constants');


async function dbConnect() {
    await mongoose.connect(`${conectionStr}/${dataBase}`);
}

module.exports = dbConnect;