import React from 'react';
import './TradeHistory.css';

const TradeHistory = ({ trades }) => {
  return (
    <div className="trade-history">
      <h3>История сделок</h3>
      <div className="trades-table">
        <div className="table-header">
          <span>Сторона</span>
          <span>Цена</span>
          <span>Объем</span>
          <span>Время</span>
        </div>
        <div className="table-body">
          {trades.length === 0 ? (
            <div className="no-trades">Нет сделок</div>
          ) : (
            trades.map(trade => (
              <div key={trade.id} className={`trade-row ${trade.side}`}>
                <span className={`side ${trade.side}`}>
                  {trade.side === 'buy' ? 'BUY' : 'SELL'}
                </span>
                <span className="price">${trade.price.toFixed(2)}</span>
                <span className="amount">{trade.amount} BTC</span>
                <span className="timestamp">{trade.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;