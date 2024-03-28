require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const medList = [
    {
        medName: "Zestril",
        photo: 'photoURL',
        totalAmt: 96,
        unit: "mg",
        refillAmt: 10,
        frequency: 'regular',
        interval: '1',
        selectedDays: [],
        numIntake: 2,
        intakeList: [{ dose: 5, time: '12:00' }, { dose: 5, time: '19:30' }]
    },
    {
        medName: "Midol",
        photo: 'photoURL',
        totalAmt: 40,
        unit: "mg",
        refillAmt: 5,
        frequency: 'as-needed',
        interval: '',
        selectedDays: [],
        numIntake: 0,
        intakeList: []
    }
    // {
    //     medName: "Fish Oil", 
    //     photo: 'photoURL', 
    //     totalAmt: 38, 
    //     unit: "pill(s)",
    //     refillAmt: 10,
    //     frequency: 'specific',
    //     interval: '',
    //     selectedDays: [2, 4],
    //     numIntake: 1,
    //     intakeList: [{dose: 2, time: '20:30'}]
    // }   
];


let currMedID = null;

app.get('/home', (req, res) => {
    const medications = [
        { name: 'Zestril', pillsLeft: 95, schedule: '12:00PM', date: 'Mar 27th', dose: 1 },
        { name: 'Zestril', pillsLeft: 94, schedule: '7:30PM', date: 'Mar 27th', dose: 1 },
        { name: 'Zestril', pillsLeft: 93, schedule: '12:00PM', date: 'Mar 28th', dose: 1 },
        { name: 'Zestril', pillsLeft: 92, schedule: '7:30PM', date: 'Mar 28th', dose: 1 },
        { name: 'Midol', pillsLeft: 38, schedule: '11:00PM', date: 'Mar 27th', dose: 1 },

    ];

    const now = new Date();
    let medicationsToTake = [];

    medications.forEach(medication => {
        const dateParts = medication.date.match(/(\w+)\s(\d+)[a-z]{2}/);
        const month = dateParts[1];
        const day = parseInt(dateParts[2]);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthNumber = monthNames.indexOf(month);
        const medicationDate = new Date(now.getFullYear(), monthNumber, day);

        if (medicationDate.getFullYear() === now.getFullYear() &&
            medicationDate.getMonth() === now.getMonth() &&
            medicationDate.getDate() === now.getDate()) {
            const scheduleParts = medication.schedule.match(/(\d+):(\d+)(AM|PM)/);
            let hours = parseInt(scheduleParts[1]);
            const minutes = parseInt(scheduleParts[2]);
            const isPM = scheduleParts[3] === 'PM';

            if (isPM && hours < 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;

            if (now.getHours() < hours || (now.getHours() === hours && now.getMinutes() < minutes)) {
                medicationsToTake.push({ ...medication, hours, minutes });
            }
        }
    });

    medicationsToTake.sort((a, b) => {
        if (a.hours === b.hours) {
            return a.minutes - b.minutes;
        }
        return a.hours - b.hours;
    });

    res.json(medicationsToTake);
});

app.get('/history', (req, res) => {
    const medications = [
        { name: 'Zestril', pillsLeft: 95, schedule: '12:00PM', date: 'Mar 27th', dose: 1 },
        { name: 'Zestril', pillsLeft: 94, schedule: '7:30PM', date: 'Mar 27th', dose: 1 },
        { name: 'Zestril', pillsLeft: 93, schedule: '12:00PM', date: 'Mar 28th', dose: 1 },
        { name: 'Zestril', pillsLeft: 92, schedule: '7:30PM', date: 'Mar 28th', dose: 1 },
        { name: 'Midol', pillsLeft: 38, schedule: '11:00PM', date: 'Mar 27th', dose: 1 },

    ];

    const now = new Date();
    let medicationsTaken = [];

    medications.forEach(medication => {
        const dateParts = medication.date.match(/(\w+)\s(\d+)[a-z]{2}/);
        const month = dateParts[1];
        const day = parseInt(dateParts[2]);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthNumber = monthNames.indexOf(month);
        const medicationDate = new Date(now.getFullYear(), monthNumber, day);

        if (medicationDate < now || (medicationDate.toDateString() === now.toDateString())) {
            const scheduleParts = medication.schedule.match(/(\d+):(\d+)(AM|PM)/);
            let hours = parseInt(scheduleParts[1]);
            const minutes = parseInt(scheduleParts[2]);
            const isPM = scheduleParts[3] === 'PM';

            if (isPM && hours < 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;

            const medicationDateTime = new Date(now.getFullYear(), monthNumber, day, hours, minutes);
            if (medicationDateTime <= now) {
                medicationsTaken.push(medication);
            }
        }
    });

    res.json(medicationsTaken);
});

// a route to handle fetch all medicines
app.get('/medicines', (req, res) => {
    try {
        return res.json({
            medList: medList, // return the med saved
            status: 'all good',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'Failed to load your list of medicines',
        })
    }
})

// a route to handle saving the data on add-medicine-1 form
app.post('/add-medicine-1/save', async (req, res) => {
    // try to save the new medicine to the database
    try {
        const med = {
            medID: medList.length,
            medName: req.body.medName,
            photo: req.body.photo,
            totalAmt: req.body.totalAmt,
            unit: req.body.unit
        }
        medList[med.medID] = med;
        currMedID = med.medID;
        return res.json({
            med: med, // return the message we just saved
            status: 'all good',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'failed to save the message to the database',
        })
    }
})

// a route to handle fetch medicine
app.get('/current-medicine', async (req, res) => {
    try {
        const med = medList[currMedID]
        return res.json({
            med: med, // return the med saved
            status: 'all good',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'failed to get the currently editing medicine',
        })
    }
})

// a route to handle saving the data on add-medicine-2 form
app.post('/add-medicine-2/save', async (req, res) => {
    // try to save the new medicine to the database
    try {
        const medID = req.body.medID;
        const med = medList[medID];
        const newMedInfo = {
            refillAmt: req.body.refillAmt,
            frequency: req.body.frequency,
            interval: req.body.interval,
            selectedDays: req.body.selectedDays,
            numIntake: req.body.numIntake
        }
        medList[medID] = { ...med, ...newMedInfo };
        return res.json({
            med: medList[medID], // return the medicine just saved
            status: 'all good',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'failed to save the message to the database',
        })
    }
})

// a route to handle saving the data on add-medicine-3 form
app.post('/add-medicine-3/save', async (req, res) => {
    // try to save the new medicine to the database
    try {
        const medID = req.body.medID;
        const med = medList[medID];
        const intakeList = req.body.intakeList;
        medList[medID] = { ...med, intakeList: intakeList };
        return res.json({
            med: medList[medID], // return the medicine just saved
            status: 'all good',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'failed to save the message to the database',
        })
    }
})


let medicationActions = []; // Assuming this is declared somewhere in your code

app.post('/api/confirm-intake', (req, res) => {
    try {
        const { medName, action, dose, time } = req.body;

        medicationActions.push({ medName, action, dose, time, timestamp: new Date() });
        console.log(medicationActions);
        res.status(200).json({ message: 'Intake confirmed', action: req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while confirming intake.' });
    }
});

app.post('/api/later-intake', (req, res) => {
    try {
        const { medName, action, dose, time } = req.body;
        medicationActions.push({ medName, action, dose, time, timestamp: new Date() });
        res.status(200).json({ message: 'Intake postponed', action: req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while postponing intake.' });
    }
});

app.post('/api/skip-intake', (req, res) => {
    try {
        const { medName, action, dose, time } = req.body;
        medicationActions.push({ medName, action, dose, time, timestamp: new Date() });
        res.status(200).json({ message: 'Intake skipped', action: req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while skipping intake.' });
    }
});


module.exports = app