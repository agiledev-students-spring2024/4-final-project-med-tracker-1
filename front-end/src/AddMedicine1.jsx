import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from "./Input";
import './AddMedicine.css'

function AddMedicine1() {
  const [medName, setMedName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [unit, setUnit] = useState('');    
  const [mockPhotoUrl, setMockPhotoUrl] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = () => {
    const randomImageId = Math.floor(Math.random() * 1000); 
    const picsumUrl = `https://picsum.photos/200`;
    setMockPhotoUrl(picsumUrl);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/add-medicine-2')
  }

  const handleExit = (event) => {
    event.preventDefault();
    navigate('/medicines')
  }
  return (
    <div className="add-medicine-page-1">
      <button type="button" onClick={handleExit} className="exit-button">X</button>
      <form onSubmit={handleFormSubmit}>
        <div className="photo-upload">
          {mockPhotoUrl ? (
            <img className="med-image" src={mockPhotoUrl} alt="Uploaded" />
          ) : (
            <div className="med-image"></div>
          )}          
          <button className="clickable-button" onClick={handlePhotoChange}>Upload Photo</button>
        </div>
        <div className="med-info">
          <div className="form-group">
            <label htmlFor="medName">Name</label>
            <Input 
              type="text" 
              id="medName" 
              placeholder="Name" 
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total</label>
            <Input 
              type="number" 
              id="totalAmount" 
              placeholder="100" 
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              className="select-dropdown"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="pill(s)">pill(s)</option>
              <option value="capsule(s)">capsule(s)</option>
              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="ml">mL</option>
            </select>
          </div>
        </div>
        <button type="submit" className="clickable-button">Next</button>
      </form>
    </div>
  );
}

export default AddMedicine1;