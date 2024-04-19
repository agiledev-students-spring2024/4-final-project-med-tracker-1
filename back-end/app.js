
require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { Medicine, History } = require('./models/Medicine')
const app = express()

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';
// const expiresIn = process.env.EXPIRE_TIME || '1h';

app.use(cors())
app.use(express.static('public'))
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Successfully connected to MongoDB Atlas!');
// }).catch((error) => {
//   console.error('Connection error:', error.message);
// });
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  }).catch((error) => {
    console.error('Connection error:', error.message);
  });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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

const upload = multer({ storage: storage })

app.post('/api/register', async (req, res) => {
  const { username, password, firstname, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    console.log("Received passwords:", { password, confirmPassword });
    return res.status(400).json({ message: "Passwords do not match." });
  }
  if (!username || !password || !firstname) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }
  const userExists = await User.findOne({ email: username });
  if (userExists) {
    return res.status(400).json({ message: "Username already exists." });
  }
  try {
    const user = new User({
      email: username,
      preferredFirstName: firstname,
      password: password,
    });
    await user.save();
    console.log("Pre registered successfully:", user);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const validPassword = password === user.password;
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: Math.floor(Date.now() / 1000) + 15 * 60 });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login." });
  }
});

// Middleware for verifying the token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('no token found')
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).send('Invalid token'); // Invalid JWT
    } else {
      return res.status(500).send('Server error');
    }
  }
};

// Protected route
app.get('/api/verify-token', verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
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
    intakeList: [{ dose: 2, time: '14:30' }]
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
    intakeList: [{ dose: 1, time: '17:30' }]
  }
];

