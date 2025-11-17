# Railway Deployment Checklist

Quick checklist to deploy your MSDC Beauty Center to Railway.

## Before You Start

- [ ] Have a Railway account (https://railway.app)
- [ ] Have a MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- [ ] Have your code ready to deploy

## Step-by-Step Deployment

### 1. MongoDB Atlas Setup (5 min)

- [ ] Create MongoDB Atlas account
- [ ] Create free M0 cluster
- [ ] Create database user (username: `beautycenter`)
- [ ] Save the auto-generated password
- [ ] Add IP whitelist `0.0.0.0/0` (Network Access)
- [ ] Get connection string
- [ ] Replace `<password>` with your password
- [ ] Add `/beauty_center` database name
- [ ] Final format: `mongodb+srv://beautycenter:PASSWORD@cluster.mongodb.net/beauty_center?retryWrites=true&w=majority`

### 2. Push to GitHub (3 min)

```bash
# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for Railway"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub
- [ ] Repository is public or Railway has access

### 3. Deploy to Railway (2 min)

- [ ] Go to https://railway.app/new
- [ ] Click "Deploy from GitHub repo"
- [ ] Select your repository
- [ ] Wait for initial build to start

### 4. Configure Environment Variables (3 min)

In Railway Dashboard → Variables tab, add:

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `MONGODB_URI` = `your-mongodb-connection-string`
- [ ] Click "Deploy" to restart

### 5. Get Your URL (1 min)

- [ ] Go to Settings → Domains
- [ ] Click "Generate Domain"
- [ ] Copy your Railway URL (e.g., `https://beauty-center-production.railway.app`)

### 6. Update Frontend URL (2 min)

- [ ] Go back to Variables tab
- [ ] Add `FRONTEND_URL` = `your-railway-url`
- [ ] Click "Deploy" to restart

### 7. Verify Deployment (3 min)

- [ ] Visit your Railway URL
- [ ] Check MSDC logo appears
- [ ] Scroll through all sections
- [ ] Test contact form
- [ ] Verify form submission works
- [ ] Check MongoDB Atlas → Database → Collections
- [ ] Confirm contact saved in database

### 8. Test Health Endpoint (1 min)

- [ ] Visit: `https://your-app.railway.app/api/health`
- [ ] Should show JSON: `{"success": true, "message": "Beauty Center API is running"}`

## Environment Variables Summary

Copy these to Railway Variables tab:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://beautycenter:YOUR_PASSWORD@cluster.mongodb.net/beauty_center?retryWrites=true&w=majority
FRONTEND_URL=https://your-app-name.railway.app
```

## Post-Deployment

- [ ] Website is live and accessible
- [ ] Contact form saves to database
- [ ] All sections load correctly
- [ ] Mobile responsive works
- [ ] SSL certificate active (automatic on Railway)

## Troubleshooting

### Build Fails
- Check Railway logs (Deployments → Latest → View Logs)
- Verify all dependencies in `package.json`

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access
- Confirm database user password

### Contact Form Not Working
- Verify `FRONTEND_URL` matches your Railway URL
- Check CORS settings
- View Railway logs for errors

## Next Steps

✅ **Your site is now LIVE!**

Share your URL: `https://your-app-name.railway.app`

### Optional Enhancements:
- [ ] Add custom domain
- [ ] Setup email notifications
- [ ] Add Google Analytics
- [ ] Enable Railway metrics monitoring

## Files Created for Deployment

- `railway.json` - Railway configuration
- `nixpacks.toml` - Build configuration
- `.env.production.example` - Production env template
- `RAILWAY_DEPLOYMENT.md` - Full deployment guide
- `DEPLOYMENT_CHECKLIST.md` - This file

## Quick Redeploy

After making changes:

```bash
git add .
git commit -m "Your update message"
git push
```

Railway auto-deploys in ~2 minutes!

## Support

- **Railway Docs**: https://docs.railway.app
- **MongoDB Docs**: https://www.mongodb.com/docs/atlas
- **Full Guide**: See `RAILWAY_DEPLOYMENT.md`

---

**Total Time**: ~20 minutes
**Cost**: FREE (using free tiers)
