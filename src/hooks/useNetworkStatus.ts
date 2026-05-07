import { useState, useEffect } from 'react'

export type NetworkStatus = 'connected' | 'lagging' | 'offline'

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>('connected')

  useEffect(() => {
    const handleOnline = () => setStatus('connected')
    const handleOffline = () => setStatus('offline')

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial status
    if (!navigator.onLine) {
      setStatus('offline')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return status
}
