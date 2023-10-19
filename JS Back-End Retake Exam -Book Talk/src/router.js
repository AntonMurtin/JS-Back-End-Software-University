const router = require('express').Router();

const homeCtr = require('./controlers/homeControler');
const userCtr = require('./controlers/usersControler');
const bookCtr=require('./controlers/bookControler');

router.use(homeCtr);
router.use('/users', userCtr);
router.use('/books',bookCtr);
//router.get('*', (req,res)=>{
   // res.redirect('/404');
 // });

module.exports = router;