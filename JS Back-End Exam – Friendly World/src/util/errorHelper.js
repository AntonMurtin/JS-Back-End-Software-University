const { MongooseError, Error } = require('mongoose');

exports.errorMessages = (err) => {
    if (err instanceof MongooseError || err instanceof Error) {
        return Object.values(err.errors).map(x => x.message);
    } else {
        return [err.message];
    };
};