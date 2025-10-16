import React from 'react';
import './OrderBook.css';

const OrderBook = ({ orders }) => {
  // Фильтруем только активные ордера (которые не исполнились полностью)
  const activeOrders = orders.filter(order => order.amount > 0);

  return (
    <div className="order-book">
      <h3>Активные ордера ({activeOrders.length})</h3>
      <div className="orders-table">
        <div className="table-header">
          <span>Тип</span>
          <span>Цена</span>
          <span>Объем</span>
          <span>Время</span>
        </div>
        <div className="table-body">
          {activeOrders.length === 0 ? (
            <div className="no-orders">Нет активных ордеров</div>
          ) : (
            activeOrders.map(order => (
              <div key={order.id} className={`order-row ${order.side}`}>
                <span className={`side ${order.side}`}>
                  {order.side === 'buy' ? 'BUY' : 'SELL'}
                </span>
                <span>${order.price.toFixed(2)}</span>
                <span>{order.amount} BTC</span>
                <span>{order.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;