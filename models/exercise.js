// {
//     username: "fcc_test",
//     description: "test",
//     duration: 60,
//     date: "Mon Jan 01 1990",
//     _id: "5fb5853f734231456ccb3b05"
//   }
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
