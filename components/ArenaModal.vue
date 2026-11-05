<script setup lang="ts">
// Dialog frame shared by the off-court modal and the HTB notes modal: backdrop, close button, focus moved into the
// dialog and given back on close, Tab / Shift+Tab kept inside, Escape to close, page scroll locked while open.
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

const card = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null

// Lock body scroll, move focus into the dialog and give it back to the opener on close.
watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('modal-lock', isOpen)
    if (isOpen) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
      await nextTick()
      card.value?.focus({ preventScroll: true })
    } else {
      if (opener?.isConnected) opener.focus()
      opener = null
    }
  },
)

function focusables(): HTMLElement[] {
  if (!card.value) return []
  return Array.from(
    card.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
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
  if (import.meta.client && props.open) document.documentElement.classList.remove('modal-lock')
})
</script>

<template>
  <Teleport to="body">
    <div
      class="arena-modal"
      :class="[rootClass, { 'is-open': open }, modalClass]"
      :style="modalStyle"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!open"
      :aria-labelledby="labelledby"
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
