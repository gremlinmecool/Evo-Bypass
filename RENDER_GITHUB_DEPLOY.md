# 🚀 Deploy to Render + GitHub - Complete Guide

## ✅ What This Does

Deploy your EVO BYPASS platform to Render.com (free hosting) with automatic updates from GitHub.

**Flow:**
1. Push code to GitHub
2. Render automatically deploys
3. App runs 24/7 for FREE
4. Auto-updates on every push

---

## 📋 STEP 1: Push to GitHub (5 minutes)

### Create GitHub Repository

1. Go to https://github.com
2. Click **"New repository"**
3. Name: `evo-bypass`
4. Description: `Advanced bypass platform with Discord bot`
5. **Public** or **Private** (your choice)
6. Click **"Create repository"**

### Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - EVO BYPASS platform"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/evo-bypass.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

## 📋 STEP 2: Deploy Backend to Render (10 minutes)

### Create Render Account

1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your repositories

### Deploy Backend

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Select `evo-bypass` repository
   - Click **"Connect"**

3. **Configure Service:**
   ```
   Name: evo-bypass-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables:
   ```
   NODE_ENV = production
   PORT = 4000
   MONGO_URI = mongodb+srv://your-mongodb-uri (optional)
   CLIENT_ORIGIN = https://your-frontend-url.com
   DISCORD_TOKEN = your_discord_bot_token_here
   DISCORD_CLIENT_ID = 1503006516620427304
   DISCORD_CLIENT_SECRET = your_discord_client_secret
   DISCORD_REDIRECT_URI = https://your-backend-url.onrender.com/auth/callback
   DISCORD_PERMISSIONS = 8
   ```

5. Click **"Create Web Service"**

6. **Wait 5-10 minutes** for deployment

7. **Copy your backend URL:**
   - Example: `https://evo-bypass-backend.onrender.com`

**✅ Backend is now live!**

---

## 📋 STEP 3: Deploy Frontend to Render (5 minutes)

### Option A: Static Site (Recommended)

1. Click **"New +"** → **"Static Site"**

2. **Connect Repository:**
   - Select `evo-bypass` repository
   - Click **"Connect"**

3. **Configure Site:**
   ```
   Name: evo-bypass-frontend
   Branch: main
   Root Directory: website
   Build Command: (leave empty)
   Publish Directory: .
   ```

4. Click **"Create Static Site"**

5. **Wait 2-3 minutes** for deployment

6. **Copy your frontend URL:**
   - Example: `https://evo-bypass-frontend.onrender.com`

### Option B: Use Netlify/Vercel (Alternative)

**Netlify:**
1. Go to https://netlify.com
2. Drag and drop `website` folder
3. Done!

**Vercel:**
1. Go to https://vercel.com
2. Import GitHub repository
3. Set root directory to `website`
4. Deploy!

**✅ Frontend is now live!**

---

## 📋 STEP 4: Update Configuration (5 minutes)

### Update Backend Environment Variables

1. Go to Render dashboard
2. Click on `evo-bypass-backend`
3. Go to **"Environment"**
4. Update `CLIENT_ORIGIN`:
   ```
   CLIENT_ORIGIN = https://evo-bypass-frontend.onrender.com
   ```
5. Click **"Save Changes"**
6. Service will auto-redeploy

### Update Frontend API URL

1. Open `website/config.js` (or create it)

```javascript
// website/config.js
const API_URL = 'https://evo-bypass-backend.onrender.com';

// Export for use in other files
window.API_URL = API_URL;
```

2. Update `website/index.html` to use this URL:

```html
<!-- Add before closing </body> tag -->
<script src="config.js"></script>
<script>
  // Use window.API_URL for API calls
  const apiUrl = window.API_URL || 'http://localhost:4000';
</script>
```

3. Push changes:
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

**✅ Configuration updated!**

---

## 📋 STEP 5: Test Your Deployment (2 minutes)

### Test Backend

```bash
# Test health endpoint
curl https://evo-bypass-backend.onrender.com/health

# Test bypass endpoint
curl -X POST https://evo-bypass-backend.onrender.com/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d '{"url":"https://rekonise.com/blox-fruits-script-587c8"}'
```

### Test Frontend

1. Open: `https://evo-bypass-frontend.onrender.com`
2. Enter a link: `https://rekonise.com/blox-fruits-gcz0u`
3. Click "Bypass Link"
4. Should show bypassed destination ✅

### Test Discord Bot

1. Go to Discord
2. Type: `/bypass https://rekonise.com/blox-fruits-script-587c8`
3. Bot should respond with bypassed link ✅

**✅ Everything is working!**

---

## 🔄 How to Update Your App

### Method 1: Push to GitHub (Automatic)

```bash
# Make changes to your code

# Commit and push
git add .
git commit -m "Update feature"
git push origin main

# Render automatically detects changes and redeploys!
# Wait 5-10 minutes for deployment
```

### Method 2: Manual Deploy (Render Dashboard)

1. Go to Render dashboard
2. Click on your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait for deployment

