
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  function ensureObserver() {
    if (observer || !('IntersectionObserver' in window)) return observer
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            el.classList.add('is-visible')
            observer?.unobserve(el)
            // Drop the reveal classes once the entrance transition finishes so
            // they stop overriding interactive styles (e.g. the hover lift on cards).
            window.setTimeout(() => el.classList.remove('reveal', 'is-visible'), 850)
          }
        }
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.05 },
    )
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      el.classList.add('reveal')
      const obs = ensureObserver()
      if (obs) obs.observe(el)
      else el.classList.add('is-visible')
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })

  nuxtApp.hook('app:mounted', () => {
    requestAnimationFrame(() => document.documentElement.classList.add('js-ready'))
  })
})
