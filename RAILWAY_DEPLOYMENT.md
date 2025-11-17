# Deploy to Railway - Complete Guide

This guide will help you deploy your MSDC Beauty Center website to Railway in about 15 minutes.

## What You'll Deploy

- ✅ React Frontend (your website with the logo)
- ✅ Express Backend (API server)
- ✅ MongoDB Database (contact form data)
- ✅ Everything in one Railway project

## Prerequisites

1. **Railway Account** - Sign up at https://railway.app (free tier available)
2. **MongoDB Atlas Account** - Sign up at https://www.mongodb.com/cloud/atlas (free tier)
3. **GitHub Account** (optional but recommended) - For automatic deployments

## Step 1: Setup MongoDB Atlas (5 minutes)

### Why MongoDB Atlas?
Railway doesn't provide MongoDB directly, so we'll use MongoDB Atlas (it's free and reliable).

### Instructions:

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google or email

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select a cloud provider and region (closest to your users)
   - Click "Create Cluster"

3. **Create Database User**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `beautycenter`
   - Password: Click "Autogenerate Secure Password" (copy it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist All IPs** (for Railway access)
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Copy the connection string (looks like):
     ```
     mongodb+srv://beautycenter:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace** `<password>` with the password you copied earlier
   - **Add** database name at the end: `/beauty_center`
   - Final format:
     ```
     mongodb+srv://beautycenter:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/beauty_center?retryWrites=true&w=majority
     ```

✅ **Save this connection string** - you'll need it in Step 3!

## Step 2: Deploy to Railway (5 minutes)

### Option A: Deploy from GitHub (Recommended)

1. **Push Code to GitHub**
   ```bash
   # Initialize git (if not already done)
   git init

   # Add all files
   git add .

   # Commit
   git commit -m "Initial commit - MSDC Beauty Center"

   # Create repository on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/beauty-center.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Railway will start building automatically

### Option B: Deploy with Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize and Deploy**
   ```bash
   # In your project directory
   railway init
   railway up
   ```

## Step 3: Configure Environment Variables (3 minutes)

After deployment starts, you need to add environment variables:

1. **Go to Railway Project**
   - Click on your deployed service
   - Click "Variables" tab

2. **Add These Variables**

   Click "New Variable" for each:

   | Variable Name | Value | Notes |
   |---------------|-------|-------|
   | `NODE_ENV` | `production` | Tells app it's in production |
   | `PORT` | `5000` | Server port (Railway auto-assigns too) |
   | `MONGODB_URI` | `mongodb+srv://beautycenter:...` | Your MongoDB connection string from Step 1 |
   | `FRONTEND_URL` | `https://your-app.railway.app` | Will get this after deployment |

   **Important**: After deployment completes, you'll get a Railway URL like `https://beauty-center-production.railway.app`. Update `FRONTEND_URL` with this URL.

3. **Click "Deploy"** to restart with new variables

## Step 4: Update CORS Settings (2 minutes)

After you get your Railway URL, update the CORS configuration:

1. **Edit** `server/middleware/cors.js` locally:

```javascript
export const corsOptions = {
  // Allow requests from the production URL
  origin: process.env.FRONTEND_URL || 'https://your-app.railway.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
};
```

2. **Commit and push** (if using GitHub):
   ```bash
   git add server/middleware/cors.js
   git commit -m "Update CORS for production"
   git push
   ```

Railway will automatically redeploy!

## Step 5: Verify Deployment (2 minutes)

1. **Check Deployment Logs**
   - In Railway dashboard, click "Deployments"
   - Click on the latest deployment
   - Check logs for:
     ```
     ✅ MongoDB connected successfully
     🚀 Server is running
     ```

2. **Visit Your Website**
   - Click "Settings" → "Generate Domain"
   - Railway will give you a URL like: `https://beauty-center-production.railway.app`
   - Open it in your browser!

3. **Test Everything**
   - ✅ Check your MSDC logo appears
   - ✅ Scroll through services
   - ✅ Fill out contact form
   - ✅ Submit and verify success message
   - ✅ Check MongoDB Atlas to see the saved contact

## Troubleshooting

### Build Fails

**Problem**: "Build failed" or "Command not found"

**Solution**:
1. Check `package.json` has all dependencies
2. Make sure `build` script exists
3. Check Railway logs for specific error

### MongoDB Connection Error

**Problem**: "Cannot connect to MongoDB"

**Solution**:
1. Verify `MONGODB_URI` is correct in Railway variables
2. Check MongoDB Atlas Network Access allows `0.0.0.0/0`
3. Verify database user password is correct

### Website Shows But Contact Form Doesn't Work

**Problem**: Form submits but shows error

**Solution**:
1. Check `FRONTEND_URL` variable is set correctly
2. Verify CORS settings allow your Railway domain
3. Check Railway deployment logs for errors

### 404 on Page Refresh

**Problem**: Page works initially but 404 on refresh

**Solution**: Already fixed! The server serves React for all routes in production.

## Custom Domain (Optional)

Want to use your own domain like `beautycenter.com`?

1. **In Railway**:
   - Go to Settings → Domains
   - Click "Custom Domain"
   - Enter your domain

2. **In Your Domain Registrar**:
   - Add CNAME record pointing to Railway's domain
   - Wait for DNS propagation (5-30 minutes)

3. **Update Environment Variables**:
   - Change `FRONTEND_URL` to your custom domain

## Costs

| Service | Free Tier | Notes |
|---------|-----------|-------|
| **Railway** | $5 credit/month | Usually enough for small sites |
| **MongoDB Atlas** | 512MB storage | Perfect for contact forms |
| **Total** | **FREE** for most use cases | |

**Pro Tip**: Railway charges based on usage. The free $5/month credit is typically enough for a website like this with moderate traffic.

## Automatic Deployments

If you deployed from GitHub:
- ✅ Every `git push` to `main` branch auto-deploys
- ✅ Railway rebuilds and redeploys automatically
- ✅ Zero downtime deployments

## Monitoring

**Check Your App Health**:
1. Visit: `https://your-app.railway.app/api/health`
2. Should return:
   ```json
   {
     "success": true,
     "message": "Beauty Center API is running",
     "timestamp": "2025-11-17T..."
   }
   ```

**View Logs**:
- Railway Dashboard → Deployments → View Logs
- See real-time server activity

## Environment Variables Reference

Here's what each variable does:

```bash
# Required
NODE_ENV=production              # Enables production optimizations
MONGODB_URI=mongodb+srv://...    # Database connection
PORT=5000                        # Server port

# Recommended
FRONTEND_URL=https://your-app.railway.app  # For CORS
```

## Post-Deployment Checklist

- [ ] MongoDB connected successfully
- [ ] Website loads with logo
- [ ] All sections visible (Hero, Services, Contact)
- [ ] Contact form submits successfully
- [ ] Data saves to MongoDB Atlas
- [ ] Mobile responsive (test on phone)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (Railway provides free)

## Updating Your Site

### Quick Updates:

```bash
# Make changes locally
# Test with: npm run start:all

# Commit and push
git add .
git commit -m "Update services"
git push

# Railway auto-deploys in ~2 minutes
```

### Environment Variable Updates:

1. Go to Railway Dashboard
2. Click Variables
3. Update value
4. Click Deploy to restart

## Railway Dashboard Features

**Useful Tabs**:
- **Deployments**: See deployment history
- **Logs**: Real-time server logs
- **Metrics**: CPU, Memory, Network usage
- **Variables**: Environment settings
- **Settings**: Domain, restart, delete

## Support

### Railway Issues:
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

### MongoDB Issues:
- Docs: https://www.mongodb.com/docs/atlas/
- Support: https://www.mongodb.com/support

### Your Project Issues:
- Check deployment logs first
- Verify environment variables
- Test health endpoint: `/api/health`

## Next Steps

Once deployed:

1. **Share Your Site**:
   - Your site is live at: `https://your-app.railway.app`
   - Share with clients and customers!

2. **Monitor Usage**:
   - Railway Dashboard → Metrics
   - MongoDB Atlas → Metrics

3. **Add Features**:
   - Admin panel to view contacts
   - Email notifications
   - Booking system
   - More services

## Summary

You now have:
- ✅ Full-stack app on Railway
- ✅ MongoDB database on Atlas
- ✅ Free SSL certificate
- ✅ Auto-deployments from GitHub
- ✅ Professional production setup

**Your site is LIVE!** 🎉

Visit it at your Railway URL and start getting contact form submissions!

---

**Questions?** Check the logs first, then consult the troubleshooting section above.
