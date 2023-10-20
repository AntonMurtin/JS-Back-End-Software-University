const router = require('express').Router();
const userManager = require('../managers/userManager');
const { errorMessages } = require('../util/errorHelper');

router.get('/login', async (req, res) => res.render('users/login'));

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login({ email, password });
        res.cookie('token', token);
        
        res.redirect('/');
    } catch (error) {
        res.render('users/login', { error: errorMessages(error) });
    }
});

router.get('/register', async (req, res) => res.render('users/register'));

router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        const token = await userManager.register(data);
        res.cookie('token', token);

        res.redirect('/');
    } catch (error) {
        res.render('users/register', { error: errorMessages(error) });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = router;