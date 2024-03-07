import React from "react";
import Input from "./Input";

function EditMedicine() {
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

        <Input type="text" placeholder="Total" />
        <br />
        <Input type="text" placeholder="Unit" />

        <br />
        <p>Frequency of Intake</p>
        <Input type="text" placeholder="Twice daily" />
        <p>Intake One</p>
        <Input type="text" placeholder="Time" />
        <br />
        <Input type="text" placeholder="Dose" />
        <p>Intake Two</p>
        <Input type="text" placeholder="Time" />
        <br />
        <Input type="text" placeholder="Dose" />
        <p>Remind to refill when</p>
        <Input type="text" placeholder=" " />
        <p>pill(s) left</p>
        <br />
        <button onClick>Next</button> 
    </div>


        )
        }