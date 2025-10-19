import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { expenseAPI } from '../utils/api';
import { formatCurrency, formatDate, getCategoryColor } from '../utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getExpenseStats({ period: '30' });
      setStats(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { summary, categoryStats, monthlyTrend, recentExpenses } = stats || {};

  // Prepare data for charts
  const monthlyData = monthlyTrend?.map(item => ({
    month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
    amount: item.total,
    count: item.count
  })) || [];

  const pieData = categoryStats?.map(item => ({
    name: item._id,
    value: item.total,
    count: item.count
  })) || [];

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-secondary-600">Welcome back! Here's your expense overview.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/add-expense"
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Amount */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Spent</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {formatCurrency(summary?.totalAmount || 0)}
                </p>
                <p className="text-sm text-secondary-500">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Expenses</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {summary?.totalCount || 0}
                </p>
                <p className="text-sm text-secondary-500">Transactions</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Average Amount */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Average</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {formatCurrency(summary?.totalAmount / (summary?.totalCount || 1))}
                </p>
                <p className="text-sm text-secondary-500">Per expense</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Categories</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {categoryStats?.length || 0}
                </p>
                <p className="text-sm text-secondary-500">Active</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Trend</h3>
            <p className="card-description">Your spending over the last 6 months</p>
          </div>
          <div className="card-content">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year.slice(2)}`;
                    }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Amount']}
                    labelFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year}`;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Category Distribution</h3>
            <p className="card-description">Spending breakdown by category</p>
          </div>
          <div className="card-content">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card-title">Recent Expenses</h3>
              <p className="card-description">Your latest transactions</p>
            </div>
            <Link
              to="/expenses"
              className="btn btn-outline btn-sm flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="card-content">
          {recentExpenses && recentExpenses.length > 0 ? (
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: getCategoryColor(expense.category) }}
                    >
                      {expense.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{expense.title}</p>
                      <p className="text-sm text-secondary-500">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {formatDate(expense.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600 mb-4">No expenses yet</p>
              <Link to="/add-expense" className="btn btn-primary">
                Add Your First Expense
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/add-expense"
          className="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="card-content text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-medium text-secondary-900 mb-2">Add Expense</h3>
            <p className="text-sm text-secondary-600">Record a new expense</p>
          </div>
        </Link>

        <Link
          to="/expenses"
          className="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="card-content text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-secondary-900 mb-2">View Expenses</h3>
            <p className="text-sm text-secondary-600">Browse all transactions</p>
          </div>
        </Link>

        <Link
          to="/reports"
          className="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="card-content text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-secondary-900 mb-2">Generate Reports</h3>
            <p className="text-sm text-secondary-600">Download detailed reports</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
