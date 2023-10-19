const router = require('express').Router();
const bookmanager = require('../managers/bookManager');
const { errorMessages } = require('../util/errorHelper');
const { isAuth } = require('../middlewares/auth')

router.get('/catalog', async (req, res) => {

    try {
        const books = await bookmanager.getAll().lean();

        res.render('books/catalog', { books });
    } catch (error) {
        res.render('books/catalog', { error: errorMessages(error) });
    }
});

router.get('/create', isAuth, (req, res) => res.render('books/create'));
router.post('/create', async (req, res) => {
    const bookData = req.body;
    bookData.owner = req.user._id;
    
    try {
        await bookmanager.create(bookData);

        res.redirect('/books/catalog');
    } catch (error) {
        res.render('books/create', { error: errorMessages(error) });
    }
});

router.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookmanager.getById(bookId).lean();

        book.isOwner = book.owner._id == req.user?._id;
        book.isWishing = book.wishing.find(x => x._id == req.user?._id);

        res.render('books/details', { ...book });
    } catch (error) {
        res.render('books/catalog', { error: errorMessages(error) });
    }
});

router.get('/:bookId/wish', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    try {
        const book = await bookmanager.getById(bookId);
        book.wishing.push(userId);
        book.save();

        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        res.render('books/details', { error: errorMessages(error) });
    }
});

router.get('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookmanager.getById(bookId).lean();

        res.render('books/edit', { ...book });
    } catch (error) {
        res.render('books/edit', { error: errorMessages(error) });
    }
});
router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    try {
        await bookmanager.edit(bookId, bookData);

        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        res.render('books/edit', { error: errorMessages(error) });
    }
});

router.get('/:bookId/delete', isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        await bookmanager.delete(bookId);

        res.redirect('/books/catalog');
    } catch (error) {
        res.render('books/edit', { error: errorMessages(error) });
    }
});

router.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;
    const user = req.user;
    
    try {
        const wishBook = await bookmanager.getWishBook(userId).lean();
        //const userBook= await bookmanager.getUserBook(userId).lean()

        res.render('books/profile', { user, wishBook });
    } catch (error) {
        res.render('books/profile', { error: errorMessages(error) });
    }
});

module.exports = router;