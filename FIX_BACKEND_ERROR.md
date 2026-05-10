# 🔧 Fix "Error: Make sure the backend is running"

## 🎯 What This Error Means

The website is trying to connect to the backend API, but the backend server is not running.

---

## ✅ Solution: Start the Backend

### Option 1: Quick Start (Recommended)

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Add your Discord token to backend/.env
cd backend
cp .env.example .env
# Edit .env and add your token (see IMPORTANT_SECURITY_NOTE.md)

# 3. Start the backend
cd ..
npm run dev
```

The backend will start on: `http://localhost:4000`

---

### Option 2: Start Backend Only

```bash
# Go to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

---

### Option 3: Build and Start Production

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install

# Build
npm run build

# Start production server
npm start
```

---

## 🧪 Test if Backend is Running

### Test 1: Health Check

Open in browser or use curl:
```bash
curl http://localhost:4000/health
```

Should return:
```json
{"status":"ok"}
```

### Test 2: Bypass API

```bash
curl -X POST http://localhost:4000/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d '{"url":"https://rekonise.com/blox-fruits-script-587c8"}'
```

Should return bypass result.

---

## 🐛 Still Not Working?

### Issue 1: Port Already in Use

**Error:** `Port 4000 is already in use`

**Solution:**
```bash
# Windows: Find and kill process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=4001
```

### Issue 2: Discord Token Missing

**Error:** `Discord token not found`

**Solution:**
1. Check `backend/.env` file exists
2. Token should already be there
3. If not, copy from `.env.example` and add your token

### Issue 3: Dependencies Not Installed

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### Issue 4: TypeScript Errors

**Error:** `Cannot find type definition for 'node'`

**Solution:**
```bash
cd backend
npm install @types/node --save-dev
```

---

## 📊 Check Backend Status

### View Logs

```bash
# If using PM2
pm2 logs evo-bypass

# If running in terminal
# Logs will show in the terminal where you ran npm run dev
```

### Check Process

```bash
# If using PM2
pm2 status

# If running in terminal
# You'll see output like:
# Backend listening on http://localhost:4000
# ✅ Bot logged in as YourBot#1234
```

---

## 🚀 For Production (Render)

If you deployed to Render and getting this error:

### 1. Check Backend URL

Make sure `website/config.js` has the correct backend URL:
```javascript
const API_URL = 'https://evo-bypass-backend.onrender.com';
```

### 2. Check Render Status

1. Go to Render dashboard
2. Click on `evo-bypass-backend`
3. Check if service is "Live"
4. View logs for errors

### 3. Check Environment Variables

1. Go to Render dashboard
2. Click on `evo-bypass-backend`
3. Go to "Environment" tab
4. Verify `DISCORD_TOKEN` is set

### 4. Check CORS

Make sure `CLIENT_ORIGIN` in Render matches your frontend URL:
```
CLIENT_ORIGIN=https://evo-bypass-frontend.onrender.com
```

---

## ✅ Complete Setup Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `backend/.env` file created
- [ ] Discord token added to `.env`
- [ ] Backend started (`npm run dev`)
- [ ] Health check passes (`curl http://localhost:4000/health`)
- [ ] Website can connect to backend

---

## 🎯 Quick Fix Commands

```bash
# Complete setup from scratch
cd backend
npm install
cp .env.example .env
# Edit .env and add your Discord token
npm run dev

# In another terminal, open website
cd ..
# Open website/index.html in browser
```

---

## 📞 Still Having Issues?

### Check These:

1. **Backend is running:**
   - Terminal shows "Backend listening on http://localhost:4000"
   - Health check returns {"status":"ok"}

2. **Discord bot is online:**
   - Terminal shows "✅ Bot logged in as..."
   - Bot appears online in Discord

3. **Website is using correct URL:**
   - Check `website/config.js`
   - Should be `http://localhost:4000` for local
   - Should be your Render URL for production

4. **No firewall blocking:**
   - Allow Node.js through firewall
   - Check antivirus isn't blocking

---

## 🎉 Success!

When everything is working, you should see:

**Terminal:**
```
Backend listening on http://localhost:4000
✅ Bot logged in as YourBot#1234
🔧 API Configuration loaded: { API_URL: 'http://localhost:4000', ... }
```

**Website:**
- No errors
- Can enter links and bypass them
- Results show up correctly

---

**Your backend is now running! 🚀**
