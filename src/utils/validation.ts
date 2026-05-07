export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const validateBTCAddress = (address: string): boolean => {
  const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/
  return btcRegex.test(address)
}

export const validateETHAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const validateTRCAddress = (address: string): boolean => {
  return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address)
}

export const validateCryptoAddress = (address: string, type: 'BTC' | 'ETH' | 'USDT'): boolean => {
  switch (type) {
    case 'BTC':
      return validateBTCAddress(address)
    case 'ETH':
      return validateETHAddress(address)
    case 'USDT':
      return validateTRCAddress(address)
    default:
      return false
  }
}

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(amount)
}

export const formatToCrypto = (amount: number, decimals: number = 8): string => {
  return amount.toFixed(decimals)
}
