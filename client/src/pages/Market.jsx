import React, { useState, useEffect, useMemo } from 'react';
import TradingForm from './TradingForm';
import PriceChart from './PriceChart';
import OrderBook from './OrderBook';
import DepthChart from './DepthChart';
import TradeHistory from './TradeHistory';
import './Market.css';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Market() {
  const [orders, setOrders] = useState([]);
  const [trades, setTrades] = useState([]);
  const [autoTrading, setAutoTrading] = useState(false); // Новое состояние

  // Функция матчинга
  const matchOrders = (newOrder, currentOrders) => {
    const oppositeSide = newOrder.side === 'buy' ? 'sell' : 'buy';

    // ИЗМЕНЕНИЕ 1: Ищем ВСЕ подходящие ордера (цена <= для покупки, цена >= для продажи)
    const matchingOrders = currentOrders.filter((order) => {
      if (order.side !== oppositeSide) return false;

      if (newOrder.side === 'buy') {
        // Для ПОКУПКИ: ищем все продажи с ценой <= нашей цене покупки
        return order.price <= newOrder.price;
      } else {
        // Для ПРОДАЖИ: ищем все покупки с ценой >= нашей цене продажи
        return order.price >= newOrder.price;
      }
    });

    // ИЗМЕНЕНИЕ 2: Сортируем по ПРИОРИТЕТУ исполнения
    matchingOrders.sort((a, b) => {
      if (newOrder.side === 'buy') {
        // Для покупки: сначала самые ДЕШЕВЫЕ продавцы (цена по возрастанию)
        return a.price - b.price;
      } else {
        // Для продажи: сначала самые ДОРОГИЕ покупатели (цена по убыванию)
        return b.price - a.price;
      }
    });

    let remainingAmount = newOrder.amount;
    const executedTrades = [];
    const updatedOrders = [...currentOrders];

    console.log(
      `🔍 Матчинг: ${newOrder.side} ${newOrder.amount}BTC по ${newOrder.price}. Найдено совпадений: ${matchingOrders.length}`
    );

    // Исполняем ордера по очереди
    for (let match of matchingOrders) {
      if (remainingAmount <= 0) break;

      const matchIndex = updatedOrders.findIndex((o) => o.id === match.id);
      if (matchIndex === -1) continue;

      const executedAmount = Math.min(
        remainingAmount,
        updatedOrders[matchIndex].amount
      );
      const tradePrice = updatedOrders[matchIndex].price; // Цена исполнения = цена встречного ордера!

      executedTrades.push({
        id: Date.now() + Math.random(),
        price: tradePrice,
        amount: executedAmount,
        side: newOrder.side,
        timestamp: new Date().toLocaleTimeString(),
        description: `${newOrder.side.toUpperCase()} ${executedAmount}BTC по ${tradePrice} (встречный: ${
          match.side
        } ${match.price})`,
      });

      console.log(`⚡ Исполнено: ${executedAmount}BTC по $${tradePrice}`);

      // Обновляем объемы
      if (executedAmount === updatedOrders[matchIndex].amount) {
        updatedOrders.splice(matchIndex, 1);
      } else {
        updatedOrders[matchIndex] = {
          ...updatedOrders[matchIndex],
          amount: updatedOrders[matchIndex].amount - executedAmount,
        };
      }

      remainingAmount -= executedAmount;
    }

    // Добавляем остаток нового ордера если он не полностью исполнен
    if (remainingAmount > 0) {
      updatedOrders.push({
        ...newOrder,
        amount: remainingAmount,
        originalAmount: newOrder.amount, // сохраняем оригинальный объем для информации
      });
      console.log(`💤 Остаток: ${remainingAmount}BTC добавлен в стакан`);
    }

    if (executedTrades.length > 0) {
      console.log(`🎯 Всего исполнено: ${executedTrades.length} сделок`);
    }

    return {
      orders: updatedOrders,
      trades: executedTrades,
    };
  };

  const currentPrice = useMemo(() => {
    if (trades.length > 0) {
      return trades[trades.length - 1].price;
    }

    const sellOrders = orders.filter((o) => o.side === 'sell');
    const buyOrders = orders.filter((o) => o.side === 'buy');

    const bestAsk =
      sellOrders.length > 0 ? Math.min(...sellOrders.map((o) => o.price)) : 75;
    const bestBid =
      buyOrders.length > 0 ? Math.max(...buyOrders.map((o) => o.price)) : 75;

    return (bestAsk + bestBid) / 2;
  }, [orders, trades]);

useEffect(() => {
  if (!autoTrading) return;
  
  const interval = setInterval(() => {
    const side = randomIntFromInterval(1, 2) === 1 ? 'buy' : 'sell';
    const amount = randomIntFromInterval(1, 5);
    
    // УМНАЯ ГЕНЕРАЦИЯ ЦЕН:
    let price;
    const aggression = randomIntFromInterval(1, 3); // 1-пассивный, 3-агрессивный
    
    if (side === 'buy') {
      if (aggression === 1) {
        price = currentPrice - randomIntFromInterval(3, 6); // Пассивный - далеко от цены
      } else if (aggression === 2) {
        price = currentPrice - randomIntFromInterval(1, 3); // Умеренный
      } else {
        price = currentPrice + randomIntFromInterval(1, 2); // Агрессивный - выше текущей!
      }
    } else {
      if (aggression === 1) {
        price = currentPrice + randomIntFromInterval(3, 6); // Пассивный - далеко от цены
      } else if (aggression === 2) {
        price = currentPrice + randomIntFromInterval(1, 3); // Умеренный
      } else {
        price = currentPrice - randomIntFromInterval(1, 2); // Агрессивный - ниже текущей!
      }
    }
    
    price = Math.max(70, Math.min(85, price)); // Ограничим диапазон

    console.log(`🤖 АВТО-ОРДЕР: ${side} ${amount}BTC по $${price} (агрессивность: ${aggression})`);
    handleTrade(side, amount, price);
  }, 2000);
  
  return () => clearInterval(interval);
}, [autoTrading, currentPrice]);

  const handleTrade = (side, amount, price) => {
    const newOrder = {
      id: Date.now(),
      side,
      amount,
      price,
      timestamp: new Date().toLocaleTimeString(),
    };

    setOrders((prevOrders) => {
      const result = matchOrders(newOrder, prevOrders);

      if (result.trades.length > 0) {
        setTrades((prevTrades) => [
          ...result.trades,
          ...prevTrades,
        ]);
      }

      return result.orders;
    });
  };

  const handleAutoTradingToggle = () => {
    setAutoTrading((prev) => !prev);
  };

  return (
    <div className='app'>
      <h1>Торговая платформа BTC/USDT</h1>

      {/* Переключатель авто-трейдинга */}
      <div className='auto-trading-control'>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={autoTrading}
            onChange={handleAutoTradingToggle}
          />
          <span className='checkmark'></span>
          Автоматическая торговля (добавляет случайные ордера)
        </label>
        <div className='auto-trading-status'>
          Статус:{' '}
          <span className={autoTrading ? 'status-active' : 'status-inactive'}>
            {autoTrading ? 'ВКЛ' : 'ВЫКЛ'}
          </span>
        </div>
      </div>

      <div className='app-grid'>
        <div className='left-panel'>
          <PriceChart price={currentPrice} />
          <DepthChart orders={orders} currentPrice={currentPrice} />
          <TradeHistory trades={trades} />
          <OrderBook orders={orders} />
        </div>
        <div className='right-panel'>
          <TradingForm currentPrice={currentPrice} onTrade={handleTrade} />
        </div>
      </div>
    </div>
  );
}

export default Market;
