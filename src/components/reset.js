import React from "react";
import axios from "axios";
import "./reset.css";

function ResetButton() {
  const URL = "https://pelle-art-bb0b92a8bfe3.herokuapp.com"; //http://localhost:8800

  const handleResetClick = () => {
    axios.put(`${URL}/reset`)
      .then(response => {
        console.log(response.data);
        // Perform any additional actions after the reset API call is successful
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occur during the API call
      });
  };

  return (
    <button className="resetButton" onClick={handleResetClick}>Reset </button>
  );
}

export default ResetButton;
