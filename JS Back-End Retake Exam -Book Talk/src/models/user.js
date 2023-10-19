const mongoose = require('mongoose');
const bcryp = require('bcrypt');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [4, 'Username shoud be at least 4 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email shoud be at least 10 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [3, 'Password shoud be at least 3 characters'],
    },
});

userShema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!');
        };
    });

userShema.pre('save', async function () {
    const hash = await bcryp.hash(this.password, 10);
    this.password = hash;
})

const Users = mongoose.model('User', userShema);

module.exports = Users;