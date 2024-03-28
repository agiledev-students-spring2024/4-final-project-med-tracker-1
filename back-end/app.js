
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
        intakeList: [{dose: 5, time: '12:00'}, {dose: 5, time: '19:30'}]
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
=======
require('dotenv').config({ silent: true }); // Load environmental variables from .env
const express = require('express');
const app = express();

app.use(express.json());

let users = {};

const mockUser = {
  username: 'user@example.com',
  password: 'password123',
  firstname: 'Yvette'
};

app.post('/api/register', (req, res) => {
  const { username, password, firstname } = req.body; 

  if (!username || !password || !firstname) {
    return res.status(400).send({ success: false, message: "Username, password, and first name are required." });
  }

  if (users[username] || (mockUser.username === username)) {
    return res.status(409).send({ success: false, message: "User already exists." });
  }

  users[username] = { username, password, firstname }; 
  res.send({ success: true, message: "Registration successful." });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.send({ success: true, message: `Login successful with mock user: ${mockUser.firstname}.` });
  }

  if (users[username] && users[username].password === password) {
    return res.send({ success: true, message: `Login successful with registered user: ${users[username].firstname}.` });
  }

  res.status(401).send({ success: false, message: "Invalid credentials." });
});

module.exports = app;
