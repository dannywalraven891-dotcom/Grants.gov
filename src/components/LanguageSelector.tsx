import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'pt', name: 'Português' },
  ]

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setIsOpen(false)
  }

  const currentLang = languages.find(l => l.code === i18n.language)?.name || 'English'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg glass-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition text-sm font-semibold"
      >
        🌐 {currentLang}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition ${
                i18n.language === lang.code ? 'bg-blue-100 dark:bg-blue-900/30' : ''
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
