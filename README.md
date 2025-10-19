# Expense Tracker - Full Stack Web Application

A comprehensive expense management system built with React frontend and Node.js backend. Track your expenses, analyze spending patterns, and generate detailed reports with beautiful visualizations.

## 🚀 Features

- **🔐 User Authentication**: Secure signup, login, OTP verification, and password reset
- **💰 Expense Management**: Add, edit, delete expenses with categories and tags
- **📊 Data Visualization**: Interactive charts showing spending patterns and trends
- **📈 Reports & Analytics**: Monthly summaries, category breakdowns, and CSV export
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔒 Security**: JWT authentication, password hashing, and protected routes
- **📧 Email Integration**: OTP verification and password reset via email

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Beautiful charts and data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **React Hook Form** - Form handling and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email sending
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

## 📁 Project Structure

```
Hisab.kitab/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables
│   ├── /config
│   │   └── db.js                 # Database configuration
│   ├── /models
│   │   ├── User.js               # User model
│   │   └── Expense.js            # Expense model
│   ├── /controllers
│   │   ├── authController.js     # Authentication logic
│   │   ├── expenseController.js  # Expense CRUD operations
│   │   └── reportController.js   # Reports and analytics
│   ├── /routes
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── expenseRoutes.js      # Expense routes
│   │   └── reportRoutes.js       # Report routes
│   ├── /middleware
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── errorHandler.js       # Error handling
│   └── /utils
│       ├── sendEmail.js          # Email utilities
│       └── generateOTP.js        # OTP generation
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # App entry point
│   │   ├── /components
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Sidebar.jsx       # Sidebar navigation
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── /pages
│   │   │   ├── Signup.jsx        # User registration
│   │   │   ├── VerifyOTP.jsx     # OTP verification
│   │   │   ├── Login.jsx         # User login
│   │   │   ├── ForgotPassword.jsx # Password reset request
│   │   │   ├── ResetPassword.jsx # Password reset
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── AddExpense.jsx    # Add expense form
│   │   │   ├── ExpenseList.jsx   # Expense list and management
│   │   │   └── Reports.jsx       # Reports and analytics
│   │   ├── /context
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── /utils
│   │   │   ├── api.js            # API client
│   │   │   └── helpers.js        # Utility functions
│   │   └── /styles
│   │       └── global.css        # Global styles
│   ├── package.json              # Frontend dependencies
│   ├── .env                      # Environment variables
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
├── setup.sh                      # Automated setup script
└── README.md                     # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone or download the project**
2. **Run the setup script:**
   ```bash
   ./setup.sh
   ```
3. **Configure environment variables** (see Configuration section below)
4. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

### Option 2: Manual Setup

#### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/atlas)
- **Email service** (Gmail, Outlook, etc.) for OTP functionality

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/api/health

## ⚙️ Configuration

### Backend Environment Variables (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters

# Email Configuration (Gmail example)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Client Configuration
CLIENT_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

### Frontend Environment Variables (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:4000/api
```

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas account** at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Create a database user** with read/write permissions
4. **Whitelist your IP address** (or use 0.0.0.0/0 for development)
5. **Get your connection string** and replace the placeholder in `.env`

### Email Configuration

For Gmail:
1. **Enable 2-factor authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the app password** in your `.env` file

For other email providers, check their documentation for SMTP settings.

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **OTP Verification**: Email-based account verification
- **Protected Routes**: Client and server-side route protection
- **CORS Configuration**: Cross-origin request security
- **Input Validation**: Comprehensive form and API validation
- **Rate Limiting**: API request rate limiting
- **Helmet**: Security headers middleware

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration with OTP
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User authentication
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/profile` - Get user profile

### Expenses
- `GET /api/expenses` - Get user expenses (with pagination and filters)
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

### Reports
- `GET /api/reports/summary` - Get expense summary
- `GET /api/reports/trends` - Get spending trends
- `GET /api/reports/insights` - Get spending insights
- `GET /api/reports/detailed.csv` - Download CSV report

### Health Check
- `GET /api/health` - API health status

## 🧪 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Create a new account** at http://localhost:5173/signup
3. **Check your email** for the OTP verification code
4. **Verify your email** and complete registration
5. **Add some sample expenses** to test the functionality
6. **View the dashboard** to see charts and analytics
7. **Generate reports** and download CSV files
8. **Test the responsive design** on different screen sizes

## 🚀 Deployment

### Backend Deployment (Heroku Example)

1. **Create a Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_password
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel Example)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   npx vercel --prod
   ```

3. **Update environment variables** in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL

### Production Considerations

- **Use environment-specific configurations**
- **Enable HTTPS** for both frontend and backend
- **Set up proper CORS** for your production domain
- **Use a production database** (MongoDB Atlas)
- **Configure proper logging** and monitoring
- **Set up backup strategies** for your database

## 🛠 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (when implemented)

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure Guidelines

- **Components**: Reusable UI components
- **Pages**: Route-level components
- **Context**: Global state management
- **Utils**: Helper functions and API clients
- **Styles**: Global CSS and Tailwind configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Verify your environment variables** are correctly set
3. **Ensure all dependencies** are installed
4. **Check the console** for error messages
5. **Create an issue** with detailed information about your problem

## 🎯 Future Enhancements

- [ ] Budget tracking and alerts
- [ ] Multi-currency support
- [ ] Receipt image upload
- [ ] PDF report generation
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] Data import/export features
- [ ] Advanced analytics and insights
- [ ] Team/family expense sharing
- [ ] Integration with banking APIs
