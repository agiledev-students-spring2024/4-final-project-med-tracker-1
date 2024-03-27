require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const medList = [];
let currMedID = null;

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