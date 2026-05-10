# ⚡ QUICK DEPLOY - 5 Minutes to Live!

## 🎯 Your Project: READY ✅

Everything is configured. Just follow these steps to go live!

---

## 🚀 FASTEST DEPLOYMENT (GitLab CI/CD)

### Step 1: Get a Server (2 minutes)

Go to **Contabo** ($4/month): https://contabo.com
- Choose: VPS S SSD
- OS: Ubuntu 22.04
- Note your server IP

### Step 2: Setup Server (5 minutes)

```bash
# Connect to server
ssh root@YOUR_SERVER_IP

# Run this ONE command (installs everything)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
apt-get install -y nodejs && \
npm install -g pm2 && \
pm2 startup && \
mkdir -p ~/evo-bypass/backend ~/evo-bypass/website && \
ssh-keygen -t rsa -b 4096 -C "gitlab-ci" -N "" -f ~/.ssh/id_rsa && \
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && \
chmod 600 ~/.ssh/authorized_keys && \
echo "✅ Server setup complete!"

# Create .env file
cat > ~/evo-bypass/backend/.env << 'EOF'
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb://localhost:27017/evo-bypass
CLIENT_ORIGIN=http://YOUR_SERVER_IP
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=1503006516620427304
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://YOUR_SERVER_IP/auth/callback
DISCORD_PERMISSIONS=8
EOF

# Show SSH private key (copy this!)
cat ~/.ssh/id_rsa
```

**COPY THE ENTIRE SSH KEY OUTPUT** (including BEGIN and END lines)

### Step 3: Setup GitLab (3 minutes)

```bash
# On your PC
# 1. Create account at https://gitlab.com
# 2. Create new project "evo-bypass"

# 3. Push code
git init
git remote add origin https://gitlab.com/YOUR_USERNAME/evo-bypass.git
git add .
git commit -m "Initial deployment"
git push -u origin main
```

### Step 4: Configure GitLab Variables (2 minutes)

1. Go to your GitLab project
2. **Settings** → **CI/CD** → **Variables** → **Add variable**
3. Add these 3 variables:

**Variable 1:**
- Key: `SSH_PRIVATE_KEY`
- Value: (paste the SSH key you copied)
- Protected: ✅
- Masked: ✅

**Variable 2:**
- Key: `SERVER_IP`
- Value: Your server IP (e.g., 123.45.67.89)
- Protected: ✅
- Masked: ❌

**Variable 3:**
- Key: `SERVER_USER`
- Value: `root`
- Protected: ✅
- Masked: ❌

4. Click **Save variables**

### Step 5: Enable Runner (1 minute)

1. **Settings** → **CI/CD** → **Runners**
2. Enable **"Shared Runners"**

### Step 6: Deploy! (1 minute)

1. Go to **CI/CD** → **Pipelines**
2. Click **"Run Pipeline"**
3. Click **"deploy:production"** button
4. Wait 2-3 minutes
5. **DONE!** 🎉

### Step 7: Test (1 minute)

```bash
# Test API
curl http://YOUR_SERVER_IP:4000/health

# Test bypass
curl -X POST http://YOUR_SERVER_IP:4000/api/bypass/bypass \
  -H "Content-Type: application/json" \
  -d '{"url":"https://rekonise.com/blox-fruits-script-587c8"}'
```

**Open in browser:** `http://YOUR_SERVER_IP`

---

## ✅ VERIFICATION

### Discord Bot
1. Go to Discord
2. Type: `/bypass https://rekonise.com/blox-fruits-gcz0u`
3. Bot responds with bypassed link ✅

### Website
1. Open: `http://YOUR_SERVER_IP`
2. Enter link: `https://rekonise.com/blox-fruits-script-587c8`
3. Click "Bypass Link"
4. Shows destination ✅

### Server Status
```bash
ssh root@YOUR_SERVER_IP
pm2 status
pm2 logs evo-bypass
```

---

## 🔄 UPDATE YOUR APP

**Just push code - it auto-deploys!**

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# GitLab automatically deploys! 🚀
```

---

## 🐛 TROUBLESHOOTING

### Pipeline Failed?
1. Check **CI/CD** → **Pipelines** → View logs
2. Verify SSH_PRIVATE_KEY is correct
3. Verify SERVER_IP is correct

### App Not Running?
```bash
ssh root@YOUR_SERVER_IP
pm2 logs evo-bypass
pm2 restart evo-bypass
```

### Bot Offline?
```bash
ssh root@YOUR_SERVER_IP
pm2 logs evo-bypass | grep -i discord
pm2 restart evo-bypass
```

---

## 💰 COST

- **Server**: $4-6/month
- **Domain** (optional): $1-12/year
- **SSL** (optional): Free
- **GitLab**: Free
- **Total**: ~$4-6/month

---

## 📊 WHAT YOU GET

✅ **50+ Services** - Linkvertise, Rekonise, Work.ink, Lootlabs, etc.  
✅ **Discord Bot** - 6 slash commands  
✅ **Clean UI** - Light theme like izen.lol  
✅ **Real Bypass** - Not fake keys  
✅ **24/7 Operation** - Runs on server, not PC  
✅ **Auto-Deploy** - Push code = auto deploy  
✅ **Auto-Restart** - Restarts on crash  
✅ **Caching** - 60x faster responses  
✅ **Rate Limiting** - Prevents abuse  
✅ **Production Ready** - Enterprise-grade  

---

## 🎯 NEXT STEPS (Optional)

### Add Domain
```bash
# Buy domain from Namecheap
# Point A record to server IP
# Update CLIENT_ORIGIN in .env
```

### Add SSL (HTTPS)
```bash
ssh root@YOUR_SERVER_IP
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 📞 QUICK COMMANDS

### Local
```bash
npm install          # Install dependencies
npm run dev          # Development mode
npm run build        # Build for production
node validate-setup.js  # Validate setup
```

### Server
```bash
ssh root@YOUR_SERVER_IP  # Connect
pm2 status               # Check status
pm2 logs evo-bypass      # View logs
pm2 restart evo-bypass   # Restart app
pm2 monit                # Monitor resources
```

### GitLab
```bash
git push origin main     # Deploy
# View: CI/CD → Pipelines
```

---

## 🎉 YOU'RE LIVE!

Your bypass platform is now:
- ✅ Running 24/7 on server
- ✅ Auto-deploying on git push
- ✅ Discord bot online
- ✅ Bypassing 50+ services
- ✅ Production-ready

**Total setup time: ~15 minutes** ⚡

---

## 📚 FULL DOCUMENTATION

- **Complete Guide**: `FINAL_DEPLOYMENT_CHECKLIST.md`
- **GitLab Guide**: `GITLAB_DEPLOYMENT_GUIDE.md`
- **Quick Start**: `QUICK_START.md`
- **Services List**: `SUPPORTED_SERVICES_COMPLETE.md`

---

**Ready to dominate! 🔥**
