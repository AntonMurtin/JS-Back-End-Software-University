const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const { errorMessages } = require('../util/errorHelper');
const { isAuth } = require('../middlewares/auth');



router.get('/catalog', async (req, res) => {
    try {
        const crypto = await cryptoManager.getAll();
        res.render('crypto/catalog', { crypto });
    } catch (error) {
        res.render('crypto/catalog', { error: errorMessages(error) });
    }
});

router.get('/create', isAuth, (req, res) => res.render('crypto/create'));
router.post('/create', async (req, res) => {
    const cryptoData = req.body;
    cryptoData.owner = req.user._id;

    try {
        await cryptoManager.create(cryptoData);
        res.redirect('/crypto/catalog');
    } catch (error) {

        res.render('crypto/create', { error: errorMessages(error) });
    }
});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const crypto = await cryptoManager.getById(cryptoId).lean();

        crypto.isOwner = crypto.owner._id == req.user?._id;
        crypto.isBuy = crypto.buy.find(x => x._id == req.user?._id);

        res.render('crypto/details', { ...crypto });
    } catch (error) {
        res.render('crypto/catalog', { error: errorMessages(error) });
    }
})

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user._id;

    try {
        const crypto = await cryptoManager.getById(cryptoId);

        crypto.buy.push(userId);
        crypto.save();

        res.redirect(`/crypto/${cryptoId}/details`)
    } catch (error) {

        res.render(`crypto/details`, { error: errorMessages(error) });
    }
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const crypto = await cryptoManager.getById(cryptoId).lean();
        res.render('crypto/edit', { ...crypto })
    } catch (error) {
        res.render(`crypto/details`, { error: errorMessages(error) });
    }
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;
    try {
        await cryptoManager.edit(cryptoId, cryptoData);
        res.redirect(`/crypto/${cryptoId}/details`)
    } catch (error) {
        res.render(`crypto/details`, { error: errorMessages(error) });
    }
});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    try {
        await cryptoManager.delete(cryptoId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render(`crypto/details`, { error: errorMessages(error) });
    }
});

router.get('/search', isAuth, async (req, res) => {
    const { search, payment } = req.query;

    let crypto;
    if (search || payment) {
        crypto = await cryptoManager.search(search, payment).lean();
    } else {
        crypto = await cryptoManager.getAll().lean()
    }
    res.render('crypto/search', { crypto });
})

module.exports = router;