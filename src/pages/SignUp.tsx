import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthState } from '../types'
import { validateEmail, validatePassword } from '../utils/validation'
import Message from '../components/Message'
import Modal from '../components/Modal'

interface SignUpProps {
  onNavigate: (page: any) => void
  setAuth: (auth: AuthState) => void
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate, setAuth }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0]
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setSuccessMessage('Account created successfully! Redirecting to dashboard...')

      setTimeout(() => {
        const user = {
          id: Math.random().toString(),
          username: formData.username,
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
      }, 2000)
    } catch (err: any) {
      setErrors({ submit: err.message || 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t('create_account')}
        </h2>

        {errors.submit && (
          <div className="mb-4">
            <Message type="error" text={errors.submit} />
          </div>
        )}

        {successMessage && (
          <div className="mb-4">
            <Message type="success" text={successMessage} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('username')}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="text-bold-light"
              disabled={loading}
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('confirm_password')}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="text-bold-light"
              disabled={loading}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 mt-1"
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {t('agree_to_terms')}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Terms
              </button>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : t('sign_up')}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {t('already_have_account')}{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            {t('login')}
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
          <p>By creating an account and using this Federal Grants Portal, you accept and agree to be bound by the terms of this agreement.</p>
          
          <p><strong>2. Account Creation</strong></p>
          <p>You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your login credentials.</p>
          
          <p><strong>3. Eligibility</strong></p>
          <p>You must be at least 18 years old and a legal resident to use this service and receive federal grant funds.</p>
          
          <p><strong>4. Deposit Requirements</strong></p>
          <p>A minimum deposit of $5,000 is required before you can withdraw your grant funds. This deposit is used for verification and will be credited to your account.</p>
          
          <p><strong>5. Acceptable Use</strong></p>
          <p>You agree not to use this platform for illegal activities, fraud, or any activities that violate applicable laws.</p>
          
          <p><strong>6. Data Protection</strong></p>
          <p>We are committed to protecting your personal data. Your information will be encrypted and stored securely.</p>
        </div>
      </Modal>
    </div>
  )
}

export default SignUp
