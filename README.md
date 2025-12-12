# 💰 Hisab Kitab - Expense Tracker

<div align="center">

![Hisab Kitab Banner](https://img.shields.io/badge/Hisab_Kitab-Financial_Intelligence-00D9FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyAzdjE4aDhWM0gzem0xMCAwdjE4aDhWM2gtOHoiIGZpbGw9IndoaXRlIi8+PC9zdmc+)

**A modern, AI-designed full-stack expense tracking application with beautiful UI/UX**

[🚀 Live Demo](https://expense-tracker-hisab-kitab-2.onrender.com) • [📖 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/amritsapkotadev/Expense-tracker-Hisab-Kitab/issues) • [✨ Request Feature](https://github.com/amritsapkotadev/Expense-tracker-Hisab-Kitab/issues)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/amritsapkotadev/Expense-tracker-Hisab-Kitab/pulls)

</div>

---

## 📖 About The Project

**Hisab Kitab** is a comprehensive expense management system that helps you take control of your finances. Built with modern web technologies and featuring an **AI-designed interface**, it combines powerful functionality with stunning aesthetics.

### 🎯 Why Hisab Kitab?

- ✨ **Beautiful UI/UX** - AI-crafted modern design with glassmorphism and smooth animations
- 🔐 **Secure Authentication** - OTP-based email verification and password reset
- 📊 **Smart Analytics** - Visual insights into your spending patterns
- 📧 **Email Reports** - Get detailed CSV reports delivered to your inbox via SendGrid
- 📱 **Fully Responsive** - Works flawlessly on desktop, tablet, and mobile
- 🚀 **Production Ready** - Deployed on Render with MongoDB Atlas

🌐 **Live Application**: [https://expense-tracker-hisab-kitab-2.onrender.com](https://expense-tracker-hisab-kitab-2.onrender.com)

## 🎥 Demo Video

[![Hisab Kitab Demo](https://img.youtube.com/vi/fFCOiw6GnEg/maxresdefault.jpg)](https://youtu.be/fFCOiw6GnEg)

**Watch the full demo**: [https://youtu.be/fFCOiw6GnEg](https://youtu.be/fFCOiw6GnEg)

## ✨ Features

### 🔐 Authentication & Security
- **Email/Password Authentication** - Secure user registration and login
- **OTP Email Verification** - 6-digit OTP sent via SendGrid for account verification
- **Password Reset Flow** - 3-step process: Email → OTP → New Password
- **JWT Token-Based Auth** - Stateless authentication with access tokens
- **Password Encryption** - bcryptjs hashing with salt rounds
- **Protected Routes** - Client and server-side route protection
- **Rate Limiting** - API request throttling to prevent abuse
- **CORS Configuration** - Secure cross-origin resource sharing
- **Helmet Security** - HTTP security headers
- **Input Validation** - Comprehensive form and API validation

### 💰 Expense Management
- **CRUD Operations** - Create, Read, Update, Delete expenses
- **13 Built-in Categories** - Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, Travel, Investment, Salary, Gifts, Others, Groceries
- **Custom Tags** - Organize expenses with personalized tags
- **Date Tracking** - Track when expenses occurred
- **Notes & Descriptions** - Add detailed notes to each expense
- **Amount Tracking** - Record expense amounts in your currency
- **Pagination** - Efficient handling of large expense lists
- **Search & Filter** - Find expenses by category, date, or amount

### 📊 Analytics & Visualization
- **Interactive Dashboard** - Real-time overview of your finances
- **Category Breakdown** - Pie charts showing spending by category
- **Monthly Trends** - Line charts tracking spending over time
- **Spending Statistics** - Total, average, and category-wise analysis
- **Visual Reports** - Beautiful charts powered by Recharts
- **Date Range Filters** - Analyze expenses for specific periods

### 📧 Email & Reports
- **Professional Email Templates** - Dark-themed HTML emails with brand gradients
- **OTP Delivery** - 6-digit verification codes via SendGrid
- **Password Reset Emails** - Secure password reset instructions
- **CSV Report Generation** - Detailed expense reports in CSV format
- **Email CSV Reports** - Receive reports directly in your inbox
- **SendGrid Integration** - Reliable email delivery (100 emails/day free)

### 🎨 UI/UX Design
- **AI-Crafted Interface** - Modern, intuitive design created by AI
- **Glassmorphism Effects** - Frosted glass aesthetic with backdrop blur
- **Gradient Themes** - Cyan, Violet, and Fuchsia color schemes
- **Smooth Animations** - Polished transitions and micro-interactions
- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Dark Mode Design** - Easy on the eyes with dark backgrounds
- **Lucide Icons** - Beautiful, consistent iconography
- **Toast Notifications** - User-friendly feedback messages

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
- **Node.js 16+** - JavaScript runtime
- **Express.js 4.x** - Fast, unopinionated web framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose 7.x** - Elegant MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **SendGrid (@sendgrid/mail)** - Reliable email delivery via API
- **bcryptjs** - Industry-standard password hashing
- **Helmet** - Security headers middleware
- **Express Rate Limit** - API request rate limiting
- **Express Validator** - Request validation and sanitization
- **json2csv** - CSV generation for reports
- **CORS** - Cross-Origin Resource Sharing

## 📸 Screenshots

<div align="center">

### 🏠 Welcome Page
<img src="./frontend/ss/Screenshot 2025-12-12 at 18.19.10.png" alt="Welcome Page" width="800"/>

*Modern AI-designed landing page with gradient animations*

---

### 🔐 Authentication Flow

<table>
  <tr>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.28.16.png" alt="Login Page" width="400"/></td>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.28.30.png" alt="Signup Page" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Login Page</b></td>
    <td align="center"><b>Signup Page</b></td>
  </tr>
  <tr>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.28.42.png" alt="OTP Verification" width="400"/></td>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.29.07.png" alt="Password Reset" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>OTP Verification</b></td>
    <td align="center"><b>Password Reset</b></td>
  </tr>
</table>

*Secure authentication with email OTP verification and password reset*

---

### 📊 Dashboard & Analytics

<table>
  <tr>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.29.15.png" alt="Dashboard" width="400"/></td>
    <td><img src="./frontend/ss/Screenshot 2025-12-12 at 18.29.53.png" alt="Analytics" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Main Dashboard</b></td>
    <td align="center"><b>Reports & Analytics</b></td>
  </tr>
</table>

*Real-time expense tracking with interactive charts and visual insights*

---

### 💰 Expense Management
<img src="./frontend/ss/Screenshot 2025-12-12 at 18.30.37.png" alt="Expense Management" width="800"/>

*Easy-to-use interface for adding, editing, and managing expenses*

</div>

> **✨ Features Showcase:** All screenshots display the AI-designed UI with glassmorphism effects, gradient themes (cyan/violet/fuchsia), and smooth animations.

---

## 📁 Project Structure

```
Expense-tracker-Hisab-Kitab/
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

# Email Configuration - SendGrid (Recommended for Production)
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
EMAIL_USER=your_verified_sender@example.com

# Client Configuration
CLIENT_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

**Note:** This application uses **SendGrid API** for sending emails (OTP verification, password reset, CSV reports). SendGrid works reliably on hosting platforms like Render where SMTP ports are blocked.

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

### Email Configuration (SendGrid)

**Why SendGrid?** Traditional SMTP (Gmail, Outlook) doesn't work on most hosting platforms like Render because they block SMTP ports (25, 465, 587) for security. SendGrid uses HTTP API (port 443) which works everywhere.

**Setup Steps:**

1. **Create a SendGrid account** at [sendgrid.com](https://sendgrid.com/) (Free tier: 100 emails/day)

2. **Verify your sender email**:
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your email (e.g., your@gmail.com)
   - Check your inbox and verify

3. **Create an API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access" or "Restricted Access" (Mail Send)
   - Copy the API key (starts with `SG.`)

4. **Add to your `.env` file**:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   EMAIL_USER=your_verified_sender@gmail.com
   ```

**Email Features:**
- ✅ OTP verification emails with modern HTML templates
- ✅ Password reset emails
- ✅ CSV expense reports via email
- ✅ Professional dark-themed email design
- ✅ Works on all hosting platforms

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

### Production Deployment Guide

📖 complete step-by-step deployment instructions.**

The deployment guide includes:
- ✅ MongoDB Atlas database setup
- ✅ Gmail OTP configuration
- ✅ Render backend deployment
- ✅ Render frontend deployment
- ✅ Environment variable configuration
- ✅ CORS setup
- ✅ Testing procedures
- ✅ Troubleshooting tips

### Quick Deployment Steps

**Prerequisites:**
- GitHub account
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- Gmail account (for OTP emails)

**Deployment Flow:**
1. Push code to GitHub
2. Create MongoDB Atlas cluster and get connection string
3. Configure Gmail App Password for OTP
4. Deploy backend to Render with environment variables
5. Deploy frontend to Render with API URL
6. Update CORS configuration
7. Test the application

**Environment Variables Needed:**

**Backend (Render):**
```env
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb+srv://your_username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_long_random_secret_key_minimum_32_characters
CLIENT_URL=https://your-frontend.onrender.com
SENDGRID_API_KEY=SG.your_sendgrid_api_key
EMAIL_USER=your_verified_sender@example.com
```

Frontend (Render):
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

📚 For detailed instructions with screenshots and troubleshooting, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

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

## 🎯 Roadmap & Future Enhancements

### 🚀 Planned Features
- [ ] **Budget Management** - Set monthly budgets and get alerts
- [ ] **Multi-Currency Support** - Track expenses in different currencies
- [ ] **Receipt Upload** - Attach receipt images to expenses
- [ ] **PDF Reports** - Generate beautiful PDF reports
- [ ] **Dark/Light Mode** - User preference theme toggle
- [ ] **Mobile App** - React Native version for iOS/Android
- [ ] **Data Export** - Export data in multiple formats (Excel, PDF)
- [ ] **Advanced Analytics** - Predictive spending insights with AI
- [ ] **Shared Expenses** - Family/team expense sharing
- [ ] **Bank Integration** - Automatic transaction import
- [ ] **Recurring Expenses** - Set up auto-recurring expense entries
- [ ] **Expense Categories** - Custom user-defined categories
- [ ] **Notifications** - Push notifications for budget alerts

### 🐛 Known Issues
- Emails may land in spam folder initially (until SendGrid domain authentication is set up)
- Free tier Render services may experience cold starts (10-15 second delay on first request)

## 📊 Project Stats

- **Total Lines of Code**: ~5,000+
- **Components**: 15+ React components
- **API Endpoints**: 20+ RESTful endpoints
- **Database Models**: 2 (User, Expense)
- **Authentication Methods**: JWT + OTP
- **Email Templates**: 3 professional HTML templates

## 🙏 Acknowledgments

- **UI/UX Design** - Crafted by AI for modern aesthetics
- **Icons** - [Lucide React](https://lucide.dev/)
- **Charts** - [Recharts](https://recharts.org/)
- **Email Service** - [SendGrid](https://sendgrid.com/)
- **Hosting** - [Render](https://render.com/)
- **Database** - [MongoDB Atlas](https://www.mongodb.com/atlas)

## 📞 Contact

**Amrit Sapkota**
- GitHub: [@amritsapkotadev](https://github.com/amritsapkotadev)
- Email: amritsapkota.dev@gmail.com
- Project Link: [https://github.com/amritsapkotadev/Expense-tracker-Hisab-Kitab](https://github.com/amritsapkotadev/Expense-tracker-Hisab-Kitab)

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by [Amrit Sapkota](https://github.com/amritsapkotadev)**

*Hisab Kitab - Take Control of Your Finances Today!*

</div>
