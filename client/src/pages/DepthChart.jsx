import React from 'react';
import './DepthChart.scss';

const DepthChart = ({ orders, currentPrice }) => {
  // Группируем ордера по ценам
  const bids = {};
  const asks = {};

  orders.forEach(order => {
    if (order.side === 'buy') {
      bids[order.price] = (bids[order.price] || 0) + order.amount;
    } else {
      asks[order.price] = (asks[order.price] || 0) + order.amount;
    }
  });

  // Сортируем
  const sortedBids = Object.entries(bids)
    .map(([price, amount]) => ({
      price: parseFloat(price),
      amount: parseFloat(amount),
      total: parseFloat(price) * parseFloat(amount)
    }))
    .sort((a, b) => b.price - a.price) // Убывание для покупок
    .slice(0, 8);

  const sortedAsks = Object.entries(asks)
    .map(([price, amount]) => ({
      price: parseFloat(price),
      amount: parseFloat(amount),
      total: parseFloat(price) * parseFloat(amount)
    }))
    .sort((a, b) => a.price - b.price) // Возрастание для продаж
    .slice(0, 8);

  const maxAmount = Math.max(
    ...sortedBids.map(item => item.amount),
    ...sortedAsks.map(item => item.amount),
    0.1
  );

  const bestBid = sortedBids[0] ? sortedBids[0].price.toFixed(2) : 'Нет';
  const bestAsk = sortedAsks[0] ? sortedAsks[0].price.toFixed(2) : 'Нет';

  return (
    <div className="depth-chart">
      <h3>Стакан заявок</h3>
      
      <div className="depth-header">
        <span className="col-price">Цена (USDT)</span>
        <span className="col-amount">Объем (BTC)</span>
        <span className="col-total">Всего</span>
      </div>

      <div className="depth-container">
        {/* Продажи (ASK) */}
        <div className="asks-section">
          {sortedAsks.map((item) => (
            <div key={`ask-${item.price}`} className="depth-row ask-row">
              <div 
                className="depth-bar ask-bar"
                style={{ width: `${(item.amount / maxAmount) * 100}%` }}
              />
              <span className="col-price">${item.price.toFixed(2)}</span>
              <span className="col-amount">{item.amount.toFixed(4)}</span>
              <span className="col-total">{item.total.toFixed(0)}</span>
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className="price-separator">
          <div className="line"></div>
          <span className="current-price">${currentPrice.toFixed(2)}</span>
          <div className="line"></div>
        </div>

        {/* Покупки (BID) */}
        <div className="bids-section">
          {sortedBids.map((item) => (
            <div key={`bid-${item.price}`} className="depth-row bid-row">
              <div 
                className="depth-bar bid-bar"
                style={{ width: `${(item.amount / maxAmount) * 100}%` }}
              />
              <span className="col-price">${item.price.toFixed(2)}</span>
              <span className="col-amount">{item.amount.toFixed(4)}</span>
              <span className="col-total">{item.total.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="depth-stats">
        Активных ордеров: {sortedBids.length + sortedAsks.length} | 
        Лучший bid: ${bestBid} | 
        Лучший ask: ${bestAsk}
      </div>
    </div>
  );
};

export default DepthChart;