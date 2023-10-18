const Crypto = require('../models/crypto');

exports.getAll = () => Crypto.find().lean();

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getById = (cryptoId) => Crypto.findById(cryptoId).populate('owner').populate('buy');

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.search = (search, payment) => {
    if (search) {

        return Crypto.find({ name: { $regex: search, $options: 'i' } });
    } else {
        return Crypto.find({ payment: payment });
    }
}