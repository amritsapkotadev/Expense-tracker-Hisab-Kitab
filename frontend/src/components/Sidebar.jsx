import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home,
  Plus,
  FileText,
  BarChart3,
  Download,
  User,
  LogOut,
  CreditCard
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Add Expense',
      href: '/add-expense',
      icon: Plus,
      current: location.pathname === '/add-expense',
    },
    {
      name: 'Transactions',
      href: '/expenses',
      icon: FileText,
      current: location.pathname === '/expenses',
    },
    {
      name: 'Generate Report',
      href: '/reports',
      icon: BarChart3,
      current: location.pathname === '/reports',
    },
    {
      name: 'Download CSV',
      href: '/download-csv',
      icon: Download,
      current: location.pathname === '/download-csv',
    },
   
  ];

  const secondaryNav = [
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      current: location.pathname === '/profile',
    },
    {
      name: 'Logout',
      href: '/login',
      icon: LogOut,
      current: false,
    },

  ];

  return (
    <>
      {/* Desktop Sidebar - Reduced Width */}
      <div className="hidden lg:flex lg:w-56 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:pb-0 lg:bg-white lg:border-r lg:border-gray-100">
        {/* Compact Header */}
        <div className="flex items-center px-4 py-5 border-b border-gray-100">
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center mr-3">
            <CreditCard className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Budget</h1>
          </div>
        </div>

        {/* Main Navigation - Compact */}
        <nav className="flex-1 px-3 py-4 space-y-3">
          <div className="px-2 mb-3">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Menu</h3>
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon
                  className={`mr-3 h-4 w-4 ${
                    item.current ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`
                  }
                >
                  <Icon
                    className={`mr-3 h-4 w-4 ${
                      item.current ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  />
                  <span className="text-sm">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* User Profile - Compact */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <User className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <nav className="flex justify-around items-center py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex flex-col items-center p-1 flex-1 max-w-16 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`
                }
              >
                <div className={`p-2 rounded-lg ${
                  item.current ? 'bg-blue-50' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1 font-medium text-center">
                  {item.name.split(' ')[0]}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default Sidebar;