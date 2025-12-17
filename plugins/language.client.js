export default defineNuxtPlugin(() => {
  // Force l'initialisation de la langue au démarrage
  const { currentLanguage } = useLanguage()
  
  // S'assurer qu'une langue est définie
  if (!currentLanguage.value) {
    currentLanguage.value = 'fr'
  }
})
