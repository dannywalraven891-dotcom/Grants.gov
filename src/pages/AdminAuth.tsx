import React, { useState } from 'react'

interface AdminAuthProps {
  onSuccess: () => void
  onCancel: () => void
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onSuccess, onCancel }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const MASTER_CODE = 'Q5HJ-8ZK9-6RWB'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (code.toUpperCase() === MASTER_CODE) {
        onSuccess()
      } else {
        setError('Invalid authentication code')
        setCode('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Enter the master authentication code to continue</p>
        </div>

        {error && (
          <div className="error-message p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Master Auth Code
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError('')
              }}
              placeholder="Enter code"
              className="text-bold-light text-center text-lg tracking-widest"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Access'}
          </button>
        </form>

        <button
          onClick={onCancel}
          className="btn-secondary w-full mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AdminAuth
