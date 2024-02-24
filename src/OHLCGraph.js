import React from 'react';
import { VictoryChart, VictoryCandlestick } from 'victory';

const OHLCGraph = ({ data }) => {
  return (
    <div>
      <h2>OHLC Graph</h2>
      <VictoryChart>
        <VictoryCandlestick
          data={data}
          x="date"
          open="open"
          high="high"
          low="low"
          close="close"
        />
      </VictoryChart>
    </div>
  );
};

export default OHLCGraph;
