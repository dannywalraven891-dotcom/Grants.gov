import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '../utils/validation'
import Message from '../components/Message'
import Modal from '../components/Modal'

interface AdminPanelProps {
  onNavigate: (page: any) => void
}

interface MockUser {
  id: string
  username: string
  email: string
  balance: number
  depositVerified: boolean
  createdAt: string
}

interface AdminSettings {
  supportEmail: string
  supportPhone: string
  minimumDeposit: number
  transactionFee: number
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('users')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<MockUser | null>(null)
  const [settings, setSettings] = useState<AdminSettings>({
    supportEmail: 'hatcanoff779@owleyes.ch',
    supportPhone: '+1 (256) 563-1275',
    minimumDeposit: 5000,
    transactionFee: 0.001,
  })

  // Mock users list
  const [users, setUsers] = useState<MockUser[]>([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      balance: 65000,
      depositVerified: true,
      createdAt: '2026-05-01',
    },
    {
      id: '2',
      username: 'jane_smith',
      email: 'jane@example.com',
      balance: 65000,
      depositVerified: false,
      createdAt: '2026-05-02',
    },
    {
      id: '3',
      username: 'bob_wilson',
      email: 'bob@example.com',
      balance: 65000,
      depositVerified: true,
      createdAt: '2026-05-03',
    },
  ])

  const handleEditUser = (user: MockUser) => {
    setEditingUser({ ...user })
    setShowEditModal(true)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
      setMessage({ type: 'success', text: 'User updated successfully' })
      setShowEditModal(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
    setMessage({ type: 'success', text: 'User deleted successfully' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSettingsSave = () => {
    setMessage({ type: 'success', text: 'Settings updated successfully' })
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage users, transactions, and platform settings</p>
          </div>
          <button
            onClick={() => onNavigate('landing')}
            className="btn-secondary"
          >
            ← Exit Admin
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <Message
          type={message.type}
          text={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'transactions'
              ? 'bg-blue-600 text-white'
              : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Transactions
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
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Management</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Balance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">{user.username}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {formatCurrency(user.balance)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.depositVerified
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {user.depositVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="btn-secondary text-xs py-1 px-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-danger text-xs py-1 px-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Total Users:</strong> {users.length} | 
              <strong className="ml-4">Verified:</strong> {users.filter(u => u.depositVerified).length} | 
              <strong className="ml-4">Total Balance:</strong> {formatCurrency(users.reduce((sum, u) => sum + u.balance, 0))}
            </p>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transaction Management</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Withdrawals</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
                </div>
                <button className="btn-primary">View Requests</button>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed Transactions</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">12</p>
                </div>
                <button className="btn-secondary">View History</button>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Volume</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">${(users.length * 65000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 info-message p-4 rounded-lg">
            <p className="text-sm">
              Transaction management features including approval/denial of withdrawals and payment screenshot verification are available here.
            </p>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="text-bold-light"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">This email appears to users for support inquiries</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Support Phone Number
              </label>
              <input
                type="tel"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="text-bold-light"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Contact number displayed in user dashboard</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Minimum Deposit (USD)
              </label>
              <input
                type="number"
                value={settings.minimumDeposit}
                onChange={(e) => setSettings({ ...settings, minimumDeposit: parseFloat(e.target.value) })}
                className="text-bold-light"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Required deposit before withdrawal</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Transaction Fee
              </label>
              <input
                type="number"
                value={settings.transactionFee}
                onChange={(e) => setSettings({ ...settings, transactionFee: parseFloat(e.target.value) })}
                className="text-bold-light"
                step="0.0001"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Fee deducted from each withdrawal</p>
            </div>

            <button
              onClick={handleSettingsSave}
              className="btn-primary"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        title="Edit User"
        onClose={() => setShowEditModal(false)}
        onConfirm={handleSaveUser}
        confirmText="Save Changes"
      >
        {editingUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className="text-bold-light text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="text-bold-light text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Balance
              </label>
              <input
                type="number"
                value={editingUser.balance}
                onChange={(e) => setEditingUser({ ...editingUser, balance: parseFloat(e.target.value) })}
                className="text-bold-light text-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={editingUser.depositVerified}
                onChange={(e) => setEditingUser({ ...editingUser, depositVerified: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="verified" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Deposit Verified
              </label>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AdminPanel
