import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import LiveAccounts from "./pages/LiveAccounts";

import TradingAccountCreation from "./pages/TradingAccountCreation";
import KYCVerification from "./pages/KYCVerification";
import Deposits from "./pages/Deposits";
import InternalTransfer from "./pages/InternalTransfer";
import IBRequest from "./pages/IBRequest";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import MyAccounts from "./pages/MyAccount";
import ManageAccounts from "./pages/ManageAccounts";


/**
 * Main App component that handles routing and authentication state
 * Implements protected routes for authenticated users
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

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
   * Handle user signup
   * @param token - Authentication token
   */
  const handleSignup = (token: string) => {
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

  /**
   * Switch to signup page
   */
  const switchToSignup = () => {
    setShowSignup(true);
  };

  /**
   * Switch to login page
   */
  const switchToLogin = () => {
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              showSignup ? (
                <SignupPage 
                  onSignup={handleSignup} 
                  onSwitchToLogin={switchToLogin}
                />
              ) : (
                <LoginPage 
                  onLogin={handleLogin} 
                  onSwitchToSignup={switchToSignup}
                />
              )
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage 
                onSignup={handleSignup} 
                onSwitchToLogin={switchToLogin}
              />
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
                  <Route path="/my-accounts" element={<MyAccounts />} />
                  <Route path="/manage-accounts" element={<ManageAccounts />} />
                

                  <Route path="/trading-account" element={<TradingAccountCreation />}
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
