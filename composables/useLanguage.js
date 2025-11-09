export const useLanguage = () => {
  const currentLanguage = useState('language', () => 'fr')

  const setLanguage = (lang) => {
    currentLanguage.value = lang
    if (process.client) {
      localStorage.setItem('language', lang)
    }
  }

  const initLanguage = () => {
    if (process.client) {
      const saved = localStorage.getItem('language')
      if (saved && ['fr', 'en', 'tr'].includes(saved)) {
        currentLanguage.value = saved
      }
    }
  }

  return {
    currentLanguage,
    setLanguage,
    initLanguage
  }
}
