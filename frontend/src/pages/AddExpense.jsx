import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { expenseAPI } from '../utils/api';
import { getExpenseCategories } from '../utils/helpers';
import { toast } from 'react-toastify';
import { 
  Save, 
  X, 
  Calendar, 
  DollarSign, 
  Tag, 
  FileText,
  Plus
} from 'lucide-react';

const AddExpense = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const categories = getExpenseCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      category: 'Other',
      tags: [],
    },
  });

  const watchedTags = watch('tags') || [];

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Prepare the expense data
      const expenseData = {
        ...data,
        amount: parseFloat(data.amount),
        tags: Array.isArray(data.tags) ? data.tags : [],
      };

      const response = await expenseAPI.createExpense(expenseData);
      
      toast.success('Expense added successfully!');
      navigate('/expenses');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add expense';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/expenses');
  };

  const addTag = (tagInput) => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue('tags', [...watchedTags, tagInput.trim()]);
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Add New Expense</h1>
        <p className="text-secondary-600">Record a new expense transaction</p>
      </div>

      {/* Form */}
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="label">
                Expense Title *
              </label>
              <input
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 100,
                    message: 'Title cannot exceed 100 characters',
                  },
                })}
                type="text"
                id="title"
                className="input"
                placeholder="e.g., Grocery shopping, Gas, Coffee"
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}
            </div>

            {/* Amount and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="label">
                  Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    {...register('amount', {
                      required: 'Amount is required',
                      min: {
                        value: 0.01,
                        message: 'Amount must be greater than 0',
                      },
                    })}
                    type="number"
                    id="amount"
                    step="0.01"
                    min="0.01"
                    className="input pl-10"
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && (
                  <p className="form-error">{errors.amount.message}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="label">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    {...register('date', {
                      required: 'Date is required',
                    })}
                    type="date"
                    id="date"
                    className="input pl-10"
                  />
                </div>
                {errors.date && (
                  <p className="form-error">{errors.date.message}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="label">
                Category *
              </label>
              <select
                {...register('category', {
                  required: 'Category is required',
                })}
                id="category"
                className="input"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="form-error">{errors.category.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="label">Tags</label>
              <div className="space-y-3">
                {/* Tag Input */}
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Add a tag and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>

                {/* Display Tags */}
                {watchedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {watchedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="label">
                Notes
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
                <textarea
                  {...register('notes', {
                    maxLength: {
                      value: 500,
                      message: 'Notes cannot exceed 500 characters',
                    },
                  })}
                  id="notes"
                  rows={4}
                  className="input pl-10 resize-none"
                  placeholder="Add any additional notes about this expense..."
                />
              </div>
              {errors.notes && (
                <p className="form-error">{errors.notes.message}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg flex-1 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-5 h-5" />
                    <span>Adding Expense...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Add Expense</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline btn-lg flex-1 flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Quick Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use descriptive titles to easily identify expenses later</li>
          <li>• Add tags to categorize expenses for better filtering</li>
          <li>• Include notes for business expenses or tax purposes</li>
          <li>• Choose the most appropriate category for accurate reporting</li>
        </ul>
      </div>
    </div>
  );
};

export default AddExpense;
