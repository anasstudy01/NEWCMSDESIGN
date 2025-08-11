import React, { useState, useEffect } from 'react';
import { Plus, Eye, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { accountsAPI } from '../services/api';
import type { Account } from '../types';

/**
 * Live Accounts page component
 * Displays user's trading accounts with management options
 */
const LiveAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch accounts data on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await accountsAPI.getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Accounts</h1>
          <p className="text-gray-600">Manage your trading accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Account
        </Button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id}>
            <div className="space-y-4">
              {/* Account Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {account.accountNumber}
                  </h3>
                  <p className="text-sm text-gray-500">{account.accountType} Account</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {account.status}
                </span>
              </div>

              {/* Account Details */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Balance:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${account.balance.toLocaleString()} {account.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leverage:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {account.leverage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Currency:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {account.currency}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {accounts.filter(a => a.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-500">Active Accounts</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Balance</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {accounts.filter(a => a.accountType === 'Live').length}
            </p>
            <p className="text-sm text-gray-500">Live Accounts</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LiveAccounts;
