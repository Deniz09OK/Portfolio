<script setup lang="ts">
const PLAYLIST_ID = useRuntimeConfig().public.playlistId

const content = usePortfolio()
const label = computed(() => content.value.nav.music)

const open = ref(false)
const isPlaying = ref(false)
const trackTitle = ref('')
const trackArtist = ref('')
const progress = ref(0)

const playerHost = ref<HTMLElement | null>(null)
let player: any = null
let progressTimer: ReturnType<typeof setInterval> | null = null

// Lazily load the YouTube IFrame Player API so we can enable shuffle via setShuffle().
function loadYouTubeApi(): Promise<any> {
  const w = window as any
  if (w.YT?.Player) return Promise.resolve(w.YT)
  return new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(w.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
}

function updateTrackInfo() {
  const data = player?.getVideoData?.()
  trackTitle.value = data?.title || ''
  trackArtist.value = data?.author || ''
}

function startProgressTimer() {
  stopProgressTimer()
  progressTimer = setInterval(() => {
    const duration = player?.getDuration?.() || 0
    const current = player?.getCurrentTime?.() || 0
    progress.value = duration > 0 ? (current / duration) * 100 : 0
  }, 500)
}

function stopProgressTimer() {
  if (progressTimer) clearInterval(progressTimer)
  progressTimer = null
}

async function ensurePlayer() {
  if (player) return player
  const YT = await loadYouTubeApi()
  if (!playerHost.value) return null
  return new Promise((resolve) => {
    player = new YT.Player(playerHost.value, {
      width: '100%',
      height: '100%',
      playerVars: { listType: 'playlist', list: PLAYLIST_ID, autoplay: 1 },
      events: {
        onReady: (e: any) => {
          e.target.setShuffle(true)
          e.target.playVideo()
          resolve(player)
        },
        onStateChange: (e: any) => {
          const YTNS = (window as any).YT
          isPlaying.value = e.data === YTNS.PlayerState.PLAYING
          if (isPlaying.value) {
            updateTrackInfo()
            startProgressTimer()
          } else {
            stopProgressTimer()
          }
        },
      },
    })
  })
}

async function setOpen(value: boolean) {
  open.value = value
  if (value) await ensurePlayer().then((p) => p?.playVideo?.())
  else player?.pauseVideo?.()
}

function toggle() {
  setOpen(!open.value)
}

async function playPause() {
  if (!player) {
    await setOpen(true)
    return
  }
  if (isPlaying.value) player.pauseVideo()
  else player.playVideo()
}

function prevTrack() {
  player?.previousVideo?.()
}

function nextTrack() {
  player?.nextVideo?.()
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) setOpen(false)
}

// Drag the panel by its header. Switches from the default bottom-right
// anchoring to absolute left/top positioning on the first drag.
const panel = ref<HTMLElement | null>(null)
let dragOffsetX = 0
let dragOffsetY = 0

function startDrag(e: PointerEvent) {
  const el = panel.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  dragOffsetX = e.clientX - rect.left
  dragOffsetY = e.clientY - rect.top
  el.style.left = `${rect.left}px`
  el.style.top = `${rect.top}px`
  el.style.right = 'auto'
  el.style.bottom = 'auto'
  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', stopDrag)
}

function onDrag(e: PointerEvent) {
  const el = panel.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = Math.min(Math.max(0, e.clientX - dragOffsetX), window.innerWidth - rect.width)
  const y = Math.min(Math.max(0, e.clientY - dragOffsetY), window.innerHeight - rect.height)
  el.style.left = `${x}px`
  el.style.top = `${y}px`
}

function stopDrag() {
  window.removeEventListener('pointermove', onDrag)
  window.removeEventListener('pointerup', stopDrag)
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  stopDrag()
  stopProgressTimer()
  player?.destroy?.()
})
</script>

<template>
  <div class="music-player" :class="{ 'is-open': open }">
    <div ref="panel" class="music-panel" role="dialog" :aria-label="label" :aria-hidden="!open">
      <div class="music-panel-head" @pointerdown="startDrag">
        <span class="music-panel-title">{{ label }}</span>
      </div>
      <div class="music-panel-frame">
        <div class="music-now">
          <div class="music-now-meta">
            <div class="music-now-title">{{ trackTitle || '—' }}</div>
            <div class="music-now-artist">{{ trackArtist }}</div>
          </div>
          <div class="music-now-progress">
            <div class="music-now-progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="music-now-controls">
            <button type="button" aria-label="Previous" @click="prevTrack">⏮</button>
            <button type="button" aria-label="Play/Pause" @click="playPause">
              {{ isPlaying ? '⏸' : '▶' }}
            </button>
            <button type="button" aria-label="Next" @click="nextTrack">⏭</button>
          </div>
        </div>
        <div class="music-yt-host">
          <div ref="playerHost"></div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="music-toggle"
      :aria-label="label"
      :aria-expanded="open"
      @click="toggle"
    >
      <span aria-hidden="true">{{ open ? '×' : '♪' }}</span>
    </button>
  </div>
</template>
