import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '../types'
import { formatCurrency } from '../utils/validation'
import Message from '../components/Message'

interface DashboardProps {
  user: User
  onNavigate: (page: any) => void
  setAuth: (auth: any) => void
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, setAuth }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('overview')
  const [editingBalance, setEditingBalance] = useState(false)
  const [newBalance, setNewBalance] = useState(user.balance.toString())

  const canWithdraw = user.depositVerified && user.balance >= 1000
  const minimumDeposit = 5000

  const handleBalanceUpdate = () => {
    const updated = {
      ...user,
      balance: parseFloat(newBalance),
    }
    localStorage.setItem('user', JSON.stringify(updated))
    setAuth({ user: updated, isAuthenticated: true, loading: false, error: null })
    setEditingBalance(false)
  }

  const handleLanguageChange = (lang: string) => {
    const updated = { ...user, language: lang }
    localStorage.setItem('user', JSON.stringify(updated))
    setAuth({ user: updated, isAuthenticated: true, loading: false, error: null })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Welcome back,</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Email: {user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Balance</p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(user.balance)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'withdraw'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Withdraw
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'support'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Support
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {!user.depositVerified && (
            <div className="warning-message p-4 rounded-lg">
              <p className="font-semibold mb-2">⚠️ Deposit Required</p>
              <p className="text-sm mb-4">
                You must make a minimum deposit of {formatCurrency(minimumDeposit)} before you can withdraw your grant funds.
              </p>
              <button
                onClick={() => onNavigate('deposit')}
                className="btn-primary text-sm"
              >
                Make Deposit Now
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Deposit Verified:</span>
                  <span className={`font-semibold ${
                    user.depositVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {user.depositVerified ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available Balance:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(user.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Can Withdraw:</span>
                  <span className={`font-semibold ${
                    canWithdraw ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {canWithdraw ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('deposit')}
                  className="w-full btn-secondary text-left px-4 py-2 font-semibold"
                >
                  💳 Make a Deposit
                </button>
                <button
                  onClick={() => onNavigate('withdrawal')}
                  disabled={!canWithdraw}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 font-semibold"
                >
                  💸 Withdraw Funds
                </button>
                <button
                  onClick={() => setActiveTab('support')}
                  className="w-full btn-secondary text-left px-4 py-2 font-semibold"
                >
                  💬 Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Tab */}
      {activeTab === 'withdraw' && (
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Withdraw Funds</h3>
          {!user.depositVerified ? (
            <div className="error-message p-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">Cannot Withdraw</p>
              <p>You need to complete the deposit requirement of {formatCurrency(minimumDeposit)} first.</p>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('withdrawal')}
              className="btn-primary"
            >
              Start Withdrawal Request
            </button>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="text-bold-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="text-bold-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Balance
                </label>
                {!editingBalance ? (
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(user.balance)}
                    </span>
                    <button
                      onClick={() => setEditingBalance(true)}
                      className="btn-secondary text-sm"
                    >
                      Edit Balance
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="text-bold-light flex-1"
                    />
                    <button
                      onClick={handleBalanceUpdate}
                      className="btn-primary"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBalance(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Support & Contact</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">📧 Email Support</p>
              <p className="text-gray-700 dark:text-gray-300">hatcanoff779@owleyes.ch</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Response time: 24 hours</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">📱 Phone Support</p>
              <p className="text-gray-700 dark:text-gray-300">+1 (256) 563-1275</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Available 24/7</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">💬 WhatsApp</p>
              <a
                href="https://wa.me/12565631275"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Chat on WhatsApp
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Click to open WhatsApp</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
