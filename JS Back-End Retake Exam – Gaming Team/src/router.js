const router = require('express').Router();

const homeCtr = require('./controlers/homeControler');
const userCtr = require('./controlers/usersControler');
const gameCtr=require('./controlers/gameControler');

router.use(homeCtr);
router.use('/users', userCtr);
router.use('/games',gameCtr);
router.get('*', (req,res)=>{
    res.redirect('/404');
  });

module.exports = router;