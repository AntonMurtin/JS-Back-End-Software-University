const User = require('../models/user');
const { generateToken } = require('../util/generateToken');
const bcrypt = require('bcrypt');
const { error } = require('../config/constants');

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error(error.userExists);
    };
    const createUser = await User.create(userData);
    const token = await generateToken(createUser);
    return token;
};

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error(error.invalideUser);
    };
    const isValide = await bcrypt.compare(userData.password, user.password);
    if (!isValide) {
        throw new Error(error.invalideUser);
    };
    const token = await generateToken(user);
    return token;
}