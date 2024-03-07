import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import History from './History'
import Medicines from './Medicines'
import Setting from './Setting'
import AddMedicine1 from './AddMedicine1'
import AddMedicine2 from './AddMedicine2'
import Reminder from './Reminder'
import Refill from './Refill'
import ForgetPassword from './ForgetPassword';
import RefillReminder from './RefillReminder';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <main className="App-main">

            <Routes>
              {/* a router for the register page */}
              <Route path="/register" element={<Register />} />
              {/* a router for the login page */}
              <Route path="/" element={<Login />} />

              {/* a router for the home page */}
              <Route path="/home" element={<Home />} />

              {/* a router for the history page */}
              <Route path="/history" element={<History />} />

              {/* a router for the medicines page */}
              <Route path="/medicines" element={<Medicines />} />
              {/* a router for add medicine page one */}
              <Route path="/add-medicine-1" element={<AddMedicine1 />} />
              {/* a router for add medicine page two */}
              <Route path="/add-medicine-2" element={<AddMedicine2 />} />

              {/* a router for setting page */}
              <Route path="/setting" element={<Setting />} />

              {/* a router for reminder page */}
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/refill-reminder" element={<RefillReminder />} />
              {/* a router for refill reminder page */}
              <Route path="/refill" element={<RefillReminder />} />

            {/* a router for the forget password page */}
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            </Routes>
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
