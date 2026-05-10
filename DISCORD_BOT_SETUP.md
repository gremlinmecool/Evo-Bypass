# 🤖 EVO BYPASS Discord Bot Setup

## ✅ Bot is Already Configured!

Your Discord bot is already set up and ready to run 24/7. The bot token and client ID are configured in your `.env` file.

## 🚀 Quick Start

### 1. Start the Bot

```bash
# Install dependencies (if not already done)
npm install

# Start the backend (which includes the bot)
npm run dev:backend
```

The bot will automatically:
- Connect to Discord
- Register all slash commands
- Start listening for interactions

### 2. Invite Bot to Your Server

Use this link to add the bot to your Discord server:

```
https://discord.com/api/oauth2/authorize?client_id=1503006516620427304&permissions=8&scope=bot%20applications.commands
```

**Permissions Included:**
- Administrator (for full functionality)
- Manage Channels (for ticket system)
- Send Messages
- Embed Links
- Manage Roles (for auto-role feature)

## 📋 Available Commands

### 🔓 /bypass
Bypass any supported link instantly.

**Usage:**
```
/bypass link: https://work.ink/example
```

**Features:**
- Instant bypass processing
- Returns bypassed key
- Shows processing time
- Includes quick action buttons

### 💎 /premium
Check your premium status and benefits.

**Usage:**
```
/premium
```

**Shows:**
- Current plan
- Bypasses used
- Reset timer
- Premium benefits

### 📊 /stats
View global bypass statistics.

**Usage:**
```
/stats
```

**Displays:**
- Total bypasses
- Active users
- Success rate
- Average speed
- Uptime

### 🎫 /ticket
Create a support ticket.

**Usage:**
```
/ticket reason: Bug Report
```

**Ticket Types:**
- 🐛 Bug Report
- 💎 Premium Support
- ❓ General Question
- 💰 Billing Issue
- 🔧 Technical Issue

### ⚙️ /settings
Configure bot settings (Admin only).

**Usage:**
```
/settings view
/settings logs channel: #bypass-logs
/settings autorole role: @Verified
```

### ❓ /help
View all available commands.

**Usage:**
```
/help
```

## 🎨 Bot Features

### ✨ Modern UI
- Beautiful embeds with gradient colors
- Interactive buttons
- Rich formatting
- Emoji indicators

### 🛡️ Auto Moderation
- Spam protection
- Rate limiting
- Abuse prevention

### 🎫 Ticket System
- Automatic channel creation
- Permission management
- Support team notifications

### 📝 Logging System
- Track all bypass activities
- Server-specific logs
- Customizable log channels

### 🎭 Role Syncing
- Auto-assign roles to verified users
- Premium role management
- Custom role configuration

### 🌐 Webhook Support
- External service integration
- Real-time notifications
- Custom webhook endpoints

## 🔧 Configuration

Your bot is configured in `backend/.env`:

```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=1503006516620427304
DISCORD_PERMISSIONS=8
```

## 📊 Bot Status

The bot runs 24/7 when the backend server is running. To keep it online:

### Option 1: Local Development
```bash
npm run dev:backend
```

### Option 2: Production Deployment
Deploy to a hosting service like:
- Heroku
- Railway
- DigitalOcean
- AWS
- Google Cloud

### Option 3: Keep Alive Service
Use a service like:
- UptimeRobot (ping your server every 5 minutes)
- Cron-job.org
- Better Uptime

## 🌐 Website Integration

The bot is integrated with your website:

1. **Bot Page**: `website/bot.html` - Full bot documentation
2. **Add Bot Button**: Direct invite link on homepage
3. **Discord OAuth**: Login with Discord feature

## 🎯 Supported Services

The bot can bypass:
- Linkvertise
- Work.ink
- Lootlabs
- Admaven
- Lockr.so
- Shortfly
- And more!

## 💡 Tips

1. **Test Commands**: Use `/help` to see all available commands
2. **Admin Setup**: Use `/settings` to configure your server
3. **Support**: Create tickets with `/ticket` for help
4. **Premium**: Check `/premium` for upgrade options

## 🔒 Security

- Bot token is stored securely in `.env`
- Never share your bot token
- Use environment variables in production
- Enable 2FA on your Discord account

## 📱 Mobile Support

All commands work perfectly on:
- Discord Desktop
- Discord Mobile (iOS/Android)
- Discord Web

## 🎉 You're All Set!

Your Discord bot is ready to use. Just start the backend server and invite the bot to your server!

**Need Help?**
- Check the bot page: `website/bot.html`
- Use `/help` command in Discord
- Join the support server
- Create a ticket with `/ticket`

---

**Bot Status**: ✅ Online 24/7  
**Commands**: 6 Slash Commands  
**Features**: Full-Featured Premium Bot
