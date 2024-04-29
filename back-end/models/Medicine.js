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
const TodayIntakeSchema = new mongoose.Schema({
    medicine: MedicineSchema,
    intake: IntakeSchema
});

const HistorySchema = new mongoose.Schema({
    intakeTime: {type: Date, default: new Date()},
    intakeMed: TodayIntakeSchema
})

const Medicine = mongoose.model('Medicine', MedicineSchema)
const TodayIntake = mongoose.model('TodayIntake', TodayIntakeSchema)
const History = mongoose.model('History', HistorySchema)

module.exports = {
    MedicineSchema,
    Medicine,
    TodayIntakeSchema,
    TodayIntake,
    HistorySchema,
    History
}