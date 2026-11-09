<script setup lang="ts">
import type { LangCode } from '~/types/portfolio'
import type { ScoreboardEntry } from '~/shared/htb-scoreboard'
import { pseudoError } from '~/shared/htb-scoreboard'

// Terminal d'accès des notes HTB : affiché tant que le challenge n'est pas résolu (voir HtbNotes.vue). Le code
// se trouve dans la vraie console du navigateur (plugins/htb-console.client.ts) ; cette modale ne fait que
// vérifier ce que le visiteur y a trouvé, afficher le chronomètre et, une fois le code bon, proposer d'inscrire
// son temps au Hall of Fame. Le cadre (focus, Échap, defilement verrouillé) vient d'ArenaModal.
const props = defineProps<{ open: boolean }>()
// `granted` tells HtbNotes.vue whether to hand off to the note that was originally clicked: true once access
// was actually granted (a solved code, or the recruiter's fast-unlock), never on an abandoned Escape/backdrop
// close. Passed directly rather than left for the caller to re-derive from the unlock cookie: useCookie() gives
// each component its own ref, and the write made here would not be visible synchronously to HtbNotes' own.
const emit = defineEmits<{ close: [granted?: boolean] }>()

const content = usePortfolio()
const { lang } = useLang()
const t = computed(() => content.value.htb.challenge)

const { unlock } = useHtbUnlock()

// Sous ce seuil, pas de clavier physique fiable pour F12 : l'indice console serait un cul-de-sac, on pointe
// directement vers le bouton de déverrouillage recruteur à la place (cf. décision mobile/tablette du 2026-11-08).
const MOBILE_QUERY = '(max-width: 920px)'
const isMobile = ref(false)
let mobileQuery: MediaQueryList | undefined
function syncIsMobile() {
  isMobile.value = mobileQuery?.matches ?? false
}
onMounted(() => {
  mobileQuery = window.matchMedia(MOBILE_QUERY)
  syncIsMobile()
  mobileQuery.addEventListener('change', syncIsMobile)
})
onBeforeUnmount(() => mobileQuery?.removeEventListener('change', syncIsMobile))

const hintText = computed(() => (isMobile.value ? t.value.hintMobile : t.value.hint))

const ACCESS_CODE = 'HTB-DENIZ-PWN3D-2027'

type Phase = 'locked' | 'granted'
const phase = ref<Phase>('locked')
const code = ref('')
const codeInvalid = ref(false)
const codeInput = ref<HTMLInputElement | null>(null)

// Chrono affiché en direct tant que la modale est ouverte et verrouillée : un setInterval local (pas de boucle de
// fond quand la modale est fermée), relu depuis l'état partagé démarré par la console.
const liveElapsed = ref(0)
let liveTimer: ReturnType<typeof setInterval> | undefined
function stopLiveTimer() {
  clearInterval(liveTimer)
  liveTimer = undefined
}
function startLiveTimer() {
  stopLiveTimer()
  liveElapsed.value = htbElapsedMs()
  liveTimer = setInterval(() => { liveElapsed.value = htbElapsedMs() }, 97)
}
const finalElapsedMs = ref(0)

const pseudo = ref('')
const pseudoInput = ref<HTMLInputElement | null>(null)
const submitError = ref<'shape' | 'profanity' | 'spam' | null>(null)
const submitting = ref(false)
const scoreSaved = ref(false)
const scoreboard = ref<ScoreboardEntry[] | null>(null)
const scoreboardOffline = ref(false)

watch(
  () => props.open,
  async (isOpen) => {
    stopLiveTimer()
    if (!isOpen) return
    phase.value = 'locked'
    code.value = ''
    codeInvalid.value = false
    pseudo.value = ''
    submitError.value = null
    submitting.value = false
    scoreSaved.value = false
    scoreboard.value = null
    scoreboardOffline.value = false
    // Toujours démarré, même si le chrono n'a pas encore commencé (0 affiché) : le visiteur peut ouvrir la
    // console et lancer HTB.help() après avoir ouvert cette modale, le chrono doit alors apparaître sans qu'il
    // ait besoin de la refermer et la rouvrir.
    startLiveTimer()
    await nextTick()
    codeInput.value?.focus()
  },
)
onBeforeUnmount(stopLiveTimer)

function submitCode() {
  if (code.value.trim().toUpperCase() !== ACCESS_CODE) {
    codeInvalid.value = true
    return
  }
  codeInvalid.value = false
  stopLiveTimer()
  finalElapsedMs.value = htbTimerRunning() ? stopHtbTimer() : 0
  phase.value = 'granted'
  unlock()
  loadScoreboard()
  nextTick(() => pseudoInput.value?.focus())
}

function fastUnlock() {
  resetHtbTimer()
  unlock()
  emit('close', true)
}

async function loadScoreboard() {
  try {
    scoreboard.value = await $fetch<ScoreboardEntry[]>('/api/scoreboard')
    scoreboardOffline.value = false
  } catch {
    scoreboard.value = null
    scoreboardOffline.value = true
  }
}

function fetchErrorReason(e: unknown): string | undefined {
  const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
  return err?.data?.statusMessage ?? err?.statusMessage
}