**✅ Your app is updated!**

---

## 💰 Cost Breakdown

### Free Tier (Render)
- **Backend:** Free (750 hours/month)
- **Frontend:** Free (100GB bandwidth/month)
- **Database:** Free MongoDB Atlas (512MB)
- **Total:** $0/month ✅

### Limitations (Free Tier)
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month (enough for 24/7 if only 1 service)

### Paid Tier (Optional)
- **Backend:** $7/month (no sleep, faster)
- **Database:** $9/month (more storage)
- **Total:** $16/month

---

## 🐛 Troubleshooting

### Issue: Backend Not Starting

**Check Logs:**
1. Go to Render dashboard
2. Click on `evo-bypass-backend`
3. Click **"Logs"**
4. Look for errors

**Common Issues:**
- Missing environment variables
- Build command failed
- Port configuration wrong

**Solution:**
```bash
# Verify build command
npm install && npm run build

# Verify start command
npm start

# Check package.json scripts
```

### Issue: Frontend Can't Connect to Backend

**Check CORS:**
1. Verify `CLIENT_ORIGIN` in backend environment variables
2. Should match your frontend URL exactly
3. No trailing slash

**Update backend/src/server.ts:**
```typescript
app.use(
  cors({
    origin: [
      'https://evo-bypass-frontend.onrender.com',
      'http://localhost:3000'
    ],
    credentials: true
  })
);
```

### Issue: Discord Bot Offline

**Check Token:**
1. Verify `DISCORD_TOKEN` in environment variables
2. Check bot is invited to server
3. Check bot permissions

**View Logs:**
```bash
# In Render dashboard
# Click "Logs" and search for "discord"
```

### Issue: Bypass Not Working

**Check API:**
```bash
# Test directly
curl -X POST https://evo-bypass-backend.onrender.com/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d '{"url":"https://rekonise.com/test"}'
```

**Check Logs:**
- Look for errors in Render logs
- Check rate limiting
- Verify service is running

---

## 🚀 Production Optimizations

### 1. Add Custom Domain (Optional)

**Render:**
1. Go to service settings
2. Click **"Custom Domain"**
3. Add your domain
4. Update DNS records

**Cost:** Domain only ($1-12/year)

### 2. Add MongoDB Database

**MongoDB Atlas (Free):**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `MONGO_URI` environment variable

### 3. Keep Backend Awake (Free Tier)

**Use Cron Job:**
```bash
# Use cron-job.org or UptimeRobot
# Ping your backend every 10 minutes
# URL: https://evo-bypass-backend.onrender.com/health
```

### 4. Add SSL (Automatic)

Render provides free SSL automatically! ✅

---

## 📊 Monitoring

### Render Dashboard

1. **Metrics:**
   - CPU usage
   - Memory usage
   - Request count
   - Response times

2. **Logs:**
   - Real-time logs
   - Error tracking
   - Request logs

3. **Events:**
   - Deployment history
   - Build logs
   - Restart events

### External Monitoring (Optional)

**UptimeRobot (Free):**
- Monitor uptime
- Get alerts
- Track response times

**Sentry (Free):**
- Error tracking
- Performance monitoring
- User feedback

---

## 🎯 Complete Workflow

### Development → Production

```bash
# 1. Make changes locally
# Edit your code

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Add new feature"

# 4. Push to GitHub
git push origin main

# 5. Render auto-deploys
# Wait 5-10 minutes

# 6. Test production
# Visit your Render URL

# 7. Done! ✅
```

---

## 📋 Quick Reference

### GitHub Commands
```bash
# Push changes
git add .
git commit -m "Update"
git push origin main

# Check status
git status

# View history
git log --oneline
```

### Render URLs
```
Backend: https://evo-bypass-backend.onrender.com
Frontend: https://evo-bypass-frontend.onrender.com
API: https://evo-bypass-backend.onrender.com/api
Health: https://evo-bypass-backend.onrender.com/health
```

### Environment Variables (Backend)
```
NODE_ENV=production
PORT=4000
CLIENT_ORIGIN=https://evo-bypass-frontend.onrender.com
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=1503006516620427304
```

---

## 🎉 You're Live!

Your EVO BYPASS platform is now:
- ✅ Deployed to Render (free hosting)
- ✅ Connected to GitHub (auto-updates)
- ✅ Running 24/7 (with free tier limitations)
- ✅ Discord bot online
- ✅ Bypassing 50+ services
- ✅ Production-ready

**Total Cost: $0/month** 🎊

**Total Setup Time: ~20 minutes** ⚡

---

## 📞 Need Help?

### Render Issues
- Check Render dashboard logs
- Visit Render community forum
- Check Render status page

### GitHub Issues
- Verify repository is public/accessible
- Check GitHub Actions (if using)
- Verify webhook is working

### App Issues
- Check backend logs in Render
- Test API endpoints directly
- Verify environment variables

---

**Your bypass platform is now live and auto-updating! 🚀**

**Just push to GitHub and Render handles the rest!** 🎉
