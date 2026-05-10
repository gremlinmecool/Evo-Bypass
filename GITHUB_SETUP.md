# 🚀 GitHub Setup - Quick Guide

## ⚡ Push to GitHub in 2 Minutes

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `evo-bypass`
3. Description: `Advanced bypass platform with Discord bot - 50+ services`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - EVO BYPASS platform with 50+ services"

# Add GitHub remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/evo-bypass.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Done! Your code is on GitHub!**

---

## 🔄 How to Update (Push Changes)

### Every time you make changes:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Describe what you changed"

# 4. Push to GitHub
git push origin main
```

**That's it!** If connected to Render, it will auto-deploy.

---

## 📋 Common Git Commands

### Check Status
```bash
git status
```

### View History
```bash
git log --oneline
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Discard All Local Changes
```bash
git reset --hard HEAD
```

### Create New Branch
```bash
git checkout -b feature-name
```

### Switch Branch
```bash
git checkout main
```

### Merge Branch
```bash
git checkout main
git merge feature-name
```

---

## 🐛 Troubleshooting

### Issue: "fatal: remote origin already exists"

**Solution:**
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/evo-bypass.git
```

### Issue: "failed to push some refs"

**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Issue: "Permission denied (publickey)"

**Solution:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/evo-bypass.git
```

### Issue: Large files error

**Solution:**
```bash
# Remove node_modules from git
git rm -r --cached node_modules
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Remove node_modules"
git push origin main
```

---

## 🎯 Best Practices

### 1. Commit Often
```bash
# Good commits
git commit -m "Add Rekonise bypass support"
git commit -m "Fix rate limiting bug"
git commit -m "Update Discord bot commands"

# Bad commits
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

### 2. Use .gitignore
Already configured! Excludes:
- `node_modules/`
- `.env`
- `dist/`
- `*.log`

### 3. Never Commit Secrets
- ✅ Use environment variables
- ✅ Use `.env` file (already in .gitignore)
- ❌ Never commit API keys, tokens, passwords

### 4. Pull Before Push
```bash
# Always pull first to avoid conflicts
git pull origin main
git push origin main
```

---

## 🔗 Connect to Render

After pushing to GitHub:

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select `evo-bypass` repository
5. Follow RENDER_GITHUB_DEPLOY.md guide

**Render will auto-deploy on every push!** 🚀

---

## 📊 GitHub Features

### 1. Releases
Create releases for major versions:
```bash
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0
```

### 2. Issues
Track bugs and features on GitHub Issues tab

### 3. Actions (CI/CD)
Automate testing and deployment (optional)

### 4. Wiki
Document your project (optional)

---

## ✅ Checklist

Before pushing to GitHub:

- [ ] `.gitignore` file exists
- [ ] No `.env` file in git
- [ ] No `node_modules/` in git
- [ ] No sensitive data in code
- [ ] README.md is updated
- [ ] Code is tested locally

---

## 🎉 You're Ready!

Your code is now:
- ✅ On GitHub (version controlled)
- ✅ Backed up (safe)
- ✅ Shareable (public/private)
- ✅ Ready for Render deployment

**Next step:** Follow `RENDER_GITHUB_DEPLOY.md` to deploy! 🚀
