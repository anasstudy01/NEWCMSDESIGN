import React from 'react';
import TickerDisplay from '../ui/TickerDisplay';
import swg from '../../assets/rss.png';

const MarketTicker: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center py-3 shadow-lg rounded-lg gap-2 sm:gap-0">
      <div className="flex-shrink-0 px-3 hidden md:block">
        <img src={swg} width={40} alt="RSS Icon" />
      </div>
      <div className="w-full sm:flex-1 overflow-hidden">
        <TickerDisplay />
      </div>
    </div>
  );
};

export default MarketTicker;
