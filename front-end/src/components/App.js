import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMedicine1 from './AddMedicine1';
import AddMedicine2 from './AddMedicine2';


function App() {
  return (
  <Routes>
    <Route path="./AddMedicine1" element={<AddMedicine1 />} />
    <Route path="/AddMedicine2" element={<AddMedicine2 />} />
  </Routes>
  );
}

export default App;