const mongoose = require('mongoose');
const { MedicineSchema } = require('./Medicine.js')


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
    medList: [ MedicineSchema ],
/*    todayList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    historyList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
    }] */
}, { collection: 'userinfo' }) ;

const User = mongoose.model('User', userSchema);
module.exports = User;

