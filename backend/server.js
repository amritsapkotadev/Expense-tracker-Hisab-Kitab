const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Trust proxy - required for Render and other reverse proxies
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

 
const envClientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null;
const allowedOrigins = [
  envClientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://expense-tracker-hisab-kitab-2.onrender.com'
].filter(Boolean);

console.log('🔒 Allowed CORS origins:', allowedOrigins);

 const corsOptions = {
  origin: function (origin, callback) {
     if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');
    
    console.log('🌐 Request from origin:', normalizedOrigin);
    
     if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    
    console.log('❌ Origin not allowed:', normalizedOrigin);
    return callback(new Error('CORS policy: This origin is not allowed.'));
  },
  credentials: true,  
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Root route for Render check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Expense Tracker API 🚀',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Expense Tracker API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}/api`);
});
