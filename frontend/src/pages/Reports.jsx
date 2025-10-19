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
  PieChart as PieChartIcon,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Info
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
  const [showFilters, setShowFilters] = useState(false);

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
        startDate: dateRange === 'custom' ? undefined : undefined,
        endDate: undefined,
      };

      const response = await reportsAPI.downloadCSV(params);
      
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
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading your financial insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-600 mb-4 text-lg">{error}</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
                <p className="mt-2 text-gray-600">Detailed insights into your spending patterns and trends</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                <button
  onClick={downloadCSV}
  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
             bg-gradient-to-r from-primary-500 to-primary-600 
             text-white font-medium hover:from-primary-600 hover:to-primary-700 
             shadow-md hover:shadow-lg transition-all duration-200"
>
  <Download className="w-4 h-4" />
  <span>Export CSV</span>
</button>

              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'summary', name: 'Overview', icon: BarChart3 },
                    { id: 'trends', name: 'Trends', icon: TrendingUp },
                    { id: 'insights', name: 'Insights', icon: PieChartIcon },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary-500 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Time Period</span>
                  </div>
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full input"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full input"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group By
                </label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="w-full input"
                >
                  <option value="month">Month</option>
                  <option value="category">Category</option>
                  <option value="day">Day</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Tab */}
        {activeTab === 'summary' && summary && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(summary.summary.totalAmount)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {summary.summary.totalCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(summary.summary.averageAmount)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {summary.categoryBreakdown?.length || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <PieChartIcon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
                  <p className="text-gray-600 mt-1">Spending distribution by category</p>
                </div>
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

              {/* Grouped Data */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {groupBy === 'month' ? 'Monthly' : groupBy === 'category' ? 'Category' : 'Daily'} Breakdown
                  </h3>
                  <p className="text-gray-600 mt-1">Spending by {groupBy}</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.groupedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Amount']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && trends && (
          <div className="space-y-8">
            {/* Monthly Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
                <p className="text-gray-600 mt-1">Spending patterns over time</p>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trends.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Amount']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#1D4ED8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Spending Categories</h3>
                <p className="text-gray-600 mt-1">Categories with highest spending</p>
              </div>
              <div className="space-y-4">
                {trends.topCategories?.map((category, index) => (
                  <div key={category._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <span className="font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{category._id}</p>
                        <p className="text-sm text-gray-500">
                          {category.count} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(category.total)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Avg: {formatCurrency(category.average)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && insights && (
          <div className="space-y-8">
            {/* Spending Change */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Spending Analysis</h3>
                <p className="text-gray-600 mt-1">Compare with previous period</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center justify-center mb-4">
                    {insights.insights.spendingChange.total > 0 ? (
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <ArrowUp className="w-8 h-8 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <ArrowDown className="w-8 h-8 text-green-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-2">Total Spending</p>
                  <p className={`text-3xl font-bold mb-2 ${
                    insights.insights.spendingChange.total > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {insights.insights.spendingChange.total > 0 ? '+' : ''}
                    {insights.insights.spendingChange.total}%
                  </p>
                  <p className="text-gray-500">
                    {insights.insights.spendingChange.trend} from last period
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center justify-center mb-4">
                    {insights.insights.spendingChange.average > 0 ? (
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <ArrowUp className="w-8 h-8 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <ArrowDown className="w-8 h-8 text-green-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-2">Average Spending</p>
                  <p className={`text-3xl font-bold mb-2 ${
                    insights.insights.spendingChange.average > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {insights.insights.spendingChange.average > 0 ? '+' : ''}
                    {insights.insights.spendingChange.average}%
                  </p>
                  <p className="text-gray-500">
                    Per transaction
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {insights.insights.recommendations?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Smart Recommendations</h3>
                  <p className="text-gray-600 mt-1">Tips to improve your spending habits</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.insights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-blue-800 leading-relaxed">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Category Insights</h3>
                <p className="text-gray-600 mt-1">Detailed breakdown by category</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.categoryInsights?.map((category) => (
                  <div key={category._id} className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{category._id}</h4>
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                        {category.count} items
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {formatCurrency(category.total)}
                    </p>
                    <p className="text-gray-500">
                      Avg: {formatCurrency(category.average)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;