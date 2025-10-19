import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  DollarSign,
  Tag,
  Eye,
  MoreVertical
} from 'lucide-react';
import { expenseAPI } from '../utils/api';
import { formatCurrency, formatDate, getCategoryColor, getExpenseCategories } from '../utils/helpers';
import { toast } from 'react-toastify';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [summary, setSummary] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const categories = getExpenseCategories();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchExpenses();
  }, [currentPage, searchTerm, selectedCategory, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const response = await expenseAPI.getExpenses(params);
      setExpenses(response.data.data.expenses);
      setTotalPages(response.data.data.pagination.totalPages);
      setSummary(response.data.data.summary);
    } catch (err) {
      setError('Failed to load expenses');
      console.error('Expenses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await expenseAPI.deleteExpense(expenseId);
      toast.success('Expense deleted successfully');
      fetchExpenses();
      setShowDeleteModal(false);
      setSelectedExpense(null);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete expense';
      toast.error(message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const downloadCSV = async () => {
    try {
      const params = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const response = await expenseAPI.downloadCSV(params);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('CSV downloaded successfully');
    } catch (error) {
      toast.error('Failed to download CSV');
    }
  };

  if (loading && expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Expenses</h1>
          <p className="text-secondary-600">Manage and track your expenses</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={downloadCSV}
            className="btn btn-outline flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
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
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Amount</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {formatCurrency(summary.totalAmount)}
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
                    {summary.totalExpenses}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Categories</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {summary.categoryStats?.length || 0}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="label">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
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

                {/* Start Date */}
                <div>
                  <label className="label">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4">
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="card">
        <div className="card-content p-0">
          {expenses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>
                        <div>
                          <p className="font-medium text-secondary-900">
                            {expense.title}
                          </p>
                          {expense.notes && (
                            <p className="text-sm text-secondary-500 truncate max-w-xs">
                              {expense.notes}
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: getCategoryColor(expense.category) + '20',
                            color: getCategoryColor(expense.category),
                          }}
                        >
                          {expense.category}
                        </span>
                      </td>
                      <td>
                        <span className="font-medium text-secondary-900">
                          {formatCurrency(expense.amount)}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-600">
                          {formatDate(expense.date)}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {expense.tags?.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary-100 text-secondary-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {expense.tags?.length > 2 && (
                            <span className="text-xs text-secondary-500">
                              +{expense.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/expenses/${expense._id}/edit`}
                            className="p-1 text-secondary-400 hover:text-primary-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedExpense(expense);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 text-secondary-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                No expenses found
              </h3>
              <p className="text-secondary-600 mb-6">
                {searchTerm || selectedCategory !== 'all' || startDate || endDate
                  ? 'Try adjusting your filters to see more results.'
                  : 'Get started by adding your first expense.'}
              </p>
              <Link to="/add-expense" className="btn btn-primary">
                Add Your First Expense
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-secondary-600">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-secondary-900 mb-4">
              Delete Expense
            </h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to delete "{selectedExpense.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedExpense(null);
                }}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedExpense._id)}
                className="btn bg-red-600 text-white hover:bg-red-700 flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
