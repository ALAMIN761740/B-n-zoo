import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations.js'

const STORAGE_KEY = 'bnzoo-lang'
const LanguageContext = createContext(null)

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'bn'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'bn' ? stored : 'bn'
  } catch {
    return 'bn'
  }
}

function lookup(dictionary, path) {
  return path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), dictionary)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Preference cannot be persisted; the current session still works.
    }
  }, [lang])

  const setLang = useCallback((next) => {
    if (next === 'bn' || next === 'en') setLangState(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'bn' ? 'en' : 'bn'))
  }, [])

  const t = useCallback(
    (path) => {
      const value = lookup(translations[lang], path)
      if (value !== undefined) return value
      return lookup(translations.en, path) ?? path
    },
    [lang],
  )

  // Picks the current language from a { en, bn } content object.
  const pick = useCallback(
    (value) => {
      if (value == null) return ''
      if (typeof value === 'string' || typeof value === 'number') return value
      return value[lang] ?? value.en ?? ''
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, pick, isBangla: lang === 'bn' }),
    [lang, setLang, toggleLang, t, pick],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside a LanguageProvider')
  return context
}
