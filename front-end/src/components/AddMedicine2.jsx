import React from "react";
import Input from "./Input";

function AddMedicine2(){
    return(<div className="flex-container">
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

export default AddMedicine2;