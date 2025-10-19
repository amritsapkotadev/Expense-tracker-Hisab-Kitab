const { validationResult } = require('express-validator');
const Expense = require('../models/Expense');

/**
 * Get all expenses for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      page = 1,
      limit = 10,
      category,
      startDate,
      endDate,
      search,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { userId };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get expenses with pagination
    const expenses = await Expense.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Expense.countDocuments(filter);

    // Calculate summary statistics
    const totalAmount = await Expense.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const categoryStats = await Expense.aggregate([
      { $match: filter },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        expenses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        },
        summary: {
          totalAmount: totalAmount[0]?.total || 0,
          totalExpenses: total,
          categoryStats
        }
      }
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching expenses'
    });
  }
};

/**
 * Get a single expense by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.json({
      success: true,
      data: { expense }
    });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching expense'
    });
  }
};

/**
 * Create a new expense
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createExpense = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user._id;
    const { title, amount, date, category, tags, notes } = req.body;

    const expense = new Expense({
      userId,
      title,
      amount,
      date: date ? new Date(date) : new Date(),
      category,
      tags: tags || [],
      notes
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: { expense }
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating expense'
    });
  }
};

/**
 * Update an existing expense
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateExpense = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const userId = req.user._id;
    const { title, amount, date, category, tags, notes } = req.body;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Update expense fields
    expense.title = title || expense.title;
    expense.amount = amount !== undefined ? amount : expense.amount;
    expense.date = date ? new Date(date) : expense.date;
    expense.category = category || expense.category;
    expense.tags = tags || expense.tags;
    expense.notes = notes !== undefined ? notes : expense.notes;

    await expense.save();

    res.json({
      success: true,
      message: 'Expense updated successfully',
      data: { expense }
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating expense'
    });
  }
};

/**
 * Delete an expense
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    await Expense.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting expense'
    });
  }
};

/**
 * Get expense statistics for dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenseStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Total expenses in period
    const totalExpenses = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Expenses by category
    const categoryStats = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Monthly trend (last 6 months)
    const monthlyTrend = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Recent expenses
    const recentExpenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .select('title amount date category')
      .lean();

    res.json({
      success: true,
      data: {
        summary: {
          totalAmount: totalExpenses[0]?.total || 0,
          totalCount: totalExpenses[0]?.count || 0,
          period: parseInt(period)
        },
        categoryStats,
        monthlyTrend,
        recentExpenses
      }
    });
  } catch (error) {
    console.error('Get expense stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching expense statistics'
    });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
};
