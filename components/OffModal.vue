<script setup lang="ts">
import type { OffItem } from '~/types/portfolio'

const props = defineProps<{
  item: OffItem | null
  index: number | null
  total: number
  eyebrow: string
}>()

const emit = defineEmits<{ close: [] }>()

const open = computed(() => props.item !== null)

type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

const blocks = computed<Block[]>(() => {
  const story = (props.item?.story || '').trim()
  if (!story) return []
  const bulletRe = /^[-•]\s+/
  const out: Block[] = []

  for (const raw of story.split(/\n{2,}/)) {
    const lines = raw.split(/\n/).map((l) => l.trim()).filter(Boolean)
    let prose: string[] = []
    const flush = () => {
      if (prose.length) {
        out.push({ type: 'p', text: prose.join(' ') })
        prose = []
      }
    }
    let i = 0
    while (i < lines.length) {
      if (bulletRe.test(lines[i])) {
        flush()
        const items: string[] = []
        while (i < lines.length && bulletRe.test(lines[i])) {
          items.push(lines[i].replace(bulletRe, ''))
          i++
        }
        out.push({ type: 'ul', items })
      } else {
        prose.push(lines[i])
        i++
      }
    }
    flush()
  }
  return out
})

const eyebrowText = computed(() => {
  if (props.index === null) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(props.index + 1)} / ${pad(props.total)} · ${props.eyebrow}`
})

// Lock body scroll + close on Escape while open.
watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('modal-lock', isOpen)
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  if (import.meta.client) document.documentElement.classList.remove('modal-lock')
})

const modalStyle = computed(() => {
  if (!props.item) return {}
  return {
    '--off-color': props.item.color,
    ...(props.item.colorAlt ? { '--off-color-alt': props.item.colorAlt } : {}),
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="off-modal"
      :class="{ 'is-open': open, 'has-alt': item?.colorAlt }"
      :style="modalStyle"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!open"
      aria-labelledby="offModalTitle"
    >
      <div class="off-modal-backdrop" @click="emit('close')"></div>
      <article v-if="item" class="off-modal-card" role="document">
        <span class="off-modal-stripe" aria-hidden="true"></span>
        <button type="button" class="off-modal-close" aria-label="Close" @click="emit('close')">
          <span aria-hidden="true">×</span>
        </button>
        <div class="off-modal-meta">
          <span class="off-modal-eyebrow">{{ eyebrowText }}</span>
        </div>
        <div class="off-modal-head">
          <span class="off-modal-kanji">{{ item.kanji }}</span>
          <div class="off-modal-roman">{{ item.roman }}</div>
          <h3 class="off-modal-title" id="offModalTitle">{{ item.label }}</h3>
          <div class="off-modal-role">{{ item.role }}</div>
          <p class="off-modal-desc">{{ item.desc }}</p>
        </div>
        <div class="off-modal-rule" aria-hidden="true"></div>
        <div class="off-modal-body">
          <template v-for="(b, i) in blocks" :key="i">
            <p v-if="b.type === 'p'" class="off-modal-p">{{ b.text }}</p>
            <ul v-else class="off-modal-list">
              <li v-for="(li, j) in b.items" :key="j">{{ li }}</li>
            </ul>
          </template>
        </div>
      </article>
    </div>
  </Teleport>
</template>
