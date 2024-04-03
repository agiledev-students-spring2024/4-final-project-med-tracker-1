
require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

let users = {};

const mockUser = {
    username: 'user@example.com',
    password: 'password123',
    firstname: 'Yvette'
};
const mockUser2 = {
    firstName: 'Katie',
    username: 'ky7821@nyu.edu',
    password: 'katie0918'
}
app.get('/api/user-settings', (req, res) => {
    console.log(mockUser2);
    res.json(mockUser2);
});
app.post('/api/update-settings', (req, res) => {
    const { firstName } = req.body;
    mockUser2.firstName = firstName;


    // Assuming you have a way to identify the current user (e.g., session, JWT token)
    // Update the user's first name in your data store

    res.json({ message: 'Settings updated successfully' });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/med-images')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage: storage})

app.post('/api/register', (req, res) => {
  const { username, password, firstname, confirmPassword } = req.body;

  if (!username || !password || !firstname) {
      return res.status(400).send({ success: false, message: "Username, password, and first name are required." });
  }

  if (password !== confirmPassword) {
      return res.status(409).send({ success: false, message: "Passwords do not match." });
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

const medList = [
    {
        medID: 0,
        medName: "Zestril",
        photo: '1712007021822_zestril.jpeg',
        totalAmt: 96,
        unit: "mg",
        date: new Date("2024-03-24T15:46:48.535Z"),
        refillAmt: 10,
        frequency: 'regular',
        interval: '1',
        selectedDays: [],
        numIntake: 2,
        intakeList: [{ dose: 5, time: '12:00' }, { dose: 5, time: '19:30' }]
    },
    {
        medID: 1,
        medName: "Midol",
        photo: '1712009434896_midol.jpeg',
        totalAmt: 40,
        unit: "pill(s)",
        date: new Date("2024-03-14T15:46:48.535Z"),
        refillAmt: 5,
        frequency: 'as-needed',
        interval: '',
        selectedDays: [],
        numIntake: 0,
        intakeList: []
    },
    {
        medID: 2,
        medName: "Fish Oil", 
        photo: '1712009213743_fish_oil.jpeg', 
        totalAmt: 38, 
        unit: "pill(s)",
        date: new Date("2024-03-14T15:46:48.535Z"),
        refillAmt: 10,
        frequency: 'specific',
        interval: '',
        selectedDays: [0, 2, 4],
        numIntake: 1,
        intakeList: [{dose: 2, time: '14:30'}]
    },
    {
        medID: 3,
        medName: "Vitamin C", 
        photo: '1712009536243_vitaminC.jpeg', 
        totalAmt: 38, 
        unit: "pill(s)",
        date: new Date("2024-03-14T15:46:48.535Z"),
        refillAmt: 10,
        frequency: 'specific',
        interval: '',
        selectedDays: [3, 5, 6],
        numIntake: 1,
        intakeList: [{dose: 1, time: '17:30'}]
    }      
];

app.get('/home', (req, res) => {
  const intakeListToTake = [];
  function medToTake(med) {
    const currDate = new Date();
    if(med.frequency === 'regular'){
      daysDiff = Math.floor((currDate - med.date)/(1000 * 60 * 60 * 24))
      if(daysDiff % Number(med.interval) === 0)
        return true;
      else
        return false;
    } 
    else if (med.frequency === 'specific') {
      currDay = Number(currDate.getDay());
      if(med.selectedDays.includes(currDay))
        return true;
      else
        return false;
    } 
    else { // med.frequency === 'as-needed'
      return false;
    }
  }

  function addIntake(med) {
    med.intakeList.forEach((intake) => {
      const newIntake = {...intake, ...med}
      intakeListToTake.push(newIntake)
    })    
  }
  try {
    const medListToTake = medList.filter(med => medToTake(med));
    medListToTake.forEach(med => addIntake(med));
    intakeListToTake.sort((a, b) => a.time.localeCompare(b.time))
    console.log('intakeListToTake: ', intakeListToTake);    
    return res.json({
        intakeListToTake: intakeListToTake, // return the list of med to take today
        status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'Failed to load your list of medicines',
    })
  } 
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

// a route to handle photo-upload
app.post('/photo-upload', upload.single('file'), async(req, res) => {
  try{
    if (req.file) {
      console.log(req.file)
      return res.json({
        photo: req.file,
        status: 'all good'
      })
    } else {
      return res.json({
        photo: req.file,
        status: 'failed to save uploaded image'
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the image to database',
    })
  } 
})

// a route to handle saving the data on add-medicine-1 form
app.post('/add-medicine-1/save', async(req, res) => {
  // try to save the new medicine to the database
  try {
    const med = {
        medID: medList[medList.length - 1].medID + 1,
        medName: req.body.medName, 
        photo: req.body.photo, 
        totalAmt: req.body.totalAmt, 
        unit: req.body.unit,
        date: new Date()
    }
    medList.push(med);
    return res.json({
      med: med, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the medicine info to the database',
    })
  }    
})

// a route to handle deleting a medicine
app.delete('/delete-med/:medID', async(req, res) => {
  try {
    const { medID } = req.params; 
    const index = medList.findIndex(medicine => medicine.medID == medID)
    if (index !== -1){
      medList.splice(index, 1)
      console.log('after deletion: ', medList)
      return res.json({ status: 'all good' })
    } 
    else {
      return res.json({ status: 'cannot find medicine to delete' })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// a route to handle saving the data on add-medicine-2 form
app.post('/add-medicine-2/:medID/save', async(req, res) => {
  // try to save the new medicine to the database
  try {
    const { medID } = req.params; 
    const newMedInfo = req.body;
    const index = medList.findIndex(medicine => medicine.medID == medID)
    
    if (index !== -1){
      const med = medList[index];
      medList[index] = {...med, ...newMedInfo};
      return res.json({
        med: medList[medID], // return the medicine just saved
        status: 'all good',
      })
    } else {
      return res.json({ status: 'cannot find matched medicine' })
    }

  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }    
})

app.get('/medicine/:medID', (req, res) => {
  try {
    const {medID} = req.params;
    const index = medList.findIndex(medicine => medicine.medID == medID)
    if(index !== -1){
      const foundMed = medList[index];
      console.log('foundMed: ', foundMed)
      return res.json({
        med: foundMed,
        status: 'all good',
      })
    } else {
      return res.status(400).json({
        error: 'no matched medID',
        status: 'failed to find the med using medID',
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to find the med using medID',
    })
  }   
})

app.put('/medicine/update/:medID', (req, res) => {
  try{  
    const { medID } = req.params; 
    const updates = req.body; 

    const index = medList.findIndex(medicine => medicine.medID == medID)
    
    if (index === -1) {
      return res.status(404).send({ message: 'Medicine not found' });
    }
    
    const med = medList[index];
    for (const key in updates) {
      if (med.hasOwnProperty(key)) {
        med[key] = updates[key];
      }
    }
    medList[index] = med
    return res.json({
      med: medList[index],
      status: 'all good'
    })
  } catch (error) {
      return res.status(400).json({
        error: err,
        status: 'failed to save the message to the database',
      })
  }
});
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
let medicationIntakeActions = []; // Store medication intake actions

// Route to handle confirming medication intake
app.post('/api/refill-confirm', (req, res) => {
    try {
        const { medName, dose, time } = req.body;
        const action = 'confirm';

        medicationIntakeActions.push({ medName, action, dose, time, timestamp: new Date() });
        console.log('Medication intake actions:', medicationIntakeActions);
        res.status(200).json({ message: 'Medication intake confirmed', medName, dose, time });
    } catch (error) {
        console.error('Error confirming medication intake:', error);
        res.status(500).json({ message: 'An error occurred while confirming medication intake.' });
    }
});

// Route to handle postponing medication intake
app.post('/api/refill-later', (req, res) => {
    try {
        const { medName, dose, time } = req.body;
        const action = 'postpone';

        medicationIntakeActions.push({ medName, action, dose, time, timestamp: new Date() });
        console.log('Medication intake actions:', medicationIntakeActions);
        res.status(200).json({ message: 'Medication intake postponed', medName, dose, time });
    } catch (error) {
        console.error('Error postponing medication intake:', error);
        res.status(500).json({ message: 'An error occurred while postponing medication intake.' });
    }
});

// Route to handle skipping medication intake
app.post('/api/refill-skip', (req, res) => {
    try {
        const { medName, dose, time } = req.body;
        const action = 'skip';

        medicationIntakeActions.push({ medName, action, dose, time, timestamp: new Date() });
        console.log('Medication intake actions:', medicationIntakeActions);
        res.status(200).json({ message: 'Medication intake skipped', medName, dose, time });
    } catch (error) {
        console.error('Error skipping medication intake:', error);
        res.status(500).json({ message: 'An error occurred while skipping medication intake.' });
    }
});



module.exports = app
