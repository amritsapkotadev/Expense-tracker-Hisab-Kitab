import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Bell,
  Search,
  Plus
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ET</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">
                 Expense Tracker
               </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Add Button */}
            <Link
              to="/add-expense"
              className="btn btn-primary btn-sm flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </Link>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                className="input pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-secondary-400 hover:text-secondary-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-secondary-700 hidden lg:block">
                  {user?.name}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-secondary-200">
                    <p className="text-sm font-medium text-secondary-900">{user?.name}</p>
                    <p className="text-xs text-secondary-500">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
+                  {/* Settings link removed as per request */}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary-200">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="input pl-10 w-full"
                />
              </div>

              {/* Mobile Quick Add */}
              <Link
                to="/add-expense"
                className="btn btn-primary btn-sm w-full flex items-center justify-center space-x-2 mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
              </Link>

              {/* Mobile Navigation Links */}
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link
                to="/expenses"
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Expenses
              </Link>
              
              <Link
                to="/reports"
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </Link>

              {/* Mobile Profile Section */}
              <div className="border-t border-secondary-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="px-4 py-2 border-b border-secondary-200">
                    <p className="text-sm font-medium text-secondary-900">{user?.name}</p>
                  </div>
                </div>
                
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Setting
                </Link>
+                {/* Settings link removed as per request */}
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Overlay for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
