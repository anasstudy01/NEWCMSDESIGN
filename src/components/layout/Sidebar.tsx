import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  FileText,
  ArrowRightLeft,
  Users,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

/**
 * Main sidebar navigation component
 * Displays navigation menu and company branding
 */
const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Accounts', href: '/live-accounts', icon: TrendingUp },
    { name: 'Trading Account', href: '/trading-account', icon: CreditCard },
    { name: 'KYC Verification', href: '/kyc', icon: FileText },
    { name: 'Deposits', href: '/deposits', icon: CreditCard },
    { name: 'Internal Transfer', href: '/internal-transfer', icon: ArrowRightLeft },
    { name: 'IB Request', href: '/ib-request', icon: Users },
    { name: '2FA Settings', href: '/2fa', icon: Shield },
  ];

  return (
    <div 
      className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 shadow-sm"
      style={{
        background: 'linear-gradient(349deg, rgba(12, 247, 114, 1) 0%, rgba(87, 199, 133, 1) 26%, rgba(255, 240, 240, 1) 100%)'
      }}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AMBITIOUS</h1>
            <p className="text-xs text-gray-500">CAPITAL LIMITED</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? 'text-green-700' : 'text-gray-400 group-hover:text-green-700'
                        }`}
                      />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Bottom section */}
          <li className="mt-auto">
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <a
                  href="#"
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50"
                >
                  <Settings className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-green-700" />
                  Settings
                </a>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-700" />
                  Sign out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
