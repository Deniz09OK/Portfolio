<script setup lang="ts">
import type { CaseStudyListSection, CaseStudySection } from '~/types/portfolio'

// Notes on retired HTB machines, under the HTB stats: one card (a button) per note, opening a modal that reuses the
// dialog frame of the off-court modal (ArenaModal) and the case study block of the project cards (CaseStudy).
//
// The retired notes (the real write-ups, kill-chain included) sit behind the invite-code challenge: see
// composables/useHtbChallenge.ts, plugins/htb-console.client.ts and HtbTerminalModal.vue. Active machines (below)
// are never gated: they only ever show skills and concepts, never a chain or a flag, so there is nothing to protect.
const content = usePortfolio()
const notes = computed(() => content.value.htb.notes)
const challenge = computed(() => content.value.htb.challenge)

const { unlocked, reset } = useHtbUnlock()

const active = ref<number | null>(null)
const note = computed(() => (active.value === null ? null : notes.value.notes[active.value] ?? null))

// A locked click opens the terminal instead of the note; the note itself opens once the terminal closes
// (after a successful code, or the recruiter's fast-unlock), so only one modal is ever on screen at a time.
const terminalOpen = ref(false)
const pendingIndex = ref<number | null>(null)
function openNote(i: number) {
  if (!unlocked.value) {
    pendingIndex.value = i
    terminalOpen.value = true
    return
  }
  active.value = i
}
function onTerminalClose(granted?: boolean) {
  terminalOpen.value = false
  // Only hand off to the note if the terminal closed because access was actually granted (a solved code, or the
  // recruiter's fast-unlock) — dismissing the restricted terminal with Escape or the backdrop must not open it.
  if (pendingIndex.value !== null && granted) {
    active.value = pendingIndex.value
  }
  pendingIndex.value = null
}

const activeBox = ref<number | null>(null)
const activeBoxNote = computed(() => (activeBox.value === null ? null : notes.value.activeNotes[activeBox.value] ?? null))

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

const activeBoxSections = computed<(CaseStudyListSection | CaseStudySection)[]>(() => {
  const n = activeBoxNote.value
  if (!n) return []
  const r = notes.value.rubrics
  return [
    { label: r.skills, items: n.skills },
    { label: r.concepts, items: n.concepts },
    { label: r.takeaway, text: n.takeaway },
  ]
})
</script>

<template>
  <section id="htb-notes" class="htb-notes" aria-labelledby="htbNotesTitle" data-allow-mismatch="children">
    <span class="htb-box-title htb-notes-label">{{ notes.label }}</span>
    <h3 id="htbNotesTitle" class="display-sub htb-notes-title">{{ notes.title }}</h3>
    <!-- unlocked depends on a cookie: on this prerendered (not per-visit SSR) site, a returning visitor's real
         cookie only exists client-side, so these two elements legitimately differ from the always-locked
         prerendered HTML. data-allow-mismatch (Vue 3.5+) tells the hydration diff that's expected, instead of
         logging a console warning for something that isn't a bug. -->
    <p class="htb-notes-credit" data-allow-mismatch="children">
      {{ notes.credit }}
      <span v-if="unlocked" class="htb-pwned-badge">{{ challenge.pwnedBadge }}</span>
    </p>
    <button v-if="unlocked" type="button" class="htb-challenge-reset" @click="reset">{{ challenge.resetButton }}</button>

    <ul v-reveal class="htb-notes-grid">
      <li v-for="(n, i) in notes.notes" :key="n.id">
        <button type="button" class="htb-tile htb-note-card" aria-haspopup="dialog" @click="openNote(i)">
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

    <HtbTerminalModal :open="terminalOpen" @close="onTerminalClose" />

    <section v-if="notes.activeNotes.length" class="htb-active-boxes" aria-labelledby="htbActiveTitle">
      <span class="htb-box-title htb-notes-label">{{ notes.activeLabel }}</span>
      <h4 id="htbActiveTitle" class="htb-notes-active-title">{{ notes.activeTitle }}</h4>

      <ul v-reveal class="htb-notes-grid">
        <li v-for="(n, i) in notes.activeNotes" :key="n.id">
          <button type="button" class="htb-tile htb-note-card" aria-haspopup="dialog" @click="activeBox = i">
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
        :open="activeBoxNote !== null"
        labelledby="htbActiveModalTitle"
        :close-label="notes.closeLabel"
        root-class="htb-active-note-modal"
        @close="activeBox = null"
      >
        <template v-if="activeBoxNote">
          <div class="off-modal-head">
            <h3 id="htbActiveModalTitle" class="off-modal-title" lang="en">{{ activeBoxNote.box }}</h3>
            <div class="htb-note-meta">
              <span v-if="activeBoxNote.difficulty" class="htb-diff" :class="diffClass(activeBoxNote.difficulty)" lang="en">{{ activeBoxNote.difficulty }}</span>
              <span class="htb-os" lang="en">{{ activeBoxNote.os }}</span>
            </div>
            <div class="htb-note-tags">
              <span v-for="k in activeBoxNote.keywords" :key="k" class="htb-flag" lang="en">{{ k }}</span>
            </div>
          </div>

          <CaseStudy :sections="activeBoxSections" class="htb-note-case" />
        </template>
      </ArenaModal>
    </section>
  </section>
</template>