app.get('/home', verifyToken, async (req, res) => {
  function medToTake(med) {
    const currDate = new Date();
    if (med.frequency === 'regular') {
      daysDiff = Math.floor((currDate - med.date) / (1000 * 60 * 60 * 24))
      if (daysDiff % Number(med.interval) === 0)
        return true;
      else
        return false;
    }
    else if (med.frequency === 'specific') {
      currDay = Number(currDate.getDay());
      if (med.selectedDays.includes(currDay))
        return true;
      else
        return false;
    }
    else { // med.frequency === 'as-needed'
      return false;
    }
  }

  function addIntake(user, med) {
    med.intakeList.forEach((intake) => {
      // const newIntake = {...intake, ...med}
      const newIntake = new History({
        medicine: med,
        intake: intake
      })
      user.todayList.todayIntakeList.push(newIntake)
    })
  }
  try {
    const user = req.user;
    const currDate = new Date();

    const formattedDate = currDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    if (currDate.toLocaleDateString() === user.todayList.todayDate.toLocaleDateString()) {
      return res.json({
        currDate: formattedDate,
        intakeListToTake: user.todayList.todayIntakeList, // return the list of med to take today
        status: 'all good',
      })
    }

    user.todayList.todayIntakeList = []
    const medListToTake = user.medList.filter(med => medToTake(med));
    medListToTake.forEach(med => addIntake(user, med));
    console.log("user.todayList.todayIntakeList", user.todayList.todayIntakeList)
    user.todayList.todayIntakeList.sort((a, b) => a.intake.time.localeCompare(b.intake.time))
    await user.save()
    return res.json({
      currDate: formattedDate,
      intakeListToTake: user.todayList.todayIntakeList, // return the list of med to take today
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

// app.get('/home', verifyToken, async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const medListToTake = req.user.medList.filter(med => medToTake(med, currentDate));

//     if (medListToTake.length === 0) {
//       console.log('No medications to send.');
//   }

//     return res.json({
//         currDate: currentDate.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//         }),
//         intakeListToTake: medListToTake,
//     });
//   } catch (err) {
//     console.error("Error in /home route: ", err);
//     return res.status(500).json({ error: 'Failed to load your list of medicines', message: err.message });
//   }
//   });

//   function medToTake(med, currentDate) {
//     if (med.frequency === 'regular') {
//         const daysDiff = Math.floor((currentDate - med.date) / (1000 * 60 * 60 * 24));
//         return daysDiff % Number(med.interval) === 0;
//     } else if (med.frequency === 'specific') {
//         const currDay = Number(currentDate.getDay());
//         return med.selectedDays.includes(currDay);
//     }
//     return false; // "as-needed" frequency does not automatically schedule med
//   }

//   function addIntake(med, intakeListToTake) {
//     med.intakeList.forEach((intake) => {
//         const newIntake = {...intake, ...med};
//         intakeListToTake.push(newIntake);
//     });
//   }

app.get('/history', (req, res) => {
  const endDate = new Date().toISOString().split('T')[0]; // Use today as the end date

  function generateDetailedPastIntakeRecords(med, endDate) {
    let detailedIntakeRecords = [];
    const startDate = new Date(med.date);
    endDate = new Date(endDate);

    let pillsLeft = med.totalAmt;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      let dCopy = new Date(d);
      if (med.frequency === 'regular') {
        const daysDiff = Math.floor((dCopy - startDate) / (1000 * 60 * 60 * 24));
        if (daysDiff % Number(med.interval) === 0) {
          med.intakeList.forEach(intake => {
            if (pillsLeft >= intake.dose) {
              pillsLeft -= intake.dose;
              detailedIntakeRecords.push({
                name: med.medName,
                date: dCopy.toISOString().split('T')[0],
                schedule: intake.time,
                dose: intake.dose,
                pillsLeft,
                photoURL: med.photo
              });
            }
          });
        }
      } else if (med.frequency === 'specific') {
        if (med.selectedDays.includes(dCopy.getDay())) {
          med.intakeList.forEach(intake => {
            if (pillsLeft >= intake.dose) {
              pillsLeft -= intake.dose;
              detailedIntakeRecords.push({
                name: med.medName,
                date: dCopy.toISOString().split('T')[0],
                schedule: intake.time,
                dose: intake.dose,
                pillsLeft,
                photoURL: med.photo
              });
            }
          });
        }
      }
      // avoid infinite loop
      d = dCopy;
    }

    return detailedIntakeRecords;
  }

  try {
    const detailedMedRecords = medList.flatMap(med => generateDetailedPastIntakeRecords(med, endDate));

    res.json(detailedMedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// a route to handle fetch all medicines
app.get('/medicines', verifyToken, (req, res) => {
  try {
    const user = req.user;
    console.log('req.user', user)
    return res.json({
      medList: user.medList, // return the med from db
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      error: err,
      status: 'Failed to load your list of medicines',
    })
  }
})

// a route to handle photo-upload
app.post('/photo-upload', upload.single('file'), async (req, res) => {
  try {
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
app.post('/add-medicine-1/save', verifyToken, async (req, res) => {
  // try to save the new medicine to the database
  console.log('/add-med-1/save')
  try {
    const user = req.user;
    const med = new Medicine({
      medID: (user.medList.length === 0) ? 0 : user.medList[user.medList.length - 1].medID + 1,
      medName: req.body.medName,
      photo: req.body.photo,
      totalAmt: req.body.totalAmt,
      unit: req.body.unit,
      date: new Date()
    })

    user.medList.push(med);
    await user.save()

    // check that the medicine info is properly saved to db
    console.log(user.medList)

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
app.delete('/delete-med/:medID', verifyToken, async (req, res) => {
  try {
    const { medID } = req.params;
    const user = req.user;

    const index = user.medList.findIndex(medicine => medicine.medID == medID)
    if (index == -1) {
      return res.json({ status: 'cannot find medicine to delete' })
    }
    user.medList.splice(index, 1)
    await user.save();
    console.log('after deletion: ', user.medList)
    return res.json({ status: 'all good' })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})


// a route to handle saving the data on add-medicine-2 form
app.post('/add-medicine-2/:medID/save', verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const { medID } = req.params;
    const newMedInfo = req.body;

    let found = false;
    user.medList.forEach(medicine => {
      if (String(medicine.medID) === medID) {
        found = true;
        for (const key in newMedInfo) {
          if (newMedInfo.hasOwnProperty(key)) {
            medicine[key] = newMedInfo[key];
          }
        }
      }
    });

    if (!found) {
      return res.status(404).json({ status: 'cannot find matched medicine' });
    }

    // save the updated med to database
    await user.save();
    console.log(user.medList)

    return res.json({
      med: user.medList,
      status: 'all good',
    })

  } catch (err) {
    console.error(err)
    return res.status(401).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

app.get('/medicine/:medID', verifyToken, (req, res) => {
  try {
    const user = req.user;
    const { medID } = req.params;
    const foundMedArr = user.medList.filter(medicine => {
      return String(medicine.medID) === medID;
    });

    if (foundMedArr.length !== 0) {
      const foundMed = foundMedArr[0];
      console.log('foundMed: ', foundMed)
      return res.json({
        med: foundMed,
        status: 'all good',
      })
    } else {
      return res.status(401).json({
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

// app.put('/medicine/update/:medID', (req, res) => {
//   try{  
//     const { medID } = req.params; 
//     const updates = req.body; 

//     const index = medList.findIndex(medicine => medicine.medID == medID)

//     if (index === -1) {
//       return res.status(404).send({ message: 'Medicine not found' });
//     }

//     const med = medList[index];
//     for (const key in updates) {
//       if (med.hasOwnProperty(key)) {
//         med[key] = updates[key];
//       }
//     }
//     medList[index] = med
//     return res.json({
//       med: medList[index],
//       status: 'all good'
//     })
//   } catch (error) {
//       return res.status(401).json({
//         error: err,
//         status: 'failed med save the updated medicine info to the database',
//       })
//   }
// });
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
app.post('/api/:action-intake', verifyToken, async (req, res) => {
  const { action } = req.params;  // action could be 'confirm', 'later', 'skip'
  const { medName, dose, time } = req.body;
  const user = req.user;  // user should be attached to req in verifyToken middleware

  // Log the action or update the database accordingly
  console.log(`Action ${action} for medication ${medName} at ${time} with dose ${dose}`);

  // Send response
  res.json({ message: `Intake ${action} for ${medName}` });
});


module.exports = app
