# 🚀 Launch Guide - Run 24/7

## ✅ Pre-Launch Checklist

### 1. **Fix Any Errors**

```bash
# Install all dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Test if everything works
npm run dev:backend
```

### 2. **Test the System**

Open another terminal and test:

```bash
# Test API
curl http://localhost:4000/api/bypass/test

# Test bypass
curl -X POST http://localhost:4000/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://rekonise.com/blox-fruits-script-587c8\"}"
```

---

## 🌐 Option 1: Run 24/7 on Your PC (Windows)

### Method A: Using PM2 (Recommended)

**Step 1: Install PM2**
```bash
npm install -g pm2
npm install -g pm2-windows-startup
```

**Step 2: Configure PM2 for Windows Startup**
```bash
pm2-startup install
```

**Step 3: Start Your App**
```bash
# Build the backend
cd backend
npm run build
cd ..

# Start with PM2
pm2 start backend/dist/server.js --name evo-bypass

# Save PM2 configuration
pm2 save

# Check status
pm2 status
```

**Step 4: View Logs**
```bash
pm2 logs evo-bypass
```

**Step 5: Manage the App**
```bash
# Stop
pm2 stop evo-bypass

# Restart
pm2 restart evo-bypass

# Delete
pm2 delete evo-bypass
```

### Method B: Using Windows Task Scheduler

**Step 1: Create a batch file** (`start-evo-bypass.bat`):
```batch
@echo off
cd /d "C:\Users\HP\OneDrive\Desktop\vip bypass\backend"
npm run dev
```

**Step 2: Open Task Scheduler**
- Press `Win + R`, type `taskschd.msc`, press Enter

**Step 3: Create Task**
- Click "Create Basic Task"
- Name: "EVO BYPASS"
- Trigger: "When the computer starts"
- Action: "Start a program"
- Program: `C:\Users\HP\OneDrive\Desktop\vip bypass\start-evo-bypass.bat`
- Finish

**Step 4: Configure Task**
- Right-click task → Properties
- Check "Run whether user is logged on or not"
- Check "Run with highest privileges"
- OK

---

## ☁️ Option 2: Deploy to Cloud (24/7 Free/Cheap)

### A. Railway.app (Recommended - Free Tier)

**Step 1: Sign up**
- Go to https://railway.app
- Sign up with GitHub

**Step 2: Deploy**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**Step 3: Add Environment Variables**
- Go to Railway dashboard
- Click your project
- Go to "Variables"
- Add:
  ```
  NODE_ENV=production
  PORT=4000
  MONGO_URI=your_mongodb_uri
  DISCORD_TOKEN=your_token
  ```

**Step 4: Get URL**
- Railway will give you a URL like: `https://evo-bypass.up.railway.app`

### B. Render.com (Free Tier)

**Step 1: Sign up**
- Go to https://render.com
- Sign up with GitHub

**Step 2: Create Web Service**
- Click "New +"
- Select "Web Service"
- Connect your GitHub repo
- Configure:
  - Name: `evo-bypass`
  - Environment: `Node`
  - Build Command: `cd backend && npm install && npm run build`
  - Start Command: `cd backend && npm start`
  - Plan: Free

**Step 3: Add Environment Variables**
- Add same variables as Railway

### C. Heroku (Paid but Reliable)

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
```

**Step 2: Login and Create App**
```bash
heroku login
heroku create evo-bypass
```

**Step 3: Add Procfile**
Create `Procfile` in root:
```
web: cd backend && npm start
```

**Step 4: Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Step 5: Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set DISCORD_TOKEN=your_token
```

### D. Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Backend (Railway):**
- Follow Railway steps above

---

## 🔧 Option 3: VPS (Full Control)

### Recommended VPS Providers:
- **DigitalOcean** - $6/month
- **Linode** - $5/month
- **Vultr** - $6/month
- **Contabo** - $4/month

### Setup on VPS (Ubuntu):

**Step 1: Connect to VPS**
```bash
ssh root@your-server-ip
```

**Step 2: Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Step 3: Install PM2**
```bash
npm install -g pm2
```

**Step 4: Clone Your Project**
```bash
git clone your-repo-url
cd evo-bypass
npm install
cd backend
npm install
npm run build
```

**Step 5: Start with PM2**
```bash
pm2 start dist/server.js --name evo-bypass
pm2 startup
pm2 save
```

**Step 6: Install Nginx**
```bash
sudo apt install nginx
```

**Step 7: Configure Nginx**
Create `/etc/nginx/sites-available/evo-bypass`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /root/evo-bypass/website;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 8: Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/evo-bypass /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 9: Install SSL (Free)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 Monitoring & Maintenance

### 1. **Check if Running**
```bash
# PM2
pm2 status

# Check logs
pm2 logs evo-bypass

# Monitor
pm2 monit
```

### 2. **Auto-Restart on Crash**
PM2 automatically restarts your app if it crashes!

### 3. **Update Your App**
```bash
# Pull latest code
git pull

# Rebuild
cd backend
npm run build

# Restart
pm2 restart evo-bypass
```

### 4. **View Logs**
```bash
# PM2 logs
pm2 logs evo-bypass

# Or check log files
pm2 logs evo-bypass --lines 100
```

---

## 🔒 Security Checklist

- [ ] Change default ports
- [ ] Set strong passwords
- [ ] Enable firewall
- [ ] Use HTTPS (SSL)
- [ ] Set rate limiting
- [ ] Hide error messages in production
- [ ] Use environment variables
- [ ] Regular backups

---

## 🎯 Quick Start (Easiest Method)

### For Windows PC (24/7):

```bash
# 1. Install PM2
npm install -g pm2
npm install -g pm2-windows-startup

# 2. Setup startup
pm2-startup install

# 3. Build and start
cd backend
npm run build
cd ..
pm2 start backend/dist/server.js --name evo-bypass
pm2 save

# Done! Your app runs 24/7 even after restart
```

### For Cloud (Free):

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
railway init
railway up

# Done! Your app is online 24/7
```

---

## 📱 Access Your App

### Local (PC):
- Website: `http://localhost:8000` (serve website folder)
- API: `http://localhost:4000`

### Cloud:
- Website: `https://your-app.railway.app`
- API: `https://your-app.railway.app/api`

### VPS:
- Website: `https://your-domain.com`
- API: `https://your-domain.com/api`

---

## 🐛 Troubleshooting

### App Not Starting?
```bash
# Check logs
pm2 logs evo-bypass

# Check if port is in use
netstat -ano | findstr :4000

# Restart
pm2 restart evo-bypass
```

### Can't Access from Internet?
- Check firewall settings
- Open port 4000 in Windows Firewall
- Check router port forwarding

### High Memory Usage?
```bash
# Restart app
pm2 restart evo-bypass

# Clear cache
curl -X POST http://localhost:4000/api/bypass/clear-cache
```

---

## 🎉 You're Ready!

Choose your method:
1. **Windows PC 24/7** → Use PM2 (5 minutes setup)
2. **Free Cloud** → Use Railway (10 minutes setup)
3. **Professional** → Use VPS (30 minutes setup)

**Recommended for beginners:** Railway.app (Free, Easy, 24/7)

---

## 📞 Need Help?

If you encounter any issues:
1. Check logs: `pm2 logs evo-bypass`
2. Restart: `pm2 restart evo-bypass`
3. Check if backend is running: `curl http://localhost:4000/api/bypass/test`

**Your bypass system is now ready to run 24/7!** 🚀
