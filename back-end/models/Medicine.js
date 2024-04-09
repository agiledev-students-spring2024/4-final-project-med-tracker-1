const mongoose = require('mongoose')

const IntakeSchema = new mongoose.Schema(
    {
        dose: Number,
        time: Date
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
        frequency: {type: String, enum: ['regular', 'specific', 'as-needed']},
        interval: Number,
        selectedDays: Array,
        numIntake: Number,
        intakeList: [IntakeSchema]
    }
)
mongoose.model('Intake', IntakeSchema)
mongoose.model('Medicine', MedicineSchema)

mongoose.connect('mongodb://localhost/med-tracker');