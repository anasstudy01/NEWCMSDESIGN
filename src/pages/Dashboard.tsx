import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { dashboardAPI } from '../services/api';
import type { DashboardStats, Transaction } from '../types';
import swg from '../assets/rss.png'

import TickerDisplay from '@/components/ui/TickerDisplay';

/**
 * Main Dashboard component displaying key metrics and recent activities
 * Implements data fetching and responsive layout
 */
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, transactionsData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getRecentTransactions(),
        ]);
        setStats(statsData);
        setRecentTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (<>
    <div className="space-y-2">
   

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats?.totalBalance.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Profit</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats?.totalProfit.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Trades</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalTrades.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Accounts</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.activeAccounts || '0'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Performance Chart */}
        <Card title="Trading Performance" subtitle="Monthly growth overview">
          <div className="h-64  relative bg-gradient-to-br from-green-50 to-white rounded-lg overflow-hidden">
            {/* Chart Container */}
            <div className="absolute  h-full w-full inset-4">
              <svg className="w-full h-full" viewBox="0 0 320 200">
                {/* Grid Background */}
                <defs>
                  <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.6"/>
                  </pattern>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="15" y="25" className="text-xs fill-gray-500" fontSize="10">20%</text>
                <text x="15" y="60" className="text-xs fill-gray-500" fontSize="10">15%</text>
                <text x="15" y="95" className="text-xs fill-gray-500" fontSize="10">10%</text>
                <text x="15" y="130" className="text-xs fill-gray-500" fontSize="10">5%</text>
                <text x="15" y="165" className="text-xs fill-gray-500" fontSize="10">0%</text>
                
                {/* X-axis labels */}
                <text x="50" y="185" className="text-xs fill-gray-500" fontSize="10">Jan</text>
                <text x="90" y="185" className="text-xs fill-gray-500" fontSize="10">Feb</text>
                <text x="130" y="185" className="text-xs fill-gray-500" fontSize="10">Mar</text>
                <text x="170" y="185" className="text-xs fill-gray-500" fontSize="10">Apr</text>
                <text x="210" y="185" className="text-xs fill-gray-500" fontSize="10">May</text>
                <text x="250" y="185" className="text-xs fill-gray-500" fontSize="10">Jun</text>
                
                {/* Area under curve */}
                <path
                  d="M 45 145 L 85 125 L 125 105 L 165 85 L 205 75 L 245 60 L 285 45 L 285 165 L 45 165 Z"
                  fill="url(#areaGradient)"
                  className="fade-in-up"
                />
                
                {/* Main chart line */}
                <path
                  d="M 45 145 L 85 125 L 125 105 L 165 85 L 205 75 L 245 60 L 285 45"
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="chart-line"
                  strokeDasharray="1000"
                />
                
                {/* Data points */}
                <circle cx="45" cy="145" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="85" cy="125" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="125" cy="105" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="165" cy="85" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="205" cy="75" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="245" cy="60" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" className="chart-point" />
                <circle cx="285" cy="45" r="5" fill="#059669" stroke="#fff" strokeWidth="2" className="chart-point" />
              </svg>
            </div>
            
            {/* Current Value Display - Top Right */}
            <div className="absolute top-3 right-3 text-right bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm fade-in-up">
              <div className="flex items-center justify-end space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  +{stats?.monthlyGrowth || 12.5}%
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Monthly Growth</p>
              <p className="text-xs text-green-600 font-medium">↗ +2.3% vs last month</p>
            </div>
            
            
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card title="Recent Transactions" subtitle="Latest account activity">
          <div className="space-y-1">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-1 border-gray-200 rounded-lg hover:bg-gray-100 hover:shadow-lg p-2 transition-all duration-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'Deposit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'Deposit' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'Deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent transactions</p>
            )}
          </div>
        </Card>
      </div>
      {/* market ticker */}
      <div className="flex flex-col sm:flex-row items-center py-3 shadow-lg rounded-lg gap-2 sm:gap-0">
        <div className="flex-shrink-0 px-3 hidden md:block">
          <img src={swg} width={40} alt="RSS Icon" />
        </div>
        <div className="w-full sm:flex-1 overflow-hidden">
          <TickerDisplay />
        </div>
      </div>  

      {/* Market Overview */}
      <Card title="Market Overview" subtitle="Current market conditions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">EUR/USD</p>
            <p className="text-xl font-bold text-gray-900">1.0892</p>
            <p className="text-sm text-green-600">+0.23%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">GBP/USD</p>
            <p className="text-xl font-bold text-gray-900">1.2734</p>
            <p className="text-sm text-red-600">-0.15%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">USD/JPY</p>
            <p className="text-xl font-bold text-gray-900">149.82</p>
            <p className="text-sm text-green-600">+0.41%</p>
          </div>
        </div>
      </Card>
      
    
    </div>
  </>
  );
};

export default Dashboard;
