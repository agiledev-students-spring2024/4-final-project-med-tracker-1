import React, { useState } from 'react';
import Input from "./Input";

function AddMedicine1() {
    const [mockPhotoUrl, setMockPhotoUrl] = useState('');

    const handlePhotoChange = () => {
      const randomImageId = Math.floor(Math.random() * 1000); 
      const picsumUrl = `https://picsum.photos/200`;
      setMockPhotoUrl(picsumUrl);
    };
  
    return (
      <div className="flex-container">
        {mockPhotoUrl && <img src={mockPhotoUrl} alt="Mocked Upload" style={{width: '20%', marginTop: '20px'}} />}
        <br />
        <button onClick={handlePhotoChange}>Upload Photo</button>
        <br />
        <Input type="text" placeholder="Name" />
        <br />
        <Input type="text" placeholder="Total" />
        <br />
        <Input type="text" placeholder="Unit" />
        <br />
        <button onClick>Next</button> 
      </div>
    );
  }

  export default AddMedicine1;