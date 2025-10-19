# Complete Render Deployment Guide for Hisab Kitab

This guide will walk you through deploying your full-stack Hisab Kitab application to Render (backend) and Netlify (frontend).

## Prerequisites

- Render account (https://render.com)
- Netlify account (https://netlify.com) 
- MongoDB Atlas account (https://mongodb.com/atlas)
- Gmail account for email service

## Step 1: Backend Deployment on Render

### 1.1 Prepare Backend for Production

Your backend is already well-configured for production with:
- Security middleware (Helmet, CORS, Rate Limiting)
- Environment variables
- Proper error handling
- Health check endpoint

### 1.2 Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

### 1.3 Set Up Environment Variables

You'll need these environment variables in Render:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-netlify-app.netlify.app
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PORT=10000
NODE_ENV=production
```

### 1.4 Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: hisab-kitab-backend
   - **Environment**: Node
   - **Region**: Choose closest to your users
   - **Branch**: main (or your preferred branch)
   - **Root Directory**: backend/
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Plan**: Free

5. Add environment variables in Render dashboard:
   - Go to your service → Environment
   - Add all the variables from step 1.3

6. Deploy!

## Step 2: Frontend Deployment on Netlify

### 2.1 Update API URL

Update your frontend environment variables to point to your Render backend:

```bash
# In frontend/.env.production
VITE_API_URL=https://your-render-backend.onrender.com/api
```

### 2.2 Deploy to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: frontend/
   - **Build command**: npm run build
   - **Publish directory**: dist/
   - **Node version**: 18

5. Add environment variables in Netlify:
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL=https://your-render-backend.onrender.com/api`

6. Deploy!

## Step 3: Email Configuration

### 3.1 Gmail App Password

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for your application
4. Use this password for `EMAIL_PASS` environment variable

## Step 4: Testing Your Deployment

### 4.1 Backend Health Check

```bash
curl https://your-render-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Expense Tracker API is running",
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

### 4.2 Frontend Testing

1. Open your Netlify URL
2. Test user registration/login
3. Test adding expenses
4. Test report generation and email functionality

## Step 5: Custom Domain (Optional)

### 5.1 Backend Custom Domain (Render)

1. Go to your Render service → Settings
2. Click "Add Custom Domain"
3. Follow DNS configuration instructions

### 5.2 Frontend Custom Domain (Netlify)

1. Go to your Netlify site → Domain settings
2. Click "Add custom domain"
3. Configure your DNS records

## Troubleshooting Common Issues

### Backend Won't Start
- Check MongoDB connection string
- Verify environment variables are set correctly
- Check Render logs for errors

### Frontend Can't Connect to Backend
- Verify CORS settings in backend
- Check API URL in frontend environment variables
- Ensure backend is running and healthy

### Email Not Working
- Verify Gmail app password is correct
- Check email environment variables
- Review Render logs for email errors

## Environment Variables Reference

### Backend (.env)
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=your-frontend-url
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=10000
NODE_ENV=production
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Support

If you encounter issues:
1. Check Render deployment logs
2. Check Netlify build logs
3. Verify all environment variables are set
4. Ensure MongoDB Atlas cluster is running

Your application should now be fully deployed and accessible to users!