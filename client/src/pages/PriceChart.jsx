import React, { useState, useEffect } from 'react';
import './PriceChart.css';

const PriceChart = ({ price }) => {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    setPriceHistory(prev => {
      const newHistory = [...prev, price];
      // Сохраняем последние 30 значений
      return newHistory.slice(-30);
    });
  }, [price]);

  const maxPrice = Math.max(...priceHistory, price);
  const minPrice = Math.min(...priceHistory, price);

  return (
    <div className="price-chart">
      <h3>График цены BTC/USDT</h3>
      
      <div className="simple-chart">
        {priceHistory.map((value, index) => {
          const height = ((value - minPrice) / (maxPrice - minPrice || 1)) * 100;
          const isUp = index > 0 ? value >= priceHistory[index - 1] : true;
          
          return (
            <div
              key={index}
              className="chart-column"
              style={{
                height: `${height}%`,
                backgroundColor: isUp ? '#00c087' : '#ff4d4d'
              }}
              title={`$${value.toFixed(2)}`}
            />
          );
        })}
      </div>

      <div className="chart-info">
        <span>Min: ${minPrice.toFixed(2)}</span>
        <span>Current: ${price.toFixed(2)}</span>
        <span>Max: ${maxPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceChart;