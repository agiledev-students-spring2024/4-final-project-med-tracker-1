const mongoose = require('mongoose')

const IntakeSchema = new mongoose.Schema(
    {
        dose: Number,
        time: String
    }
)
const MedicineSchema = new mongoose.Schema(
    {
        medID: Number,
        medName: String,
        photo: String,
        totalAmt: Number,
        unit: String,
        date: Date,
        refillAmt: Number,
        frequency: { type: String, enum: ['regular', 'specific', 'as-needed'] },
        interval: Number,
        selectedDays: Array,
        numIntake: Number,
        intakeList: [IntakeSchema]
    }
)
const historySchema = new Mongoose.Schema({
    medicine: MedicineSchema,
    Intake: IntakeSchema,
    reminderId: Number
});

const Medicine = mongoose.model('Medicine', MedicineSchema)

module.exports = {
    MedicineSchema,
    Medicine
}