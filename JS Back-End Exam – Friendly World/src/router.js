const router = require('express').Router();

const homeCtr = require('./controlers/homeControler');
const userCtr = require('./controlers/usersControler');
const animalCtr=require('./controlers/animalControler');

router.use(homeCtr);
router.use('/users', userCtr);
router.use('/animals',animalCtr);
router.get('*', (req,res)=>{
    res.redirect('/404');
  });

module.exports = router;