import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { expenseAPI } from "../utils/api";
import {
  formatCurrency,
  formatDate,
  getCategoryColor,
  getExpenseCategories,
} from "../utils/helpers";
import { toast } from "react-toastify";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const response = await expenseAPI.getExpenses(params);
      setExpenses(response.data.data.expenses);
      setTotalPages(response.data.data.pagination.totalPages);
      setSummary(response.data.data.summary);
    } catch (err) {
      setError("Failed to load expenses");
      console.error("Expenses error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await expenseAPI.deleteExpense(expenseId);
      toast.success("Expense deleted successfully");
      fetchExpenses();
      setShowDeleteModal(false);
      setSelectedExpense(null);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete expense";
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
    if (type === "start") setStartDate(value);
    else setEndDate(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const downloadCSV = async () => {
    try {
      const params = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const response = await expenseAPI.downloadCSV(params);
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `expenses_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("CSV downloaded successfully");
    } catch (error) {
      toast.error("Failed to download CSV");
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-1">Expenses</h1>
          <p className="text-secondary-600">Manage and track all your expenses in one place</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={downloadCSV}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-primary-500 
                       text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/add-expense"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 
                       text-white hover:bg-primary-700 transition-all duration-200 font-medium shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(summary.totalAmount)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Tag className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-gray-800">
              {summary.totalExpenses}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-2xl font-semibold text-gray-800">
              {summary.categoryStats?.length || 0}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-primary-500 
                       text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="md:col-span-3 flex justify-center mt-3">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Tags</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{expense.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor:
                            getCategoryColor(expense.category) + "20",
                          color: getCategoryColor(expense.category),
                        }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatCurrency(expense.amount)}</td>
                    <td className="py-3 px-4">{formatDate(expense.date)}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-1 flex-wrap">
                        {expense.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      <Link
                        to={`/expenses/${expense._id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedExpense(expense);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <DollarSign className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No expenses found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or add a new expense.
            </p>
            <Link
              to="/add-expense"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
