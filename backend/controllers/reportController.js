const { Parser } = require('json2csv');
const Expense = require('../models/Expense');
const { sendCSVReportEmail } = require('../utils/sendEmail');

/**
 * Get expense summary for reports
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenseSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      startDate,
      endDate,
      category,
      groupBy = 'month' // month, category, day
    } = req.query;

    // Build filter object
    const filter = { userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    let groupStage = {};

    switch (groupBy) {
      case 'month':
        groupStage = {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        };
        break;
      case 'category':
        groupStage = {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        };
        break;
      case 'day':
        groupStage = {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        };
        break;
      default:
        groupStage = {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        };
    }

    const summary = await Expense.aggregate([
      { $match: filter },
      { $group: groupStage },
      { $sort: { total: -1 } }
    ]);

    // Get total summary
    const totalSummary = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
          averageAmount: { $avg: '$amount' },
          minAmount: { $min: '$amount' },
          maxAmount: { $max: '$amount' }
        }
      }
    ]);

    // Get category breakdown
    const categoryBreakdown = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          percentage: { $avg: '$amount' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Calculate percentages
    const totalAmount = totalSummary[0]?.totalAmount || 0;
    categoryBreakdown.forEach(cat => {
      cat.percentage = totalAmount > 0 ? ((cat.total / totalAmount) * 100).toFixed(2) : 0;
    });

    res.json({
      success: true,
      data: {
        summary: totalSummary[0] || {
          totalAmount: 0,
          totalCount: 0,
          averageAmount: 0,
          minAmount: 0,
          maxAmount: 0
        },
        groupedData: summary,
        categoryBreakdown,
        filters: {
          startDate,
          endDate,
          category,
          groupBy
        }
      }
    });
  } catch (error) {
    console.error('Get expense summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while generating expense summary'
    });
  }
};

/**
 * Download expenses as CSV
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
// Download CSV to browser
const downloadCSV = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      startDate,
      endDate,
      category
    } = req.query;

    // Build filter object
    const filter = { userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    // Get expenses
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .lean();

    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No expenses found for the specified criteria'
      });
    }

    // Prepare data for CSV
    const csvData = expenses.map(expense => ({
      'Date': new Date(expense.date).toLocaleDateString(),
      'Title': expense.title,
      'Amount': expense.amount,
      'Category': expense.category,
      'Tags': expense.tags.join(', '),
      'Notes': expense.notes || '',
      'Created At': new Date(expense.createdAt).toLocaleString()
    }));

    // Define CSV fields
    const fields = [
      { label: 'Date', value: 'Date' },
      { label: 'Title', value: 'Title' },
      { label: 'Amount', value: 'Amount' },
      { label: 'Category', value: 'Category' },
      { label: 'Tags', value: 'Tags' },
      { label: 'Notes', value: 'Notes' },
      { label: 'Created At', value: 'Created At' }
    ];

    // Generate CSV
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // Set headers for file download
    const filename = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    res.send(csv);
  } catch (error) {
    console.error('Download CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while generating CSV report'
    });
  }
};

/**
 * Get expense trends over time
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenseTrends = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '6' } = req.query; // months

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(period));

    // Monthly trends
    const monthlyTrends = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Category trends over time
    const categoryTrends = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            category: '$category',
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, total: -1 } }
    ]);

    // Top spending categories
    const topCategories = await Expense.aggregate([
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
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        monthlyTrends,
        categoryTrends,
        topCategories,
        period: parseInt(period)
      }
    });
  } catch (error) {
    console.error('Get expense trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching expense trends'
    });
  }
};

/**
 * Get expense insights and recommendations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenseInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Current period expenses
    const currentPeriod = await Expense.aggregate([
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
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      }
    ]);

    // Previous period for comparison
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - parseInt(period));

    const previousPeriod = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: previousStartDate, $lt: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      }
    ]);

    // Category insights
    const categoryInsights = await Expense.aggregate([
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
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Spending patterns
    const spendingPatterns = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: '$date' },
            hour: { $hour: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate insights
    const current = currentPeriod[0] || { total: 0, count: 0, average: 0 };
    const previous = previousPeriod[0] || { total: 0, count: 0, average: 0 };

    const totalChange = previous.total > 0 
      ? ((current.total - previous.total) / previous.total * 100).toFixed(1)
      : 0;

    const averageChange = previous.average > 0
      ? ((current.average - previous.average) / previous.average * 100).toFixed(1)
      : 0;

    const insights = {
      spendingChange: {
        total: totalChange,
        average: averageChange,
        trend: totalChange > 0 ? 'increased' : totalChange < 0 ? 'decreased' : 'unchanged'
      },
      topCategory: categoryInsights[0] || null,
      totalCategories: categoryInsights.length,
      spendingPatterns,
      recommendations: []
    };

    // Generate recommendations
    if (totalChange > 20) {
      insights.recommendations.push('Your spending has increased significantly. Consider reviewing your expenses.');
    }
    
    if (categoryInsights.length > 0) {
      const topCategory = categoryInsights[0];
      const topCategoryPercentage = (topCategory.total / current.total * 100).toFixed(1);
      if (topCategoryPercentage > 40) {
        insights.recommendations.push(`You're spending ${topCategoryPercentage}% on ${topCategory._id}. Consider diversifying your expenses.`);
      }
    }

    res.json({
      success: true,
      data: {
        insights,
        currentPeriod: current,
        previousPeriod: previous,
        categoryInsights,
        period: parseInt(period)
      }
    });
  } catch (error) {
    console.error('Get expense insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while generating expense insights'
    });
  }
};

// Build CSV from expenses array
const buildCSVFromExpenses = (expenses) => {
  // Prepare data for CSV
  const csvData = expenses.map(expense => ({
    'Date': new Date(expense.date).toLocaleDateString(),
    'Title': expense.title,
    'Amount': expense.amount,
    'Category': expense.category,
    'Tags': expense.tags.join(', '),
    'Notes': expense.notes || '',
    'Created At': new Date(expense.createdAt).toLocaleString()
  }));

  // Define CSV fields
  const fields = [
    { label: 'Date', value: 'Date' },
    { label: 'Title', value: 'Title' },
    { label: 'Amount', value: 'Amount' },
    { label: 'Category', value: 'Category' },
    { label: 'Tags', value: 'Tags' },
    { label: 'Notes', value: 'Notes' },
    { label: 'Created At', value: 'Created At' }
  ];

  // Generate CSV
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(csvData);
};

// Send CSV via email
const sendCSVReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate, category } = req.body || {};

    // Build filter
    const filter = { userId };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (category && category !== 'all') {
      filter.category = category;
    }

    const expenses = await Expense.find(filter).sort({ date: -1 }).lean();
    if (expenses.length === 0) {
      return res.status(404).json({ success: false, message: 'No expenses found for the specified criteria' });
    }

    const csv = buildCSVFromExpenses(expenses);
    const filename = `expenses_${new Date().toISOString().split('T')[0]}.csv`;

    // Send email
    await sendCSVReportEmail(req.user.email, req.user.name || 'User', csv, filename);

    res.json({ success: true, message: 'CSV report will be sent to your email shortly' });
  } catch (error) {
    console.error('Send CSV report email error:', error);
    res.status(500).json({ success: false, message: 'Internal server error while emailing CSV report' });
  }
};

module.exports = {
  getExpenseSummary,
  downloadCSV,
  sendCSVReport,
  getExpenseTrends,
  getExpenseInsights
};
