import React, { useState, useEffect } from 'react'
import { useNetworkStatus } from '../hooks/useNetworkStatus'
import Message from '../components/Message'

interface ProcessingProps {
  onNavigate: (page: any) => void
}

const Processing: React.FC<ProcessingProps> = ({ onNavigate }) => {
  const networkStatus = useNetworkStatus()
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Initializing transaction...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 30
        
        if (next < 25) setMessage('Validating blockchain...')
        else if (next < 50) setMessage('Confirming transaction...')
        else if (next < 75) setMessage('Broadcasting to network...')
        else if (next < 90) setMessage('Waiting for confirmations...')
        else setMessage('Almost complete...')

        return Math.min(next, 100)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const statusColors = {
    connected: 'text-green-600 dark:text-green-400',
    lagging: 'text-yellow-600 dark:text-yellow-400',
    offline: 'text-red-600 dark:text-red-400',
  }

  const statusDots = {
    connected: '🟢',
    lagging: '🟡',
    offline: '🔴',
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-12 text-center space-y-8">
        <div className="text-6xl animate-spin">⚙️</div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Processing Transaction</h2>
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Network Status */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{statusDots[networkStatus]}</span>
            <span className={`font-semibold ${statusColors[networkStatus]}`}>
              Network: {networkStatus.charAt(0).toUpperCase() + networkStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Info Message */}
        <div className="info-message p-4 rounded-lg">
          <p className="text-sm">
            Please do not close this window. Your transaction is being processed on the blockchain network.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="btn-secondary"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Processing
