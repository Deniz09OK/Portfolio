<script setup lang="ts">
import type { CaseStudyListSection, CaseStudySection } from '~/types/portfolio'

// Notes on retired HTB machines, under the HTB stats: one card (a button) per note, opening a modal that reuses the
// dialog frame of the off-court modal (ArenaModal) and the case study block of the project cards (CaseStudy).
const content = usePortfolio()
const notes = computed(() => content.value.htb.notes)

const active = ref<number | null>(null)
const note = computed(() => (active.value === null ? null : notes.value.notes[active.value] ?? null))

const diffClass = (d: string) => `htb-diff--${d.toLowerCase().replace(/[^a-z]/g, '')}`
const pad = (n: number) => String(n).padStart(2, '0')

const eyebrow = computed(() =>
  active.value === null ? '' : `${pad(active.value + 1)} / ${pad(notes.value.notes.length)} · ${notes.value.eyebrow}`,
)

const sections = computed<(CaseStudySection | CaseStudyListSection)[]>(() => {
  const n = note.value
  if (!n) return []
  const r = notes.value.rubrics
  return [
    { label: r.chain, items: n.chain, ordered: true },
    { label: r.flaws, items: n.flaws },
    ...(n.pitfalls.length ? [{ label: r.pitfalls, items: n.pitfalls }] : []),
    { label: r.defense, items: n.defense },
    { label: r.takeaway, text: n.takeaway },
  ]
})
</script>

<template>
  <section id="htb-notes" class="htb-notes" aria-labelledby="htbNotesTitle">
    <span class="htb-box-title htb-notes-label">{{ notes.label }}</span>
    <h3 id="htbNotesTitle" class="display-sub htb-notes-title">{{ notes.title }}</h3>
    <p class="htb-notes-credit">{{ notes.credit }}</p>

    <ul v-reveal class="htb-notes-grid">
      <li v-for="(n, i) in notes.notes" :key="n.id">
        <button type="button" class="htb-tile htb-note-card" aria-haspopup="dialog" @click="active = i">
          <span class="htb-name htb-note-box" lang="en">{{ n.box }}</span>
          <span class="htb-note-meta">
            <span v-if="n.difficulty" class="htb-diff" :class="diffClass(n.difficulty)" lang="en">{{ n.difficulty }}</span>
            <span class="htb-os" lang="en">{{ n.os }}</span>
          </span>
          <span class="htb-note-tags">
            <span v-for="k in n.keywords" :key="k" class="htb-flag" lang="en">{{ k }}</span>
          </span>
          <span class="off-cta">
            <span class="off-cta-label">{{ notes.cta }}</span>
            <span class="off-cta-arr" aria-hidden="true">→</span>
          </span>
        </button>
      </li>
    </ul>

    <ArenaModal
      :open="note !== null"
      labelledby="htbNoteModalTitle"
      :close-label="notes.closeLabel"
      root-class="htb-note-modal"
      @close="active = null"
    >
      <template v-if="note">
        <div class="off-modal-meta">
          <span class="off-modal-eyebrow">{{ eyebrow }}</span>
        </div>

        <div class="off-modal-head">
          <h3 id="htbNoteModalTitle" class="off-modal-title" lang="en">{{ note.box }}</h3>
          <div class="htb-note-meta">
            <span v-if="note.difficulty" class="htb-diff" :class="diffClass(note.difficulty)" lang="en">{{ note.difficulty }}</span>
            <span class="htb-os" lang="en">{{ note.os }}</span>
          </div>
          <div class="htb-note-tags">
            <span v-for="k in note.keywords" :key="k" class="htb-flag" lang="en">{{ k }}</span>
          </div>
        </div>

        <CaseStudy :sections="sections" class="htb-note-case" />
      </template>
    </ArenaModal>
  </section>
</template>
