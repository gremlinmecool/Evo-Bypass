# 🚀 GitLab CI/CD Automated Deployment Guide

## ✅ What This Does

Automatically deploys your app to a server whenever you push code to GitLab. No PC needed!

**Flow:**
1. Push code to GitLab
2. GitLab builds your app
3. GitLab deploys to your server
4. App runs 24/7 on server

---

## 🎯 Prerequisites

### 1. **Get a Server** (Choose One)

#### Option A: DigitalOcean ($6/month)
- Go to https://digitalocean.com
- Create Droplet
- Choose: Ubuntu 22.04, Basic Plan ($6/month)
- Note the IP address

#### Option B: Linode ($5/month)
- Go to https://linode.com
- Create Linode
- Choose: Ubuntu 22.04, Nanode 1GB ($5/month)

#### Option C: Vultr ($6/month)
- Go to https://vultr.com
- Deploy Server
- Choose: Ubuntu 22.04, Regular Performance ($6/month)

#### Option D: Contabo ($4/month - Cheapest)
- Go to https://contabo.com
- VPS S SSD ($4/month)

### 2. **Setup GitLab Repository**
- Go to https://gitlab.com
- Create new project
- Push your code:
```bash
git init
git remote add origin https://gitlab.com/your-username/evo-bypass.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 🔧 Server Setup (One-Time)

### Step 1: Connect to Your Server

```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Step 3: Install PM2

```bash
npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
# Run the command it shows you
```

### Step 4: Create App Directory

```bash
mkdir -p ~/evo-bypass/backend
mkdir -p ~/evo-bypass/website
```

### Step 5: Setup Nginx (Web Server)

```bash
# Install Nginx
apt install -y nginx

# Create config
nano /etc/nginx/sites-available/evo-bypass
```

Paste this:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Change this

    # Frontend
    location / {
        root /root/evo-bypass/website;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/evo-bypass /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

### Step 7: Install SSL (Free HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal
certbot renew --dry-run
```

### Step 8: Create .env File

```bash
nano ~/evo-bypass/backend/.env
```

Paste:
```env
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb://localhost:27017/evo-bypass
CLIENT_ORIGIN=https://your-domain.com
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=1503006516620427304
DISCORD_CLIENT_SECRET=your_secret
DISCORD_REDIRECT_URI=https://your-domain.com/auth/callback
DISCORD_PERMISSIONS=8
```

Save: `Ctrl+X`, `Y`, `Enter`

---

## 🔑 GitLab CI/CD Setup

### Step 1: Generate SSH Key on Server

```bash
# On your server
ssh-keygen -t rsa -b 4096 -C "gitlab-ci"
# Press Enter 3 times (no passphrase)

# Show private key
cat ~/.ssh/id_rsa
# Copy this entire output
```

### Step 2: Add Public Key to Authorized Keys

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Step 3: Configure GitLab Variables

Go to GitLab:
1. Your Project → Settings → CI/CD
2. Expand "Variables"
3. Add these variables:

| Key | Value | Protected | Masked |
|-----|-------|-----------|--------|
| `SSH_PRIVATE_KEY` | (paste private key from step 1) | ✅ | ✅ |
| `SERVER_IP` | Your server IP (e.g., 123.45.67.89) | ✅ | ❌ |
| `SERVER_USER` | root | ✅ | ❌ |

### Step 4: Enable GitLab Runner

1. Go to Settings → CI/CD → Runners
2. Enable "Shared Runners" or setup your own runner

---

## 🚀 Deploy Your App

### Method 1: Automatic (on every push)

```bash
# Just push to GitLab
git add .
git commit -m "Deploy to production"
git push origin main
```

GitLab will automatically:
1. Build your app
2. Run tests
3. Deploy to server
4. Restart PM2

### Method 2: Manual Deploy

1. Go to GitLab → CI/CD → Pipelines
2. Click "Run Pipeline"
3. Click "Deploy" button when ready

---

## 📊 Monitor Your App

### Check GitLab Pipeline

1. Go to CI/CD → Pipelines
2. See build/deploy status
3. View logs

### Check Server Status

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# Check PM2 status
pm2 status

# View logs
pm2 logs evo-bypass

# Monitor
pm2 monit
```

### Check Website

Visit: `https://your-domain.com`

### Check API

```bash
curl https://your-domain.com/api/bypass/test
```

---

## 🔄 Update Your App

### Option 1: Push to GitLab (Automatic)

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# GitLab automatically deploys!
```

### Option 2: Manual Deploy

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# Pull latest code
cd ~/evo-bypass
git pull

# Rebuild
cd backend
npm install
npm run build

# Restart
pm2 restart evo-bypass
```

---

## 🐛 Troubleshooting

### Pipeline Fails?

**Check GitLab CI/CD logs:**
1. Go to CI/CD → Pipelines
2. Click failed pipeline
3. View error logs

**Common issues:**
- SSH key not configured correctly
- Server IP wrong
- Server not accessible

### App Not Running?

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# Check PM2
pm2 status

# View logs
pm2 logs evo-bypass --lines 100

# Restart
pm2 restart evo-bypass
```

### Can't Access Website?

```bash
# Check Nginx
systemctl status nginx

# Check Nginx logs
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### SSL Issues?

```bash
# Renew certificate
certbot renew

# Check certificate
certbot certificates
```

---

## 💰 Cost Breakdown

### Cheapest Setup:
- **Server**: Contabo VPS ($4/month)
- **Domain**: Namecheap ($1/year)
- **SSL**: Free (Let's Encrypt)
- **GitLab**: Free
- **Total**: ~$4.10/month

### Recommended Setup:
- **Server**: DigitalOcean ($6/month)
- **Domain**: Namecheap ($12/year)
- **SSL**: Free
- **GitLab**: Free
- **Total**: ~$7/month

---

## 🎯 Complete Workflow

1. **Write code** on your PC
2. **Push to GitLab**: `git push origin main`
3. **GitLab builds** your app automatically
4. **GitLab deploys** to your server
5. **PM2 runs** your app 24/7
6. **Users access** via your domain

**No PC needed after deployment!** 🎉

---

## 📋 Quick Commands Reference

### Local (Your PC)
```bash
# Push changes
git add .
git commit -m "Update"
git push origin main
```

### Server
```bash
# Connect
ssh root@YOUR_SERVER_IP

# Check status
pm2 status

# View logs
pm2 logs evo-bypass

# Restart
pm2 restart evo-bypass

# Monitor
pm2 monit
```

### GitLab
- View pipelines: CI/CD → Pipelines
- Manual deploy: Click "Run Pipeline"
- View logs: Click pipeline → View jobs

---

## 🎉 You're Done!

Your app now:
✅ Deploys automatically on git push  
✅ Runs 24/7 on server  
✅ No PC needed  
✅ Auto-restarts on crash  
✅ Has HTTPS (SSL)  
✅ Professional setup  

**Just push code and GitLab handles everything!** 🚀

---

## 📞 Need Help?

**Server Issues:**
```bash
ssh root@YOUR_SERVER_IP
pm2 logs evo-bypass
```

**GitLab Issues:**
- Check CI/CD → Pipelines → Logs

**Domain Issues:**
- Check DNS settings
- Wait 24-48 hours for DNS propagation

**Your bypass platform is now fully automated!** 🎊
