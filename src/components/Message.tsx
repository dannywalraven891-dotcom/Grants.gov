import React from 'react'

interface Message {
  type: 'success' | 'error' | 'warning' | 'info'
  text: string
}

interface MessageProps extends Message {
  onClose?: () => void
}

const Message: React.FC<MessageProps> = ({ type, text, onClose }) => {
  const styles = {
    success: 'success-message',
    error: 'error-message',
    warning: 'warning-message',
    info: 'info-message',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'ⓘ',
  }

  return (
    <div className={`${styles[type]} flex items-center gap-3 p-4 rounded-lg animate-fade-in`}>
      <span className="text-xl font-bold">{icons[type]}</span>
      <span className="flex-1">{text}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg font-bold hover:opacity-70 transition"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Message
