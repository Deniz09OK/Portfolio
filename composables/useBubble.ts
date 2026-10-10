/**
 * Click-to-reveal bubble: toggles on demand, closes on outside click or Escape.
 * Bind `root` to the element that wraps both the trigger and the bubble.
 */
export function useBubble() {
  const root = ref<HTMLElement | null>(null)
  const open = ref(false)

  function toggle() {
    open.value = !open.value
  }

  function close() {
    open.value = false
  }

  function onPointerDown(e: PointerEvent) {
    if (!root.value?.contains(e.target as Node)) close()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }

  function unbind() {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
  }

  watch(open, (isOpen) => {
    if (!import.meta.client) return
    unbind()
    if (isOpen) {
      document.addEventListener('pointerdown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)
    }
  })

  onBeforeUnmount(() => {
    if (import.meta.client) unbind()
  })

  return { root, open, toggle, close }
}
