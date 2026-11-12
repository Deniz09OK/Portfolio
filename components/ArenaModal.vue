<script setup lang="ts">
// Dialog frame shared by the off-court modal and the HTB notes modal: backdrop, close button, focus moved into the
// dialog (on the element of the slot marked data-autofocus when there is one, else on the card) and given back on close, Tab / Shift+Tab kept inside, Escape to close, page scroll locked while open,
// will-change set only while it animates.
// The content goes in the default slot. The frame is styled by .arena-modal and the .off-modal-* classes (offcourt.css).
const props = withDefaults(defineProps<{
  open: boolean
  /** Id of the element of the slot that names the dialog. */
  labelledby: string
  closeLabel: string
  /** Class naming this dialog (the off-court modal keeps .off-modal), unique on the page. */
  rootClass?: string
  /** Extra classes and CSS custom properties of the dialog root. */
  modalClass?: Record<string, boolean> | string
  modalStyle?: Record<string, string>
}>(), { rootClass: 'off-modal', modalClass: undefined, modalStyle: undefined })

const emit = defineEmits<{ close: [] }>()

const root = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null

// will-change only while the dialog animates (.is-animating): opacity of the root on open and close, transform of
// the card on open. The class goes once each expected animation has ended; animationend and transitionend bubble up
// from the children (buttons, links), so only events whose target is the root or the card count. A timer removes it
// anyway if an end event never comes. Never set with prefers-reduced-motion (nothing is animated then).
const animating = ref(false)
const MOTION_FALLBACK_MS = 350
let pending = new Set<'root' | 'card'>()
let fallback: ReturnType<typeof setTimeout> | undefined

function stopAnimating() {
  clearTimeout(fallback)
  pending = new Set()
  animating.value = false
}

function startAnimating(isOpen: boolean) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return stopAnimating()
  pending = new Set(isOpen ? ['root', 'card'] : ['root'])
  animating.value = true
  clearTimeout(fallback)
  fallback = setTimeout(stopAnimating, MOTION_FALLBACK_MS)
}

function onMotionEnd(e: Event) {
  if (!animating.value) return
  if (e.target === root.value && e instanceof TransitionEvent && e.propertyName === 'opacity') pending.delete('root')
  else if (e.target === card.value && e.type === 'animationend') pending.delete('card')
  else return
  if (!pending.size) stopAnimating()
}

// Lock body scroll, move focus into the dialog and give it back to the opener on close.
watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return
    setScrollLock('modal-lock', isOpen)
    startAnimating(isOpen)
    if (isOpen) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      await nextTick()
      // The content may name its own first focus (a form field, say) with data-autofocus; else the card gets it.
      const target = card.value?.querySelector<HTMLElement>('[data-autofocus]') ?? card.value
      target?.focus({ preventScroll: true })
    } else {
      if (opener?.isConnected) opener.focus()
      opener = null
    }
  },
)

function focusables(): HTMLElement[] {
  if (!card.value) return []
  return Array.from(
    card.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

// Close on Escape and keep Tab / Shift+Tab inside the dialog while open.
function onKey(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  if (e.key !== 'Tab') return
  const items = focusables()
  if (!items.length) {
    e.preventDefault()
    card.value?.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === card.value || !card.value?.contains(active))) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (active === last || !card.value?.contains(active))) {
    e.preventDefault()
    first.focus()
  }
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  clearTimeout(fallback)
  if (props.open) setScrollLock('modal-lock', false)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="root"
      class="arena-modal"
      :class="[rootClass, { 'is-open': open, 'is-animating': animating }, modalClass]"
      :style="modalStyle"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!open"
      :aria-labelledby="labelledby"
      @transitionend="onMotionEnd"
      @animationend="onMotionEnd"
    >
      <div class="off-modal-backdrop" @click="emit('close')"></div>
      <article v-if="open" ref="card" class="off-modal-card" role="document" tabindex="-1">
        <span class="off-modal-stripe" aria-hidden="true"></span>
        <button type="button" class="off-modal-close" :aria-label="closeLabel" @click="emit('close')">
          <span aria-hidden="true">×</span>
        </button>
        <slot />
      </article>
    </div>
  </Teleport>
</template>
