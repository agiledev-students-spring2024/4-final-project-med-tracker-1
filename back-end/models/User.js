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
    todayList: {
        todayDate: {type: Date, default: new Date("2024-03-24T15:46:48.535Z")},
        todayIntakeList: [historySchema]
    },
    historyList: [historySchema]
}, { collection: 'userinfo' });

const User = mongoose.model('User', userSchema);
module.exports = User;

