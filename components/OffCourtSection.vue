<script setup lang="ts">
const content = usePortfolio()
const off = computed(() => content.value.off)

const openIndex = ref<number | null>(null)
function open(i: number) {
  openIndex.value = i
}
function close() {
  openIndex.value = null
}
</script>

<template>
  <section class="off" id="off">
    <div class="container">
      <h2 class="display">{{ off.title }}</h2>
      <p class="display-sub">{{ off.sub }}</p>

      <div class="off-grid">
        <button
          v-for="(it, i) in off.items"
          :key="it.id"
          v-reveal
          type="button"
          class="off-card"
          :class="{ 'has-alt': it.colorAlt }"
          :style="{
            '--off-color': it.color,
            ...(it.colorAlt ? { '--off-color-alt': it.colorAlt } : {}),
          }"
          :aria-label="`${it.label} — ${off.cta}`"
          aria-haspopup="dialog"
          @click="open(i)"
        >
          <span class="off-kanji">{{ it.kanji }}</span>
          <div class="off-roman">{{ it.roman }}</div>
          <div class="off-label">{{ it.label }}</div>
          <div class="off-role">{{ it.role }}</div>
          <p class="off-desc">{{ it.desc }}</p>
          <span class="off-cta">
            <span class="off-cta-label">{{ off.cta }}</span>
            <span class="off-cta-arr" aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </div>

    <OffModal
      :item="openIndex !== null ? off.items[openIndex] : null"
      :index="openIndex"
      :total="off.items.length"
      :eyebrow="off.title"
      @close="close"
    />
  </section>
</template>
