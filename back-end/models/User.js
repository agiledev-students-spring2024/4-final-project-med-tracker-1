const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
