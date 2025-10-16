import React from 'react';
import './OrderBookChart.scss';

const OrderBookChart = ({ orders }) => {
  // Группируем ордера по цене и стороне
  const processOrders = () => {
    const buyOrders = {};
    const sellOrders = {};

    orders.forEach(order => {
      const priceKey = order.price.toFixed(2);
      if (order.side === 'buy') {
        buyOrders[priceKey] = (buyOrders[priceKey] || 0) + order.amount;
      } else {
        sellOrders[priceKey] = (sellOrders[priceKey] || 0) + order.amount;
      }
    });

    // Сортируем и ограничиваем количество
    const sortedBuys = Object.entries(buyOrders)
      .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
      .slice(0, 8);
    
    const sortedSells = Object.entries(sellOrders)
      .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
      .slice(0, 8);

    return { buys: sortedBuys, sells: sortedSells };
  };

  const { buys, sells } = processOrders();
  const maxAmount = Math.max(
    ...buys.map(([, amount]) => amount),
    ...sells.map(([, amount]) => amount),
    0.1 // минимальное значение для избежания деления на 0
  );

  return (
    <div className="order-book-chart">
      <h3>Стакан заявок</h3>
      <div className="order-book-container">
        
        {/* Покупки (Bids) */}
        <div className="bids-section">
          <h4>Покупка (BID)</h4>
          <div className="orders-list">
            {buys.map(([price, amount], index) => (
              <div key={price} className="order-row bid-row">
                <div className="order-bar-container">
                  <div 
                    className="order-bar bid-bar"
                    style={{ 
                      width: `${(amount / maxAmount) * 100}%` 
                    }}
                  />
                </div>
                <span className="amount">{amount.toFixed(4)}</span>
                <span className="price">${price}</span>
              </div>
            ))}
            {buys.length === 0 && (
              <div className="no-orders">Нет заявок на покупку</div>
            )}
          </div>
        </div>

        {/* Разделитель */}
        <div className="spread-line">
          <div className="line"></div>
          <span className="spread-text">SPREAD</span>
          <div className="line"></div>
        </div>

        {/* Продажи (Asks) */}
        <div className="asks-section">
          <h4>Продажа (ASK)</h4>
          <div className="orders-list">
            {sells.map(([price, amount], index) => (
              <div key={price} className="order-row ask-row">
                <span className="price">${price}</span>
                <span className="amount">{amount.toFixed(4)}</span>
                <div className="order-bar-container">
                  <div 
                    className="order-bar ask-bar"
                    style={{ 
                      width: `${(amount / maxAmount) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
            {sells.length === 0 && (
              <div className="no-orders">Нет заявок на продажу</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderBookChart;