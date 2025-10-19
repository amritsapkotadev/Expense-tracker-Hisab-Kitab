import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  Bell,
  Save
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend to update profile/settings
    alert('Profile settings saved (placeholder).');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>

      {/* Account Information */}
      <section className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Account Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notification Preferences
        </h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Email notifications</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="notifications"
              checked={formState.notifications}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary-500 peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Appearance
        </h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="darkMode"
              checked={formState.darkMode || false}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary-500 peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" /> Security
        </h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Two-factor authentication</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="twoFactor"
              checked={formState.twoFactor || false}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary-500 peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
        <button className="btn btn-danger" onClick={() => alert('Account deletion flow (placeholder)')}>Delete Account</button>
      </section>
    </div>
  );
};

export default Profile;