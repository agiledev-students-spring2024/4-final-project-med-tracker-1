
require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { Medicine, TodayIntake, History } = require('./models/Medicine')
const app = express()

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';
// const expiresIn = process.env.EXPIRE_TIME || '1h';

app.use(cors())
app.use(express.static('public'))
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  }).catch((error) => {
    console.error('Connection error:', error.message);
  });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: username,
      preferredFirstName: firstname,
      password: hashedPassword,
    });
    await user.save();
    console.log("Pre registered successfully:", user);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const { newPassword } = req.body;
  try {
      const user = await User.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ ok: false, message: "User not found." });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
      res.json({ ok: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Failed to reset password." });
  }
});



app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {expiresIn: Math.floor(Date.now() / 1000) + 15 * 60 });
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

app.get('/api/user-settings', verifyToken, (req, res) => {
  res.json({
    ok: true,
    firstName: req.user.preferredFirstName,
    username: req.user.email
  });
});

app.post('/api/update-settings', verifyToken, async (req, res) => {
  try {
    const { firstName } = req.body;
    const user = req.user;
    if (firstName) {
      user.preferredFirstName = firstName;
      await user.save();
      res.json({
        ok: true,
        user: user,
        message: 'Settings updated successfully',
        status: 'all good'
      });
    }
    else {
      console.log('error 1')
      throw new Error('Fail to get the new first name')
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({
      ok: false,
      error: error,
      status: 'Failed to save new first name'
    })
  }
});

// Protected route
app.get('/api/verify-token', verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

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
    const newIntake = new TodayIntake({
      medicine: med,
      intake: intake
    })
    user.todayList.todayIntakeList.push(newIntake)
  })
}

app.get('/home', verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const currDate = new Date();

    const formattedDate = currDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    if (currDate.toLocaleDateString() === user.todayList.todayDate.toLocaleDateString()) {
      console.log('rendering todayList from database...')
      return res.json({
        currDate: formattedDate,
        intakeListToTake: user.todayList.todayIntakeList, // return the list of med to take today
        status: 'all good',
      })
    }

    console.log('re-calculating todayList...')
    user.todayList.todayIntakeList = []
    const medListToTake = user.medList.filter(med => medToTake(med));
    medListToTake.forEach(med => addIntake(user, med));
    console.log("user.todayList.todayIntakeList", user.todayList.todayIntakeList)
    user.todayList.todayIntakeList.sort((a, b) => a.intake.time.localeCompare(b.intake.time))
    user.todayList.todayDate = currDate;
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

app.get('/history', verifyToken, (req, res) => {
  console.log('User:', req.user);
  if (!req.user || !req.user.historyList) {
    console.error("User or user historyList undefined");
    return res.status(500).json({ message: "Internal server error, user data missing" });
  }

  try {
    res.json(req.user.historyList);
  } catch (error) {
    console.error("Failed to fetch history:", error);
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
    let takeFlag = false;
    let foundMed;
    user.medList.forEach(medicine => {
      if (String(medicine.medID) === medID) {
        found = true;
        for (const key in newMedInfo) {
          if (newMedInfo.hasOwnProperty(key)) {
            medicine[key] = newMedInfo[key];
          }
        }
        foundMed = medicine;
      }
    });

    if (!found) {
      return res.status(404).json({ status: 'cannot find matched medicine' });
    }

    if (foundMed.frequency && foundMed.intakeList){
      takeFlag = medToTake(foundMed)
    }
    
    if (takeFlag) {
      addIntake(user, foundMed)
      user.todayList.todayIntakeList.sort((a, b) => a.intake.time.localeCompare(b.intake.time))
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

app.get('/reminder/:ID', verifyToken, (req, res) => {
  try {
    const user = req.user;
    const { ID } = req.params;
    const foundIntakeArr = user.todayList.todayIntakeList.filter(intake => {
      return String(intake._id) === ID;
    });
    console.log('foundIntakeArr:\n', foundIntakeArr)
    if (foundIntakeArr.length !== 0) {
      const foundIntake = foundIntakeArr[0];
      console.log('foundIntake: ', foundIntake)
      return res.json({
        intakeObj: foundIntake,
        status: 'all good',
      })
    } else {
      return res.status(401).json({
        error: 'no matched intake ID',
        status: 'failed to find the intake in the list of medicine to take today using intake I',
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(404).json({
      error: err,
      status: 'failed to find the intake using intake ID',
    })
  }
})

app.post('/api/confirm-intake/:ID', verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const { ID } = req.params;
    const index = user.todayList.todayIntakeList.findIndex(intakeObj => intakeObj._id == ID)
    if (index == -1) {
      return res.status(404).json({ status: 'cannot find the medicine to confirm intake' })
    }
    const newHistory = new History({
      intakeMed: new TodayIntake(user.todayList.todayIntakeList[index])
    })
    if (!user.historyList) {
      user.historyList = []
    }

    // deduct the dose amount from the totalAmt
    const dose = Number(newHistory.intakeMed.intake.dose);
    const medID = newHistory.intakeMed.medicine.medID;
    const medIdx = user.medList.findIndex(med => med.medID === medID)
    if (medIdx == -1){
      return res.status(404).json({ status: 'cannot find the medicine in your list of medications' })
    }
    user.medList[medIdx].totalAmt -= dose;
    user.historyList.push(newHistory)
    console.log('index: ', index)
    console.log('before splicing: ', user.todayList.todayIntakeList)
    user.todayList.todayIntakeList.splice(index, 1)
    await user.save()
    console.log('after splicing: ', user.todayList.todayIntakeList)
    return res.json({
      historyList: user.historyList,
      status: 'all good',
    })
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'An error occurred while confirming intake.' });
  }
});

app.post('/api/later-intake/:ID', verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const { ID } = req.params;
    const index = user.todayList.todayIntakeList.findIndex(intakeObj => intakeObj._id == ID)
    if (index == -1) {
      return res.status(404).json({ status: 'cannot find the medicine to confirm intake' })
    }
    res.status(200).json({ message: 'Intake postponed'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while postponing intake.' });
  }
});

app.post('/api/skip-intake/:ID', verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const { ID } = req.params;
    const index = user.todayList.todayIntakeList.findIndex(intakeObj => intakeObj._id == ID)
    if (index == -1) {
      return res.status(404).json({ status: 'cannot find the medicine to confirm intake' })
    }
    user.todayList.todayIntakeList.splice(index, 1)
    await user.save()
    res.status(200).json({ message: 'Intake skipped'});
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'An error occurred while skipping intake.'});
  }
});


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
