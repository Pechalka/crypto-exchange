import React, { useState } from 'react';
import './TradingForm.css';

const TradingForm = ({ currentPrice, onTrade }) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState(currentPrice);
  const [sellPrice, setSellPrice] = useState(currentPrice);

  const handleBuy = () => {
    if (!buyAmount || buyAmount <= 0) return;
    onTrade('buy', parseFloat(buyAmount), parseFloat(buyPrice));
    setBuyAmount('');
    setBuyPrice(currentPrice);
  };

  const handleSell = () => {
    if (!sellAmount || sellAmount <= 0) return;
    onTrade('sell', parseFloat(sellAmount), parseFloat(sellPrice));
    setSellAmount('');
    setSellPrice(currentPrice);
  };

  const buyTotal = buyAmount && buyPrice ? (buyAmount * buyPrice).toFixed(2) : '0';
  const sellTotal = sellAmount && sellPrice ? (sellAmount * sellPrice).toFixed(2) : '0';

  return (
    <div className="trading-form">
      {/* Форма покупки */}
      <div className="trade-section buy-section">
        <h3>Купить BTC</h3>
        <div className="form-group">
          <label>Цена (USDT):</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Количество (BTC):</label>
          <input
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            step="0.001"
            placeholder="0.0"
          />
        </div>
        <div className="total">Итого: {buyTotal} USDT</div>
        <button className="buy-btn" onClick={handleBuy}>
          КУПИТЬ BTC
        </button>
      </div>

      {/* Форма продажи */}
      <div className="trade-section sell-section">
        <h3>Продать BTC</h3>
        <div className="form-group">
          <label>Цена (USDT):</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Количество (BTC):</label>
          <input
            type="number"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            step="0.001"
            placeholder="0.0"
          />
        </div>
        <div className="total">Итого: {sellTotal} USDT</div>
        <button className="sell-btn" onClick={handleSell}>
          ПРОДАТЬ BTC
        </button>
      </div>

      <div className="current-price">
        Текущая цена: <strong>${currentPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default TradingForm;