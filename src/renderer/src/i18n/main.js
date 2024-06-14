import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import localeZh from './translation/zh'
import localeEn from './translation/en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: localeZh },
      en: { translation: localeEn }
    },
    lng: 'zh',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
export const t = i18n.t
