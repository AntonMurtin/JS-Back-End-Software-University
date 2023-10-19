const router = require('express').Router();

const gameManager = require('../managers/gameManager');

const { isAuth } = require('../middlewares/auth');
const { errorMessages } = require('../util/errorHelper');


router.get('/catalog', async (req, res) => {

    try {
        const games = await gameManager.getAll().lean();

        res.render('games/catalog', { games });
    } catch (error) {
        res.render('games/catalog', { eroor: errorMessages(error) });
    }
});

router.get('/create', isAuth, (req, res) => res.render('games/create'));

router.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;
    gameData.owner = req.user._id;

    try {
        await gameManager.create(gameData);

        res.redirect('/games/catalog')
    } catch (error) {
        console.log(errorMessages(error));
        res.render('games/create', { error: errorMessages(error) });
    }
});

router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getById(gameId).lean();
        game.isOwner = game.owner._id == req.user?._id;
        game.isBuy = game.boughtBy.find(x => x._id == req.user?._id);

        res.render('games/details', { ...game });
    } catch (error) {
        res.render('games/details', { error: errorMessages(error) });
    }
});

router.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getById(gameId);
        game.boughtBy.push(req.user._id);
        game.save();

        res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        res.render('games/details', { error: errorMessages(error) });
    }
});

router.get('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getById(gameId).lean();

        res.render('games/edit', { ...game });
    } catch (error) {
        res.render('games/details', { error: errorMessages(error) });
    }
});

router.post('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        await gameManager.edit(gameId, gameData);

        res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        res.render('games/details', { error: errorMessages(error) });

    }
});

router.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameManager.delete(gameId);

        res.redirect('/games/catalog');
    } catch (error) {
        log
        res.render('games/details', { error: errorMessages(error) });
    }
});

router.get('/search', isAuth, async (req, res) => {

    try {
        games = await gameManager.getAll().lean();

        res.render('games/search', { games });
    } catch (error) {
        res.render('games/search', { error: errorMessages(error) });
    }
});

router.post('/search', isAuth, async (req, res) => {
    const { searchGame, platform } = req.body;
    let games;

    try {
        if (searchGame) {
            games = await gameManager.searchGames(searchGame).lean();
        } else if (platform) {
            games = await gameManager.searchPlatform(platform).lean();
        }else{
            games = await gameManager.getAll().lean();
        }
        res.render('games/search', { games });
    } catch (error) {
        res.render('games/search', { error: errorMessages(error) });
    }
});

module.exports = router;