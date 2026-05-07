# Federal Grants Portal

🏛️ A professional, secure, and mobile-friendly federal grant distribution platform with comprehensive admin capabilities.

## Features

### User Features
- ✅ **Secure Authentication** - Email verification, password encryption, Terms & Conditions acceptance
- ✅ **Multi-Language Support** - 8 languages (English, Spanish, French, German, Italian, Japanese, Chinese, Portuguese)
- ✅ **Dark Mode** - Full dark mode with Tailwind CSS integration
- ✅ **Cryptocurrency Support** - Bitcoin (BTC), Ethereum (ETH), USDT (TRC20)
- ✅ **Real-time Validation** - Address format validation, amount verification, live feedback
- ✅ **QR Code Generation** - For each cryptocurrency address
- ✅ **Dashboard** - View balance, deposit status, withdraw funds
- ✅ **Withdrawal System** - Multi-step withdrawal with confirmation modal
- ✅ **2FA Support** - Two-factor authentication for enhanced security
- ✅ **Network Status Indicator** - Real-time network connectivity feedback
- ✅ **Mobile Responsive** - Fully optimized for mobile devices

### Admin Features
- 🔒 **Master Auth Code Protection** - Q5HJ-8ZK9-6RWB (configurable)
- 📊 **User Management** - View, edit, and delete users
- 💰 **Balance Management** - Update user balances directly
- 📈 **Transaction Management** - Approve/decline withdrawals, view payment screenshots
- ⚙️ **Settings** - Configure support contact, deposit requirements, transaction fees
- 📧 **Email/Phone Management** - Update support contact details
- 📊 **Analytics** - Total users, verified accounts, transaction volume

## Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite for blazing fast development
- Tailwind CSS with dark mode support
- React i18next for internationalization
- Real-time validation engine

### Backend (Ready for implementation)
- Node.js with Express
- SQLite/Better SQLite3 for data persistence
- JWT authentication
- Email verification with Nodemailer
- QR Code generation

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your configuration
# - Email credentials
# - JWT secret
# - Admin master code
# - Support contact info

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization config & translations
│   ├── pages/              # Full page components
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions (validation, formatting)
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.ts          # Vite config
└── .env.example            # Environment variables template
```

## Key Pages

### Public Pages
- **Landing** - Welcome page with features overview
- **Login** - User login with email verification
- **SignUp** - Account creation with validation

### Protected Pages
- **Dashboard** - Main user dashboard with balance and actions
- **Withdrawal** - Cryptocurrency withdrawal form with validation
- **Processing** - Real-time transaction processing with network status

### Admin Pages
- **AdminAuth** - Master code verification
- **AdminPanel** - User management, transactions, and settings

## Cryptocurrency Addresses

- **Bitcoin (BTC)**: `bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48`
- **Ethereum (ETH)**: `0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd`
- **USDT (TRC20)**: `TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5`

## Support Contact

- **Email**: hatcanoff779@owleyes.ch
- **Phone**: +1 (256) 563-1275
- **WhatsApp**: Direct link integration

## Admin Master Code

```
Q5HJ-8ZK9-6RWB
```

**Important**: Change this code in production and update the `.env` file accordingly.

## Validation Rules

### Address Validation
- **BTC**: Starts with `bc1`, `1`, or `3` (25-62 alphanumeric characters)
- **ETH**: Starts with `0x` followed by 40 hex characters
- **USDT**: Starts with `T` followed by 33 alphanumeric characters

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Withdrawal Requirements
- Minimum $5,000 deposit required
- Minimum $100 withdrawal
- Maximum withdrawal limited to account balance

## Environment Variables

See `.env.example` for all available configuration options:

```env
VITE_API_URL=http://localhost:5000
VITE_JWT_SECRET=your_jwt_secret_key_here

SERVER_PORT=5000
JWT_SECRET=your_jwt_secret_key_here
DB_PATH=./data/grants.db

EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomainhere.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=Federal Grant Portal <noreply@yourdomainhere.com>

NODE_ENV=development

CRYPTO_ADDRESSES_BTC=bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48
CRYPTO_ADDRESSES_ETH=0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd
CRYPTO_ADDRESSES_USDT=TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5

ADMIN_MASTER_CODE=Q5HJ-8ZK9-6RWB

SUPPORT_PHONE=+1 (256) 563-1275
SUPPORT_EMAIL=hatcanoff779@owleyes.ch
SUPPORT_WHATSAPP=+1-256-563-1275
```

## Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Email verification
✅ Master code protection for admin
✅ Real-time input validation
✅ XSS protection
✅ CORS enabled
✅ Environment variable protection
✅ SSL/TLS ready

## Dark Mode

The platform features a complete dark mode implementation with:
- Tailwind's `dark:` class system
- Glass-morphism effects in both themes
- High contrast for accessibility
- Smooth transitions between modes
- User preference persistence

## Internationalization

Supported languages and their native names:
- English (English)
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Italian (Italiano)
- Japanese (日本語)
- Chinese (中文)
- Portuguese (Português)

Language preference is automatically detected from browser locale and saved for each user.

## API Endpoints (Ready for Implementation)

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/2fa` - Two-factor authentication

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/balance` - Update balance (admin only)
- `GET /api/users` - List all users (admin only)

### Withdrawals
- `POST /api/withdrawals` - Create withdrawal request
- `GET /api/withdrawals` - Get withdrawal history
- `PUT /api/withdrawals/:id` - Update withdrawal status (admin only)
- `POST /api/withdrawals/:id/screenshot` - Upload payment screenshot

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ⚡ Vite for sub-second HMR
- 🎯 Code splitting for optimal bundle size
- 📦 Lazy loading for pages
- 🖼️ Image optimization
- 🗜️ CSS minification
- ✨ Smooth animations with CSS transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email hatcanoff779@owleyes.ch or contact via WhatsApp at +1 (256) 563-1275.

---

**Federal Grants Portal** - Secure, Professional, and Accessible Grant Distribution
