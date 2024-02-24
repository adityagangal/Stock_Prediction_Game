import React from 'react';

const Result = ({ result }) => {
  return (
    <div>
      <h2>Result</h2>
      <p>{result ? 'Your prediction was correct!' : 'Your prediction was incorrect.'}</p>
    </div>
  );
};

export default Result;
