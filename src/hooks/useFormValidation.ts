import { useState, useCallback } from 'react'

interface ValidationState {
  isValid: boolean
  message: string
  type: 'success' | 'error' | 'warning' | null
}

export const useFormValidation = () => {
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    message: '',
    type: null,
  })

  const setError = useCallback((message: string) => {
    setValidation({
      isValid: false,
      message,
      type: 'error',
    })
  }, [])

  const setSuccess = useCallback((message: string) => {
    setValidation({
      isValid: true,
      message,
      type: 'success',
    })
  }, [])

  const setWarning = useCallback((message: string) => {
    setValidation({
      isValid: false,
      message,
      type: 'warning',
    })
  }, [])

  const clear = useCallback(() => {
    setValidation({
      isValid: true,
      message: '',
      type: null,
    })
  }, [])

  return { validation, setError, setSuccess, setWarning, clear }
}
