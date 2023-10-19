const Game=require('../models/games');

exports.getAll=()=>Game.find();

exports.create=(gameData)=>Game.create(gameData);

exports.getById=(gameId)=>Game.findById(gameId).populate('owner').populate('boughtBy');

exports.edit=(gameId,gameData)=>Game.findByIdAndUpdate(gameId,gameData);

exports.delete=(gameId)=>Game.findByIdAndDelete(gameId);

exports.searchGames=(searchGame)=>Game.find({name:{$regex: searchGame, $options: 'i'}});

exports.searchPlatform=(platform)=>Game.find({platform:platform});