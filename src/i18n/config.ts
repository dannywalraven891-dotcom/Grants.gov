import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import it from './locales/it.json'
import ja from './locales/ja.json'
import zh from './locales/zh.json'
import pt from './locales/pt.json'

const getDefaultLanguage = () => {
  const saved = localStorage.getItem('language')
  if (saved) return saved
  
  const browserLang = navigator.language.split('-')[0]
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'pt']
  
  return supportedLanguages.includes(browserLang) ? browserLang : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      ja: { translation: ja },
      zh: { translation: zh },
      pt: { translation: pt },
    },
    lng: getDefaultLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
