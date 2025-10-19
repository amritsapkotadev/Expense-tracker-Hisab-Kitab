const express = require('express');
const { body } = require('express-validator');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
} = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation rules
const expenseValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('category')
    .isIn([
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Groceries',
      'Personal Care',
      'Gifts & Donations',
      'Business',
      'Other'
    ])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be between 1 and 20 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

// Routes
router.get('/stats', getExpenseStats);
router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', expenseValidation, createExpense);
router.put('/:id', expenseValidation, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
