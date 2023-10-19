const Book= require('../models/book');

exports.getAll=()=> Book.find();

exports.create=(bookData)=>Book.create(bookData);

exports.getById=(bookId)=>Book.findById(bookId).populate('owner').populate('wishing');

exports.edit=(bookId,bookData)=>Book.findByIdAndUpdate(bookId,bookData);

exports.delete=(bookId)=>Book.findByIdAndDelete(bookId);

exports.getWishBook=(userId)=>Book.find({wishing:{_id:userId}});

//exports.getUserBook=(userId)=>Book.find({owner:userId});