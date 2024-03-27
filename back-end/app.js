require('dotenv').config({ silent: true }) // load environmental variables from .env
const express = require('express')
const cors = require('cors'); 
const app = express()
const PORT = 3001;

module.exports = app
app.use(cors());

app.get('/home', (req, res) => {
    const medications = [
      { name: 'Midol', pillsLeft: 26, schedule: '8:00AM', date:'Feb 12th' },
      { name: 'Vitamin C', pillsLeft: 15, schedule: '8:00AM', date:'Feb 12th' },
      { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date:'Feb 12th'},
    ];
    res.json(medications);
  });

//   app.use(express.static('build'));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  