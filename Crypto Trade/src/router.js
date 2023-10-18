const router = require('express').Router();

const homeCtr = require('./controlers/homeControler');
const userCtr = require('./controlers/usersControler');
const cryptoCtr = require('./controlers/cryptoControler');

router.use(homeCtr);
router.use('/users', userCtr);
router.use('/crypto', cryptoCtr);
router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;