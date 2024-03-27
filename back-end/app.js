const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // For parsing POST request body
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

// Mock database for the sake of this example
let medications = [
    { name: 'Midol', pillsLeft: 26, schedule: '8:00PM', date: 'Mar 27th', dose: 1 },
    // Add more medication objects as needed
];

// GET endpoint to fetch medication reminders
app.get('/reminders', (req, res) => {
    res.json(medications);
});

// POST endpoint to handle actions on the reminders
app.post('/reminder-action', (req, res) => {
    const { name, action } = req.body; // Assuming request body contains medication name and action (confirm, later, skip)

    // Logic to handle the action, e.g., update the medication list or schedule
    // This is simplified for demonstration purposes
    if (action === 'confirm') {
        medications = medications.map(med => med.name === name ? { ...med, pillsLeft: med.pillsLeft - med.dose } : med);
    }
    // Handle other actions (later, skip) as needed

    res.send({ status: 'success', message: `Action '${action}' applied to ${name}` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
