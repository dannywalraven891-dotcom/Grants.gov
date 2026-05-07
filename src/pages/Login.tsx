import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthState } from '../types'
import { validateEmail, validatePassword } from '../utils/validation'
import Message from '../components/Message'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'

interface LoginProps {
  onNavigate: (page: any) => void
  setAuth: (auth: AuthState) => void
}

const Login: React.FC<LoginProps> = ({ onNavigate, setAuth }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const user = {
        id: '1',
        username: formData.email.split('@')[0],
        email: formData.email,
        balance: 65000,
        depositVerified: false,
        createdAt: new Date().toISOString(),
        language: 'en',
      }

      localStorage.setItem('authToken', 'mock-token')
      localStorage.setItem('user', JSON.stringify(user))
      
      setAuth({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      })

      onNavigate('dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t('login_to_account')}
        </h2>

        {error && (
          <div className="mb-4">
            <Message type="error" text={error} onClose={() => setError('')} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="text-bold-light"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="text-bold-light"
              disabled={loading}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {t('agree_to_terms')}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Terms
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : t('login')}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {t('dont_have_account')}{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            {t('sign_up')}
          </button>
        </p>
      </div>

      <Modal
        isOpen={showTerms}
        title={t('terms_and_conditions')}
        onClose={() => setShowTerms(false)}
      >
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 max-h-96 overflow-y-auto">
          <p><strong>1. Acceptance of Terms</strong></p>
          <p>By accessing and using this Federal Grants Portal, you accept and agree to be bound by the terms of this agreement.</p>
          
          <p><strong>2. User Responsibilities</strong></p>
          <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
          
          <p><strong>3. Deposit Requirements</strong></p>
          <p>A minimum deposit of $5,000 is required before you can withdraw your grant funds. This is for verification purposes only.</p>
          
          <p><strong>4. Cryptocurrency Transactions</strong></p>
          <p>All transactions are processed through blockchain networks. You acknowledge the risks associated with cryptocurrency transactions.</p>
          
          <p><strong>5. Limitation of Liability</strong></p>
          <p>The platform is provided 'as is' without warranties. We are not liable for any losses or damages from your use of this service.</p>
          
          <p><strong>6. Privacy</strong></p>
          <p>Your personal data will be processed in accordance with our Privacy Policy. We will never share your information with third parties without consent.</p>
        </div>
      </Modal>
    </div>
  )
}

export default Login
