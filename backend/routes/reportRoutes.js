const express = require('express');
const {
  getExpenseSummary,
  downloadCSV,
  getExpenseTrends,
  getExpenseInsights
} = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/summary', getExpenseSummary);
router.get('/trends', getExpenseTrends);
router.get('/insights', getExpenseInsights);
router.get('/detailed.csv', downloadCSV);

module.exports = router;
