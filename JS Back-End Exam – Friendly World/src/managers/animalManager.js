const Animal=require('../models/Animal');

exports.create=(animalData)=>Animal.create(animalData);

exports.getAll=()=>Animal.find();

exports.getById=(animalId)=>Animal.findById(animalId).populate('owner').populate('donations');

exports.edit=(animalId,animalData)=>Animal.findByIdAndUpdate(animalId,animalData);

exports.delete=(animalId)=>Animal.findByIdAndDelete(animalId);

exports.search=(location)=>Animal.find({location: {$regex: location, $options: 'i'}});