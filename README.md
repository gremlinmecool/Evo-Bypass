# 🚀 Evo Bypass

**Free instant bypasser for Linkvertise, Lootlabs, Work.ink, Rekonise, Platoboost and 30+ more services**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/akatsukixpain12-stack/Evo-Bypass)](https://github.com/akatsukixpain12-stack/Evo-Bypass/stargazers)

---

## ✨ Features

- 🔗 **Link Bypasser** - Bypass 30+ services (Linkvertise, Lootlabs, Work.ink, etc.)
- 🖼️ **Green Screen Remover** - Remove green backgrounds from images
- 🚀 **Fast & Free** - No surveys, no downloads, instant results
- 🔒 **Secure** - Rate limiting, API key authentication
- 📊 **Stats Tracking** - Real-time bypass statistics
- 🎨 **Modern UI** - Beautiful, responsive design

---

## 🎯 Supported Services

✅ Linkvertise  
✅ Work.ink  
✅ Lootlabs  
✅ Rekonise  
✅ Platoboost  
✅ Admaven  
✅ Lockr.so  
✅ Shrtfly  
✅ Sub2Unlock  
✅ Boost.ink  
✅ mBoost  
✅ **30+ more via Universal bypass**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/akatsukixpain12-stack/Evo-Bypass.git
cd Evo-Bypass

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs at: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:3001`

---

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```

### Bypass Single URL
```http
POST /api/bypass
Content-Type: application/json

{
  "url": "https://linkvertise.com/123456/example"
}
```

### Get Statistics
```http
GET /api/stats
```

### Bulk Bypass (API Key Required)
```http
POST /api/bypass/bulk
Content-Type: application/json

{
  "apiKey": "your-api-key",
  "urls": ["url1", "url2"]
}
```

---

## 🛠️ Tools

### 1. Link Bypasser
- Bypass 30+ link shortener services
- Instant results
- No captcha for API users

### 2. Green Screen Remover
- Upload images (PNG, JPG, WEBP)
- Adjustable sensitivity
- Download with transparent background

### 3. More Coming Soon
- Image Compressor
- QR Code Generator
- URL Shortener

---

## 📁 Project Structure

```
Evo-Bypass/
├── server/              # Backend API
│   ├── services/
│   │   └── bypass.js   # Bypass logic
│   ├── server.js       # Express server
│   └── package.json
├── frontend/            # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx    # Home page
│   │   └── tools/      # Tools pages
│   └── package.json
├── website/             # Static HTML version
└── README.md
```

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
API_KEY=your-secret-key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This tool is for educational purposes only. Use responsibly and respect the terms of service of the websites you interact with.

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

## 📧 Contact

- GitHub: [@akatsukixpain12-stack](https://github.com/akatsukixpain12-stack)
- Repository: [Evo-Bypass](https://github.com/akatsukixpain12-stack/Evo-Bypass)

---

## 🙏 Acknowledgments

- Built with Next.js, Express, and TypeScript
- Inspired by the need for a free, fast bypass tool
- Thanks to all contributors!

---

**Made with ❤️ by akatsukixpain12-stack**
