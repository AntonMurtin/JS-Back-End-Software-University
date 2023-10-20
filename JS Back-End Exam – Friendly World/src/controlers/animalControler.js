const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { errorMessages } = require('../util/errorHelper');
const { isAuth } = require('../middlewares/auth');


router.get('/create', (req, res) => {
    res.render('animals/create');
});

router.post('/create', async (req, res) => {
    const animalData = req.body;
    animalData.owner = req.user._id;

    try {
        await animalManager.create(animalData);
        res.redirect('/animals/catalog');

    } catch (error) {
        console.log(errorMessages(error));
        res.render('animals/create', { error: errorMessages(error) });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const animals = await animalManager.getAll().lean();
        res.render('animals/catalog', { animals })
    } catch (error) {
        res.render('animals/catalog', { error: errorMessages(error) })
    }
});

router.get('/:animalId/details', async (req, res) => {
    const animalsId = req.params.animalId;

    try {
        const animal = await animalManager.getById(animalsId).lean();
        animal.isOwner = req.user?._id == animal.owner._id;
        animal.isDonation = animal.donations.find(x => x._id == req.user?._id);

        res.render('animals/details', { ...animal })
    } catch (error) {
        res.render('animals/details', { error: errorMessages(error) })
    }

});

router.get('/:animalId/donation', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    try {
        const animal = await animalManager.getById(animalId);
        animal.donations.push(userId);
        animal.save();

        res.redirect(`/animals/${animalId}/details`)
    } catch (error) {
        res.render('animals/details', { error: errorMessages(error) });
    }
});

router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalManager.getById(animalId).lean();

        res.render('animals/edit', { ...animal })
    } catch (error) {
        res.render('animals/details', { error: errorMessages(error) });

    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalManager.edit(animalId, animalData);

        res.redirect(`/animals/${animalId}/details`)
    } catch (error) {
        console.log(errorMessages(error));
        res.render('animals/details', { error: errorMessages(error) });
    }
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    try {
        await animalManager.delete(animalId);
        res.redirect('/animals/catalog');
    } catch (error) {
        res.render('animals/details', { error: errorMessages(error) });
    }
});


module.exports = router;