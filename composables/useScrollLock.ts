/**
 * Locks the page scroll while a modal (modal-lock) or the mobile menu (nav-lock) is open.
 *
 * overflow: hidden removes the scrollbar, so the page and the fixed bars would widen by its width and jump. Before
 * locking, the width of the scrollbar is measured and stored in --lock-gap: the body and the fixed elements keep
 * that room on their right while locked (topbar.css). 0 with overlay scrollbars (mobile, macOS).
 * scrollbar-gutter: stable is not used: the reserved gutter stays outside the fixed modal, which then leaves an
 * unveiled strip on the right of the page.
 */
const LOCKS = ['modal-lock', 'nav-lock'] as const
export type ScrollLock = (typeof LOCKS)[number]

export function setScrollLock(lock: ScrollLock, on: boolean) {
  if (!import.meta.client) return
  const html = document.documentElement
  // Measure only while nothing is locked yet: once locked, the scrollbar is already gone.
  if (on && !LOCKS.some((l) => html.classList.contains(l))) {
    html.style.setProperty('--lock-gap', `${Math.max(0, window.innerWidth - html.clientWidth)}px`)
  }
  html.classList.toggle(lock, on)
}
