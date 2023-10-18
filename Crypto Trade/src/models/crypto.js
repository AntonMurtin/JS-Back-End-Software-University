const mongoose = require('mongoose');

const cryptoShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name shoud be at least 2 characters']
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, ' Invalid URL!']
    },
    price: {
        type: Number,
        required: [true, 'Prise is required!'],
        min: [0, 'Prise must be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description shoud be at least 10 characters'],
    },
    payment: {
        type: String,
        required: [true, 'Location is required!'],
        enum: ["Crypto Wallet", "Credit Card", "Debit Card", "PayPal"],
    },
    buy: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

});

const Crypto = mongoose.model('Crypto', cryptoShema);

module.exports = Crypto;