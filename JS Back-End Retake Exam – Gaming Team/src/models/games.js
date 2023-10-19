const mongoose = require('mongoose');

const gamesShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'Name shoud be at least 4 characters'],
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, ' Invalid URL!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description shoud be at least 10 characters'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [2, 'Genre shoud be at least 2 characters'],
    },
    platform: {
        type: String,
        required: [true, 'Platform is required!'],
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
    },

    boughtBy: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Game = mongoose.model('Game', gamesShema);

module.exports = Game;
