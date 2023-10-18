const jwt = require('../lib/jwt');
const { Secret } = require('../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const user = await jwt.verify(token, Secret);
            req.user = user;
            res.locals.user = user;
            res.locals.isAuthenticated = true;
            next();
        } catch (error) {
            res.clearCookie('token');
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.clearCookie('token');
        res.redirect('/users/login');
    }
    next();
}