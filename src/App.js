import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [evaluation, setEvaluation] = useState('');

  const fetchData = () => {
    axios.get(`http://localhost:5000/get_historical_data?symbol=${symbol}`)
      .then(response => {
        console.log('Response:', response);
        const rawData = response.data;
        console.log('Raw data:', rawData);

        if (Array.isArray(rawData)) {
          const formattedData = rawData.map(entry => ({
            date: new Date(entry.Date),
            open: entry.Open,
            high: entry.High,
            low: entry.Low,
            close: entry.Close
          }));
          setData(formattedData);
        } else {
          console.error('Invalid data format:', rawData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the prediction matches the actual outcome
    const predictionCorrect = evaluatePrediction();
    setEvaluation(predictionCorrect ? 'Correct' : 'Incorrect');
  };

  const evaluatePrediction = () => {
    // Get the price at 75% timestamp
    const timestamp75Percent = data[Math.floor(data.length * 0.75)];
    const priceAt75Percent = timestamp75Percent.close;

    // Determine if the price at the end is greater or lesser than the price at 75% timestamp
    const priceAtEnd = data[data.length - 1].close;
    const isPriceHigher = priceAtEnd > priceAt75Percent;

    // Determine if the user's prediction was correct
    if ((prediction === 'up' && isPriceHigher) || (prediction === 'down' && !isPriceHigher)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Stock Market Prediction Game</h1>
      <div>
        <input type="text" placeholder="Enter Stock Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      {data.length > 0 && (
        <div>
          <h2>Historical Data</h2>
          <LineChart width={800} height={400} data={prediction ? data : data.slice(0, Math.floor(data.length * 0.75))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="#8884d8" />
            <Line type="monotone" dataKey="high" stroke="#82ca9d" />
            <Line type="monotone" dataKey="low" stroke="#ffc658" />
            <Line type="monotone" dataKey="close" stroke="#ff7300" />
          </LineChart>
          {!prediction && (
            <form onSubmit={handleSubmit}>
              <label>
                Predict: 
                <select value={prediction} onChange={(e) => setPrediction(e.target.value)}>
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                </select>
              </label>
              <button type="submit">Submit Prediction</button>
            </form>
          )}
          {evaluation && <p>Evaluation: {evaluation}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
