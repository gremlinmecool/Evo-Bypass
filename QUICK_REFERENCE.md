# ⚡ Quick Reference - EVO BYPASS

## 🚀 Deploy to Render + GitHub (15 minutes)

### 1. Push to GitHub (5 min)
```bash
# Run the script
deploy-to-github.bat

# OR manually:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/evo-bypass.git
git push -u origin main
```

### 2. Deploy Backend (5 min)
1. Go to https://render.com
2. Sign in with GitHub
3. New + → Web Service
4. Select `evo-bypass` repo
5. Configure:
   - Name: `evo-bypass-backend`
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
6. Add environment variables (see below)
7. Create Web Service

### 3. Deploy Frontend (3 min)
1. New + → Static Site
2. Select `evo-bypass` repo
3. Configure:
   - Name: `evo-bypass-frontend`
   - Root Directory: `website`
   - Publish: `.`
4. Create Static Site

### 4. Update Config (2 min)
1. Copy backend URL from Render
2. Update `website/config.js`:
   ```javascript
   const API_URL = 'https://YOUR-BACKEND-URL.onrender.com';
   ```
3. Push changes:
   ```bash
   git add .
   git commit -m "Update API URL"
   git push origin main
   ```

---

## 🔑 Environment Variables (Backend)

```
NODE_ENV = production
PORT = 4000
CLIENT_ORIGIN = https://YOUR-FRONTEND-URL.onrender.com
DISCORD_TOKEN = your_discord_bot_token_here
DISCORD_CLIENT_ID = 1503006516620427304
DISCORD_CLIENT_SECRET = your_discord_client_secret
DISCORD_PERMISSIONS = 8
```

---

## 🔄 Update Your App

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render auto-deploys in 5-10 minutes! 🚀
```

---

## 🧪 Test Your Deployment

### Backend
```bash
curl https://YOUR-BACKEND-URL.onrender.com/health
```

### Bypass API
```bash
curl -X POST https://YOUR-BACKEND-URL.onrender.com/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d '{"url":"https://rekonise.com/blox-fruits-script-587c8"}'
```

### Frontend
Open: `https://YOUR-FRONTEND-URL.onrender.com`

### Discord Bot
Type in Discord: `/bypass https://rekonise.com/blox-fruits-gcz0u`

---

## 📊 Your URLs

After deployment, save these:

```
Backend:  https://evo-bypass-backend.onrender.com
Frontend: https://evo-bypass-frontend.onrender.com
API:      https://evo-bypass-backend.onrender.com/api
Health:   https://evo-bypass-backend.onrender.com/health
```

---

## 🐛 Quick Troubleshooting

### Backend not starting?
- Check Render logs
- Verify environment variables
- Check build command

### Frontend can't connect?
- Update `CLIENT_ORIGIN` in backend
- Update `API_URL` in `website/config.js`
- Check CORS settings

### Discord bot offline?
- Verify `DISCORD_TOKEN`
- Check Render logs
- Restart service

### Bypass not working?
- Check API endpoint
- View Render logs
- Test with curl

---

## 📁 Project Structure

```
evo-bypass/
├── backend/              # Backend API + Bot
│   ├── src/
│   │   ├── bot/         # Discord bot
│   │   ├── services/    # Bypass logic
│   │   └── server.ts    # Express server
│   └── package.json
├── website/             # Frontend
│   ├── index.html
│   ├── config.js        # API URL config
│   └── styles.css
└── README.md
```

---

## 🎯 Common Commands

### Git
```bash
git status              # Check status
git add .               # Add all files
git commit -m "msg"     # Commit
git push origin main    # Push to GitHub
git pull origin main    # Pull from GitHub
git log --oneline       # View history
```

### NPM
```bash
npm install             # Install dependencies
npm run dev             # Development mode
npm run build           # Build for production
npm start               # Start production
```

### Validation
```bash
node validate-setup.js  # Validate setup
```

---

## 💰 Cost

**Free Tier (Render):**
- Backend: Free (750 hours/month)
- Frontend: Free (100GB bandwidth)
- **Total: $0/month** ✅

**Limitations:**
- Backend sleeps after 15 min inactivity
- First request after sleep: 30-60 seconds

**Paid Tier:**
- Backend: $7/month (no sleep)
- **Total: $7/month**

---

## 📚 Full Documentation

| File | Purpose |
|------|---------|
| `RENDER_GITHUB_DEPLOY.md` | Complete Render guide |
| `GITHUB_SETUP.md` | GitHub setup guide |
| `QUICK_DEPLOY.md` | 5-minute deploy |
| `README.md` | Project overview |

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] Environment variables added
- [ ] API URL updated in config.js
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Discord bot online
- [ ] Bypass working

---

## 🎉 You're Live!

Your platform is now:
- ✅ Running 24/7 on Render
- ✅ Auto-updating from GitHub
- ✅ Bypassing 50+ services
- ✅ Discord bot online
- ✅ Production-ready

**Total cost: $0/month** 🎊
**Setup time: 15 minutes** ⚡

---

**Need help? Read the full guides!** 📖
