import React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthState } from '../types'

interface LandingProps {
  onNavigate: (page: any) => void
  isAuthenticated: boolean
  user: any
}

const Landing: React.FC<LandingProps> = ({ onNavigate, isAuthenticated, user }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass rounded-3xl p-8 sm:p-12 text-center">
        <div className="mb-6 text-6xl">🏛️</div>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('app_name')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Secure, professional, and accessible federal grant distribution platform
        </p>
        
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('login')}
              className="btn-primary"
            >
              {t('login')}
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="btn-secondary"
            >
              {t('sign_up')}
            </button>
          </div>
        )}
        
        {isAuthenticated && user && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-900 dark:text-blue-200 font-semibold">
              Welcome back, <strong>{user.username}</strong>!
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enterprise-grade encryption and security protocols protect your funds and data
          </p>
        </div>
        
        <div className="glass rounded-2xl p-6">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Quick withdrawals and instant balance updates with real-time notifications
          </p>
        </div>
        
        <div className="glass rounded-2xl p-6">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Support for multiple cryptocurrencies and 8 languages worldwide
          </p>
        </div>
      </div>

      {/* Supported Crypto */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Supported Cryptocurrencies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <p className="font-bold text-gray-900 dark:text-white">₿ Bitcoin</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Most trusted</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <p className="font-bold text-gray-900 dark:text-white">Ξ Ethereum</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Smart contracts</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <p className="font-bold text-gray-900 dark:text-white">₮ USDT</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Stable coin</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to get started?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create your account today and begin receiving your federal grant funds
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="btn-primary text-lg"
          >
            {t('create_account')}
          </button>
        </div>
      )}

      {isAuthenticated && user && (
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Account</h3>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-primary text-lg"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}

export default Landing
