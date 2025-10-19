import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { reportsAPI } from '../utils/api';
import { formatCurrency, getCategoryColor, getExpenseCategories } from '../utils/helpers';
import { toast } from 'react-toastify';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [groupBy, setGroupBy] = useState('month');
  const [activeTab, setActiveTab] = useState('summary');

  const categories = getExpenseCategories();

  useEffect(() => {
    fetchReportsData();
  }, [dateRange, selectedCategory, groupBy]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      
      const params = {
        period: dateRange,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        groupBy,
      };

      const [summaryRes, trendsRes, insightsRes] = await Promise.all([
        reportsAPI.getSummary(params),
        reportsAPI.getTrends(params),
        reportsAPI.getInsights(params),
      ]);

      setSummary(summaryRes.data.data);
      setTrends(trendsRes.data.data);
      setInsights(insightsRes.data.data);
    } catch (err) {
      setError('Failed to load reports data');
      console.error('Reports error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    try {
      const params = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        startDate: dateRange === 'custom' ? undefined : undefined, // Add custom date logic if needed
        endDate: undefined,
      };

      const response = await reportsAPI.downloadCSV(params);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expense_report_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('CSV report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download CSV report');
    }
  };

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

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
          onClick={fetchReportsData}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Reports & Analytics</h1>
          <p className="text-secondary-600">Detailed insights into your spending patterns</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={downloadCSV}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Date Range */}
              <div>
                <label className="label">Time Period</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="input"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
                  <option value="180">Last 6 months</option>
                  <option value="365">Last year</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="label">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Group By */}
              <div>
                <label className="label">Group By</label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="input"
                >
                  <option value="month">Month</option>
                  <option value="category">Category</option>
                  <option value="day">Day</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'summary', name: 'Summary', icon: BarChart3 },
            { id: 'trends', name: 'Trends', icon: TrendingUp },
            { id: 'insights', name: 'Insights', icon: PieChartIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && summary && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Total Amount</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {formatCurrency(summary.summary.totalAmount)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {summary.summary.totalCount}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Average</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {formatCurrency(summary.summary.averageAmount)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Categories</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {summary.categoryBreakdown?.length || 0}
                    </p>
                  </div>
                  <PieChartIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Category Breakdown</h3>
                <p className="card-description">Spending distribution by category</p>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summary.categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                      >
                        {summary.categoryBreakdown?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Grouped Data */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  {groupBy === 'month' ? 'Monthly' : groupBy === 'category' ? 'Category' : 'Daily'} Breakdown
                </h3>
                <p className="card-description">Spending by {groupBy}</p>
              </div>
              <div className="card-content">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.groupedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="_id" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (groupBy === 'month') {
                            const [year, month] = value.split('-');
                            return `${month}/${year.slice(2)}`;
                          }
                          return value;
                        }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                      <Bar dataKey="total" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && trends && (
        <div className="space-y-6">
          {/* Monthly Trends */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Monthly Trends</h3>
              <p className="card-description">Spending patterns over time</p>
            </div>
            <div className="card-content">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trends.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="_id" 
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
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Top Spending Categories</h3>
              <p className="card-description">Categories with highest spending</p>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {trends.topCategories?.map((category, index) => (
                  <div key={category._id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{category._id}</p>
                        <p className="text-sm text-secondary-500">
                          {category.count} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-secondary-900">
                        {formatCurrency(category.total)}
                      </p>
                      <p className="text-sm text-secondary-500">
                        Avg: {formatCurrency(category.average)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && insights && (
        <div className="space-y-6">
          {/* Spending Change */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Spending Analysis</h3>
              <p className="card-description">Compare with previous period</p>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-center mb-4">
                    {insights.insights.spendingChange.total > 0 ? (
                      <TrendingUp className="w-8 h-8 text-red-600" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">Total Spending</p>
                  <p className={`text-2xl font-bold ${
                    insights.insights.spendingChange.total > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {insights.insights.spendingChange.total > 0 ? '+' : ''}
                    {insights.insights.spendingChange.total}%
                  </p>
                  <p className="text-sm text-secondary-500">
                    {insights.insights.spendingChange.trend} from last period
                  </p>
                </div>

                <div className="text-center p-6 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-center mb-4">
                    {insights.insights.spendingChange.average > 0 ? (
                      <TrendingUp className="w-8 h-8 text-red-600" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">Average Spending</p>
                  <p className={`text-2xl font-bold ${
                    insights.insights.spendingChange.average > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {insights.insights.spendingChange.average > 0 ? '+' : ''}
                    {insights.insights.spendingChange.average}%
                  </p>
                  <p className="text-sm text-secondary-500">
                    Per transaction
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {insights.insights.recommendations?.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recommendations</h3>
                <p className="card-description">Tips to improve your spending habits</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {insights.insights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-blue-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Insights */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Category Insights</h3>
              <p className="card-description">Detailed breakdown by category</p>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.categoryInsights?.map((category) => (
                  <div key={category._id} className="p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-secondary-900">{category._id}</h4>
                      <span className="text-sm text-secondary-500">{category.count} items</span>
                    </div>
                    <p className="text-2xl font-bold text-secondary-900 mb-1">
                      {formatCurrency(category.total)}
                    </p>
                    <p className="text-sm text-secondary-500">
                      Avg: {formatCurrency(category.average)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
