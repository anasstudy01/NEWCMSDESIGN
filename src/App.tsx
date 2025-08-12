import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import LiveAccounts from "./pages/LiveAccounts";
import ManageAccount from "./pages/ManageAccount";
import TradingAccountCreation from "./pages/TradingAccountCreation";
import KYCVerification from "./pages/KYCVerification";
import Deposits from "./pages/Deposits";
import InternalTransfer from "./pages/InternalTransfer";
import IBRequest from "./pages/IBRequest";
import TwoFactorAuth from "./pages/TwoFactorAuth";

/**
 * Main App component that handles routing and authentication state
 * Implements protected routes for authenticated users
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  /**
   * Handle user login
   * @param token - Authentication token
   */
  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected Routes */}
        <Route  path="/*" element={ isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/live-accounts" element={<LiveAccounts />} />
                  <Route path="/manage-account" element={<ManageAccount />} />
                  <Route
                    path="/trading-account"
                    element={<TradingAccountCreation />}
                  />
                  <Route path="/kyc" element={<KYCVerification />} />
                  <Route path="/deposits" element={<Deposits />} />
                  <Route
                    path="/internal-transfer"
                    element={<InternalTransfer />}
                  />
                  <Route path="/ib-request" element={<IBRequest />} />
                  <Route path="/2fa" element={<TwoFactorAuth />} />
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
