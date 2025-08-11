import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { dashboardAPI } from '../services/api';
import type { DashboardStats, Transaction } from '../types';

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

  return (
    <div className="space-y-6">
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
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-900">
                +{stats?.monthlyGrowth || 0}%
              </p>
              <p className="text-sm text-gray-500">Monthly Growth</p>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card title="Recent Transactions" subtitle="Latest account activity">
          <div className="space-y-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
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
  );
};

export default Dashboard;
