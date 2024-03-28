require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const medList = [];
let currMedID = null;

app.get('/home', (req, res) => {
    const medications = [
      { name: 'Midol', pillsLeft: 26, schedule: '8:00PM', date: 'Mar 27th' },
      { name: 'Vitamin C', pillsLeft: 15, schedule: '6:00PM', date: 'Mar 27th' },
      { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date: 'Apr 12th' },
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
          medicationsToTake.push({...medication, hours, minutes});
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

// a route to handle saving the data on add-medicine-1 form
app.post('/add-medicine-1/save', async(req, res) => {
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
app.post('/add-medicine-2/save', async(req, res) => {
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
    medList[medID] = {...med, ...newMedInfo};
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
app.post('/add-medicine-3/save', async(req, res) => {
  // try to save the new medicine to the database
  try {
    const medID = req.body.medID;
    const med = medList[medID];
    const intakeList = req.body.intakeList;
    medList[medID] = {...med, intakeList: intakeList};
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

module.exports = app