async function submitScore() {
  submitError.value = null
  const shapeErr = pseudoError(pseudo.value.trim())
  if (shapeErr) {
    submitError.value = shapeErr === 'profanity' ? 'profanity' : 'shape'
    return
  }
  submitting.value = true
  try {
    scoreboard.value = await $fetch<ScoreboardEntry[]>('/api/scoreboard', {
      method: 'POST',
      body: { pseudo: pseudo.value.trim(), timeMs: finalElapsedMs.value },
    })
    scoreSaved.value = true
    scoreboardOffline.value = false
  } catch (e) {
    const reason = fetchErrorReason(e)
    if (reason === 'profanity') submitError.value = 'profanity'
    else if (reason === 'shape' || reason === 'time-too-fast' || reason === 'time-too-slow') submitError.value = 'shape'
    else if (reason === 'spam') submitError.value = 'spam'
    // Aucun motif reconnu (ex. 404) : le site publié est statique, sans API déployée — mode hors-ligne.
    else scoreboardOffline.value = true
  } finally {
    submitting.value = false
  }
}

function skipSave() {
  emit('close', true)
}

const elapsedLabel = computed(() => formatElapsed(phase.value === 'granted' ? finalElapsedMs.value : liveElapsed.value))

const LOCALES: Record<LangCode, string> = { fr: 'fr-FR', en: 'en-GB', tr: 'tr-TR' }
function entryDate(iso: string) {
  return new Intl.DateTimeFormat(LOCALES[lang.value], { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(iso))
}
</script>

<template>
  <ArenaModal
    :open="open"
    labelledby="htbTerminalTitle"
    :close-label="t.closeLabel"
    root-class="htb-terminal-modal"
    @close="emit('close', phase === 'granted')"
  >
    <div class="htb-terminal">
      <template v-if="phase === 'locked'">
        <h3 id="htbTerminalTitle" class="htb-terminal-head">{{ t.restrictedTitle }}</h3>
        <p class="htb-terminal-hint">{{ hintText }}</p>
        <p v-if="liveElapsed > 0" class="htb-terminal-chrono" role="status">{{ elapsedLabel }}</p>

        <form class="htb-terminal-form" @submit.prevent="submitCode">
          <label class="htb-terminal-label" for="htbCode">{{ t.codeLabel }}</label>
          <div class="htb-terminal-row">
            <input
              id="htbCode"
              ref="codeInput"
              v-model="code"
              type="text"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              class="htb-terminal-input"
              :class="{ 'is-invalid': codeInvalid }"
              :placeholder="t.codePlaceholder"
              :aria-invalid="codeInvalid"
              aria-describedby="htbCodeError"
            />
            <button type="submit" class="htb-terminal-submit">{{ t.submit }}</button>
          </div>
          <p id="htbCodeError" class="htb-terminal-error" role="alert">{{ codeInvalid ? t.invalidCode : '' }}</p>
        </form>

        <button type="button" class="htb-terminal-fast" @click="fastUnlock">{{ t.fastUnlock }}</button>
      </template>

      <template v-else>
        <h3 id="htbTerminalTitle" class="htb-terminal-head htb-terminal-head--granted">{{ t.grantedTitle }}</h3>
        <p class="htb-terminal-chrono htb-terminal-chrono--final">
          <span class="htb-terminal-chrono-k">{{ t.elapsedLabel }}</span> {{ elapsedLabel }}
        </p>

        <form v-if="!scoreSaved" class="htb-terminal-form" @submit.prevent="submitScore">
          <label class="htb-terminal-label" for="htbPseudo">{{ t.pseudoLabel }}</label>
          <div class="htb-terminal-row">
            <input
              id="htbPseudo"
              ref="pseudoInput"
              v-model="pseudo"
              type="text"
              maxlength="16"
              autocomplete="off"
              class="htb-terminal-input"
              :class="{ 'is-invalid': submitError }"
              :placeholder="t.pseudoPlaceholder"
              :aria-invalid="!!submitError"
              aria-describedby="htbPseudoError"
            />
            <button type="submit" class="htb-terminal-submit" :disabled="submitting">{{ t.saveScore }}</button>
          </div>
          <p id="htbPseudoError" class="htb-terminal-error" role="alert">
            {{ submitError === 'profanity' ? t.rejectedProfanity : submitError === 'spam' ? t.rejectedSpam : submitError === 'shape' ? t.rejectedShape : '' }}
          </p>
          <button type="button" class="htb-terminal-fast" @click="skipSave">{{ t.skipSave }}</button>
        </form>
        <p v-else class="htb-terminal-saved" role="status">{{ t.savedLocally }}</p>

        <div class="htb-scoreboard-wrap">
          <h4 class="htb-box-title">{{ t.scoreboardTitle }}</h4>
          <p v-if="scoreboardOffline" class="htb-scoreboard-offline">{{ t.scoreboardOffline }}</p>
          <table v-else-if="scoreboard && scoreboard.length" class="htb-scoreboard">
            <caption class="visually-hidden">{{ t.scoreboardTitle }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ t.colRank }}</th>
                <th scope="col">{{ t.colPseudo }}</th>
                <th scope="col">{{ t.colTime }}</th>
                <th scope="col">{{ t.colDate }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(e, i) in scoreboard" :key="`${e.pseudo}-${e.date}`">
                <td>{{ i + 1 }}</td>
                <td>{{ e.pseudo }}</td>
                <td class="htb-scoreboard-time">{{ formatElapsed(e.timeMs) }}</td>
                <td>{{ entryDate(e.date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </ArenaModal>
</template>
