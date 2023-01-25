const mongoose = require('mongoose');
const Exercise = require('./exercise');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    exercises: [{
        type: Object,
        ref: 'Exercise',
        required: false
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;