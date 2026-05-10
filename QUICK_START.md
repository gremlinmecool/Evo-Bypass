# ⚡ Quick Start - EVO BYPASS

## 🚀 Run 24/7 in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Launcher
**Double-click:** `start-24-7.bat`

OR run manually:
```bash
# Install PM2
npm install -g pm2
npm install -g pm2-windows-startup
pm2-startup install

# Build and start
cd backend
npm run build
cd ..
pm2 start backend/dist/server.js --name evo-bypass
pm2 save
```

### Step 3: Open Website
Open `website/index.html` in your browser

**Done! Your app runs 24/7 even after PC restart!** ✅

---

## 📋 Useful Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs evo-bypass

# Restart
pm2 restart evo-bypass

# Stop
pm2 stop evo-bypass

# Monitor
pm2 monit
```

---

## 🌐 Deploy to Cloud (Free)

### Railway.app (Recommended)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render.com
1. Go to https://render.com
2. Connect GitHub
3. Deploy backend folder
4. Done!

---

## 🔧 Test API

```bash
# Test endpoint
curl http://localhost:4000/api/bypass/test

# Test bypass
curl -X POST http://localhost:4000/api/bypass/bypass ^
  -H "Content-Type: application/json" ^
  -d "{\"url\":\"https://rekonise.com/blox-fruits-script-587c8\"}"
```

---

## 📊 Features

✅ **50+ Services** - Linkvertise, Rekonise, Work.ink, etc.  
✅ **Caching** - 60x faster with 1-hour cache  
✅ **Auto-Retry** - 3 attempts with fallbacks  
✅ **Rate Limiting** - 30 requests/minute  
✅ **24/7 Ready** - Runs continuously  
✅ **Auto-Restart** - Restarts on crash  
✅ **Discord Bot** - Integrated bot support  

---

## 🎯 Access Points

- **Website**: `website/index.html`
- **API**: `http://localhost:4000`
- **Test**: `http://localhost:4000/api/bypass/test`
- **Stats**: `http://localhost:4000/api/bypass/stats`

---

## 🐛 Troubleshooting

**App not starting?**
```bash
pm2 logs evo-bypass
```

**Port already in use?**
```bash
# Kill process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**Need to update?**
```bash
git pull
cd backend
npm run build
cd ..
pm2 restart evo-bypass
```

---

## 📚 Full Documentation

- **24/7 Guide**: `LAUNCH_24_7_GUIDE.md`
- **Supported Services**: `SUPPORTED_SERVICES_COMPLETE.md`
- **Production Guide**: `PRODUCTION_LAUNCH_GUIDE.md`
- **Bot Setup**: `DISCORD_BOT_SETUP.md`

---

**You're ready to launch!** 🚀
