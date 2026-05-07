import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass z-10 max-w-md w-full mx-4 p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <div className="mb-6 text-gray-700 dark:text-gray-300">
          {children}
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={isDanger ? 'btn-danger' : 'btn-primary'}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
