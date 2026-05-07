import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '../types'
import { validateCryptoAddress, formatCurrency } from '../utils/validation'
import { useFormValidation } from '../hooks/useFormValidation'
import Modal from '../components/Modal'
import Message from '../components/Message'
import LoadingSpinner from '../components/LoadingSpinner'

interface WithdrawalProps {
  user: User
  onNavigate: (page: any) => void
  setAuth: (auth: any) => void
}

const cryptoAddresses = {
  BTC: 'bc1q036k7urq5pvjq29pep96ds4gftgmwycymnzs48',
  ETH: '0xb8DDf6611c7A8a5D726B68F2A5F110BD2B839dAd',
  USDT: 'TWuspo2EFsdb551sVaXJjM7yZ3fGiP2UZ5',
}

const Withdrawal: React.FC<WithdrawalProps> = ({ user, onNavigate, setAuth }) => {
  const { t } = useTranslation()
  const { validation, setError, setSuccess, clear } = useFormValidation()
  
  const [cryptoType, setCryptoType] = useState<'BTC' | 'ETH' | 'USDT'>('BTC')
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')

  const transactionFee = 0.001
  const finalAmount = amount ? (parseFloat(amount) - transactionFee) : 0

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    
    if (value) {
      const numValue = parseFloat(value)
      if (numValue > user.balance) {
        setError('Amount exceeds your balance')
      } else if (numValue <= 0) {
        setError('Amount must be greater than 0')
      } else if (numValue < 100) {
        setError('Minimum withdrawal is $100')
      } else {
        clear()
      }
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)
    
    if (value) {
      if (!validateCryptoAddress(value, cryptoType)) {
        setError(`Invalid ${cryptoType} address format`)
      } else {
        clear()
      }
    }
  }

  const handleWithdrawal = async () => {
    if (!amount || !address || !cryptoType) {
      setError('Please fill in all fields')
      return
    }

    if (!validateCryptoAddress(address, cryptoType)) {
      setError(`Invalid ${cryptoType} address`)
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowConfirmation(true)
      setSuccess('Withdrawal request confirmed! Proceeding to processing...')
      
      setTimeout(() => {
        onNavigate('processing')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr)
    setSuccess('Address copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <LoadingSpinner text="Processing withdrawal request..." />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Withdraw Funds</h2>

        {validation.message && (
          <div className="mb-4">
            <Message type={validation.type || 'error'} text={validation.message} />
          </div>
        )}

        <div className="space-y-6">
          {/* Crypto Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Select Cryptocurrency
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['BTC', 'ETH', 'USDT'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setCryptoType(type)}
                  className={`p-4 rounded-lg font-semibold transition ${
                    cryptoType === type
                      ? 'bg-blue-600 text-white'
                      : 'glass hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {type === 'BTC' && '₿'}
                  {type === 'ETH' && '⟠'}
                  {type === 'USDT' && '◎'}
                  <br />
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Amount (USD)
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              min="100"
              max={user.balance}
              className="text-bold-light"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Available: {formatCurrency(user.balance)} | Transaction Fee: ${transactionFee.toFixed(3)}
            </p>
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Receiving Address
            </label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder={`Enter your ${cryptoType} address`}
              className="text-bold-light"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Make sure the address is correct. Funds cannot be recovered if sent to wrong address.
            </p>
          </div>

          {/* Crypto Address Reference */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Send {cryptoType} to this address:
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 break-all font-mono text-sm">
              {cryptoAddresses[cryptoType]}
            </div>
            <button
              onClick={() => copyAddress(cryptoAddresses[cryptoType])}
              className="btn-secondary text-sm mt-2"
            >
              Copy Address
            </button>
          </div>

          {/* Summary */}
          {amount && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${transactionFee.toFixed(3)}</span>
                </div>
                <div className="border-t border-green-200 dark:border-green-800 pt-2 flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">You'll receive:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">${finalAmount.toFixed(3)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={() => handleWithdrawal()}
            disabled={!amount || !address || !cryptoType}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review & Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Withdrawal
