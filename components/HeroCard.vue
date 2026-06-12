<script setup lang="ts">
const content = usePortfolio()
const { lang } = useLang()

const hero = computed(() => content.value.hero)

// Drop your photo at /public/portrait.jpg (or .png/.webp) and it shows here.
// If the file is missing the dashed placeholder is shown instead.
const portraitSrc = '/portrait.jpg'
const portraitMissing = ref(false)

// Localised CV links (Google Drive preview pages).
const cvUrls: Record<string, string> = {
  fr: 'https://drive.google.com/file/d/1vQ8PkOMx0fr-YoGacFOwWDQnWMThKFS2/view',
  en: 'https://drive.google.com/file/d/1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n/view',
  tr: 'https://drive.google.com/file/d/1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n/view',
}

function downloadCV() {
  window.open(cvUrls[lang.value] || cvUrls.fr, '_blank')
}
</script>

<template>
  <section class="hero" id="roster">
    <div class="hero-inner">
      <div class="hero-stage">
        <!-- BIG JERSEY NUMBER -->
        <div class="hero-number" aria-hidden="true">
          <span class="hero-number-glyph">{{ hero.number }}</span>
          <span class="hero-kanji-overlay">{{ hero.kanji }}</span>
        </div>

        <!-- NAME + POSITION -->
        <div class="hero-id">
          <h1 class="hero-name">
            <span>{{ hero.name1 }}</span>
            <span class="hero-name-stroke">{{ hero.name2 }}</span>
          </h1>
          <div class="hero-position">{{ hero.position }}</div>
          <div class="hero-team">{{ hero.team }}</div>
          <div class="hero-bio">{{ hero.bio }}</div>
        </div>

        <!-- PORTRAIT -->
        <div class="hero-portrait">
          <NuxtImg
            v-if="!portraitMissing"
            class="portrait-img"
            :src="portraitSrc"
            alt="Deniz OK"
            @error="portraitMissing = true"
            format="webp"
            quality="80"
          />
          <div v-else class="portrait-empty">
            Ajoutez votre photo&nbsp;: public/portrait.jpg
          </div>
          <div class="hero-portrait-cap">
            <span>PORTRAIT</span>
            <span class="dot dot-live"></span>
            <span>LIVE</span>
          </div>
        </div>
      </div>

      <!-- STAT BOX -->
      <div class="hero-stats">
        <div v-for="(s, i) in hero.stats" :key="i" class="stat">
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-sub">{{ s.sub }}</div>
        </div>
      </div>

      <!-- TALE OF THE TAPE -->
      <div class="hero-tape">
        <div v-for="(c, i) in hero.tale" :key="i" class="tape-cell">
          <span class="tape-k">{{ c.k }}</span>
          <span class="tape-v">{{ c.v }}</span>
        </div>
      </div>

      <!-- CTAs -->
      <div class="hero-cta">
        <a class="cta cta-primary" href="#matches">
          <span>{{ hero.cta1 }}</span> <span class="cta-arr">→</span>
        </a>
        <button class="cta cta-ghost" @click="downloadCV">
          <span>{{ hero.cta2 }}</span> <span class="cta-arr">↓</span>
        </button>
        <a class="cta cta-ghost" href="#contact">
          <span>{{ hero.cta3 }}</span> <span class="cta-arr">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>
