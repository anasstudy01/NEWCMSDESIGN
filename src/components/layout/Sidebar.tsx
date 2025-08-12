import React, { useState } from 'react';
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
  ChevronDown,
  ChevronRight,
  Plus,
  Settings as ManageIcon,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Main sidebar navigation component
 * Displays navigation menu and company branding
 */
const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      name: 'Accounts',
      icon: TrendingUp,
      submenu: [
        { name: 'Create Account', href: '/trading-account', icon: Plus },
        { name: 'Manage Account', href: '/manage-account', icon: ManageIcon },
        { name: 'Live Accounts', href: '/live-accounts', icon: TrendingUp },
      ]
    },
    { name: 'KYC Verification', href: '/kyc', icon: FileText },
    { name: 'Deposits', href: '/deposits', icon: CreditCard },
    { name: 'Internal Transfer', href: '/internal-transfer', icon: ArrowRightLeft },
    { name: 'IB Request', href: '/ib-request', icon: Users },
    { name: '2FA Settings', href: '/2fa', icon: Shield },
  ];

  const toggleSubmenu = (menuName: string) => {
    const lowerMenuName = menuName.toLowerCase();
    setExpandedMenus(prev => 
      prev.includes(lowerMenuName) 
        ? prev.filter(name => name !== lowerMenuName)
        : [...prev, lowerMenuName]
    );
  };

  const isSubmenuExpanded = (menuName: string) => {
    return expandedMenus.includes(menuName.toLowerCase());
  };

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
                const hasSubmenu = 'submenu' in item && item.submenu;
                const isExpanded = hasSubmenu && isSubmenuExpanded(item.name);
                
                if (hasSubmenu) {
                  return (
                    <li key={item.name}>
                      {/* Parent menu item with submenu */}
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-green-700" />
                        {item.name}
                        {isExpanded ? (
                          <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      
                      {/* Submenu items */}
                      {isExpanded && item.submenu && (
                        <ul className="mt-1 pl-6 space-y-1">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isActive = location.pathname === subItem.href;
                            
                            return (
                              <li key={subItem.name}>
                                <NavLink
                                  to={subItem.href}
                                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors ${
                                    isActive
                                      ? 'bg-green-50 text-green-700'
                                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                                  }`}
                                >
                                  <SubIcon
                                    className={`h-4 w-4 shrink-0 ${
                                      isActive ? 'text-green-700' : 'text-gray-400 group-hover:text-green-700'
                                    }`}
                                  />
                                  {subItem.name}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  // Regular menu item without submenu
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href!}
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
                }
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
