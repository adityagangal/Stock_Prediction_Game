import React, { useState } from 'react';

const PredictionForm = ({ onPrediction }) => {
  const [prediction, setPrediction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prediction.trim() !== '') {
      onPrediction(prediction.toLowerCase());
    }
  };

  return (
    <div>
      <h2>Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Will the price be higher or lower?
          <input
            type="text"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
          />
        </label>
        <button type="submit">Submit Prediction</button>
      </form>
    </div>
  );
};

export default PredictionForm;
