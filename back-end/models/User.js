const mongoose = require('mongoose');
const { MedicineSchema, historySchema } = require('./Medicine.js')


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
    medList: [MedicineSchema],
    todayList: [historySchema],
    historyList: [historySchema]
}, { collection: 'userinfo' });

const User = mongoose.model('User', userSchema);
module.exports = User;

