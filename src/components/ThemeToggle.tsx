import React from 'react'
import { useTranslation } from 'react-i18next'

interface ThemeToggleProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation()

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg glass-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition"
      title={darkMode ? t('light_mode') : t('dark_mode')}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
