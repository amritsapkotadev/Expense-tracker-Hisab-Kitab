import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Plus, List, BarChart3, User } from 'lucide-react';

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
      name: 'Expenses',
      href: '/expenses',
      icon: List,
      current: location.pathname === '/expenses',
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: BarChart3,
      current: location.pathname === '/reports',
    },
  ];


  // Quick stats removed per user request

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:pb-0 lg:bg-secondary-50 lg:border-r lg:border-secondary-200">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`
                }
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current
                      ? 'text-primary-500'
                      : 'text-secondary-400 group-hover:text-secondary-500'
                  }`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Stats removed */}

        {/* User Profile Section */}
        <div className="px-4 py-4 border-t border-secondary-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">
                John Doe
              </p>
              
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
