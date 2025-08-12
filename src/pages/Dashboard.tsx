import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Card from "../components/ui/Card";
import { dashboardAPI } from "../services/api";
import type { DashboardStats, Transaction, Position } from "../types";
import swg from "../assets/rss.png";

import TickerDisplay from "@/components/ui/TickerDisplay";

/**
 * Main Dashboard component displaying key metrics and recent activities
 * Implements data fetching and responsive layout
 */
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [positions, setPositions] = useState<Position[]>([]);
  const [closedPositions, setClosedPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOpenPositions, setShowOpenPositions] = useState(true);

  const handleClosePositions = () => {
    setClosedPositions([...closedPositions, ...positions]);
    setPositions([]);
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, transactionsData, positionsData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getRecentTransactions(),
          dashboardAPI.getPositions(),
        ]);
        setStats(statsData);
        setRecentTransactions(transactionsData);
        setPositions(positionsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
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
                ${stats?.totalBalance.toLocaleString() || "0"}
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
                ${stats?.totalProfit.toLocaleString() || "0"}
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
                {stats?.totalTrades.toLocaleString() || "0"}
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
              <p className="text-sm font-medium text-gray-500">
                Active Accounts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.activeAccounts || "0"}
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
                  <pattern
                    id="grid"
                    width="40"
                    height="25"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 25"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                      opacity="0.6"
                    />
                  </pattern>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Y-axis labels */}
                <text
                  x="15"
                  y="25"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  20%
                </text>
                <text
                  x="15"
                  y="60"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  15%
                </text>
                <text
                  x="15"
                  y="95"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  10%
                </text>
                <text
                  x="15"
                  y="130"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  5%
                </text>
                <text
                  x="15"
                  y="165"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  0%
                </text>

                {/* X-axis labels */}
                <text
                  x="50"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  Jan
                </text>
                <text
                  x="90"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  Feb
                </text>
                <text
                  x="130"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  Mar
                </text>
                <text
                  x="170"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  Apr
                </text>
                <text
                  x="210"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  May
                </text>
                <text
                  x="250"
                  y="185"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  Jun
                </text>

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
                <circle
                  cx="45"
                  cy="145"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="85"
                  cy="125"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="125"
                  cy="105"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="165"
                  cy="85"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="205"
                  cy="75"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="245"
                  cy="60"
                  r="4"
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
                <circle
                  cx="285"
                  cy="45"
                  r="5"
                  fill="#059669"
                  stroke="#fff"
                  strokeWidth="2"
                  className="chart-point"
                />
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
              <p className="text-xs text-green-600 font-medium">
                ↗ +2.3% vs last month
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card title="Recent Transactions" subtitle="Latest account activity">
          <div className="space-y-1">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2 border-1 border-gray-200 rounded-lg hover:bg-gray-100 hover:shadow-lg p-2 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "Deposit"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "Deposit" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === "Deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "Deposit" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent transactions
              </p>
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
      {/* <Card title="Market Overview" subtitle="Current market conditions">
        
      </Card> */}

      {/* Trading Positions and Refer & Earn Cards Side by Side */}
      <div className="flex justify-between ">
        <div>
          <Card
            title="Trading Positions"
            subtitle="Manage your trading positions"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded text-sm font-medium transition ${
                    showOpenPositions
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setShowOpenPositions(true)}
                >
                  Open ({positions.length})
                </button>
                <button
                  className={`px-4 py-2 rounded text-sm font-medium transition ${
                    !showOpenPositions
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setShowOpenPositions(false)}
                >
                  Closed ({closedPositions.length})
                </button>
              </div>
              <div className="space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                  Open Position
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 transition"
                  onClick={handleClosePositions}
                >
                  Close Position
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Sr No.
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Account
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      {showOpenPositions ? "Open Price" : "Close Price"}
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Symbol
                    </th>
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showOpenPositions ? (
                    positions.length > 0 ? (
                      positions.map((pos) => (
                        <tr key={pos.orderId} className="">
                          <td className="px-2 py-2">{pos.srNo}</td>
                          <td className="px-2 py-2">{pos.orderId}</td>
                          <td className="px-2 py-2">{pos.account}</td>
                          <td className="px-2 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                pos.type === "Buy"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {pos.type}
                            </span>
                          </td>
                          <td className="px-2 py-2">{pos.openPrice}</td>
                          <td className="px-2 py-2 font-bold">{pos.symbol}</td>
                          <td className="px-2 py-2">{pos.volume}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-2 py-4 text-center text-gray-500"
                        >
                          No open positions
                        </td>
                      </tr>
                    )
                  ) : closedPositions.length > 0 ? (
                    closedPositions.map((pos) => (
                      <tr key={`closed-${pos.orderId}`} className="">
                        <td className="px-2 py-2">{pos.srNo}</td>
                        <td className="px-2 py-2">{pos.orderId}</td>
                        <td className="px-2 py-2">{pos.account}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              pos.type === "Buy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {pos.type}
                          </span>
                        </td>
                        <td className="px-2 py-2">{pos.openPrice}</td>
                        <td className="px-2 py-2 font-bold">{pos.symbol}</td>
                        <td className="px-2 py-2">{pos.volume}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-2 py-4 text-center text-gray-500"
                      >
                        No closed positions
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <span>
                Showing{" "}
                {showOpenPositions ? positions.length : closedPositions.length}{" "}
                {showOpenPositions ? "open" : "closed"} positions
              </span>
              {showOpenPositions && (
                <span>
                  Total:{" "}
                  <span className="font-bold text-lg text-gray-900">
                    $12,345.67
                  </span>
                </span>
              )}
            </div>
          </Card>
        </div>
        <div>
          <Card title="Refer & Earn" subtitle="Share and get rewarded">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-gray-500">
                Invite your friends to join our platform and earn rewards for
                each successful referral.
              </p>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="https://demo.newcmsdesign.com/referral/abc123"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://demo.newcmsdesign.com/referral/abc123"
                    );
                  }}
                >
                  Copy
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-2 text-sm">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.09c0 .34.04.67.1.99C8.09 8.9 4.84 7.13 2.67 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.12 2.94 3.99 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.12A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" />
                  </svg>
                  <span>Twitter</span>
                </button>

                <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-2 text-sm">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
                  </svg>
                  <span>Facebook</span>
                </button>

                <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-2 text-sm">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.346 3.678 1.327c-.98.98-1.196 2.093-1.255 3.374C2.013 5.741 2 6.151 2 12c0 5.849.013 6.259.072 7.539.059 1.281.275 2.394 1.255 3.374.98.98 2.093 1.196 3.374 1.255C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.394-.275 3.374-1.255.98-.98 1.196-2.093 1.255-3.374.059-1.28.072-1.69.072-7.539 0-5.849-.013-6.259-.072-7.539-.059-1.281-.275-2.394-1.255-3.374-.98-.98-2.093-1.196-3.374-1.255C15.668.013 15.259 0 12 0z" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                  <span>Instagram</span>
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-2 text-sm">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">Total Referrals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      $240
                    </div>
                    <div className="text-xs text-gray-600">Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
