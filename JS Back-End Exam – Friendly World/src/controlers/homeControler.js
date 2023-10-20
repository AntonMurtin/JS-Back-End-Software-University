const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { errorMessages } = require('../util/errorHelper')

router.get('/', async (req, res) => {

    try {
        const animals = (await animalManager.getAll().lean()).splice(-3)
        res.render('home', { animals })
    } catch (error) {
        res.render('home', { error: errorMessages(error) });
    }
});

router.get('/404', (req, res) => res.render('404'));

router.get('/search', async (req, res) => {

    try {
        animals = await animalManager.getAll().lean();

        res.render('search', { animals })
    } catch (error) {
        res.render('search', { error: errorMessages(error) })
    }
}); router.post('/search', async (req, res) => {
    const location = req.body.location

    let animals;
    try {
        if (location) {
            animals = await animalManager.search(location).lean();
        } else {
            animals = await animalManager.getAll().lean();
        }
        res.render('search', { animals })

    } catch (error) {
        res.render('search', { error: errorMessages(error) })
    }
});


module.exports = router;