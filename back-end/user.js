const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    preferredFirstName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    medList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication'
    }],
    todayList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    historyList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
