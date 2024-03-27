require('dotenv').config({ silent: true }); // load environmental variables from .env
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/home', (req, res) => {
    const medications = [
      { name: 'Midol', pillsLeft: 26, schedule: '6:00PM', date: 'Mar 26th' },
      { name: 'Midol', pillsLeft: 26, schedule: '7:00PM', date: 'Mar 27th' },
      { name: 'Midol', pillsLeft: 26, schedule: '8:00PM', date: 'Mar 28th' },
      { name: 'Vitamin C', pillsLeft: 15, schedule: '9:00PM', date: 'Mar 27th' },
      { name: 'Vitamin C', pillsLeft: 15, schedule: '11:00PM', date: 'Mar 27th' },
      { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date: 'Feb 12th' },
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

app.get('/history', (req, res) => {
    const medications = [
        { name: 'Midol', pillsLeft: 26, schedule: '6:00PM', date: 'Mar 26th' },
        { name: 'Midol', pillsLeft: 26, schedule: '7:00PM', date: 'Mar 27th' },
        { name: 'Midol', pillsLeft: 26, schedule: '8:00PM', date: 'Mar 28th' },
        { name: 'Vitamin C', pillsLeft: 15, schedule: '9:00PM', date: 'Mar 27th' },
        { name: 'Vitamin C', pillsLeft: 15, schedule: '11:00PM', date: 'Mar 27th' },
        { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date: 'Feb 12th' },
        { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date: 'Apr 12th' },
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
