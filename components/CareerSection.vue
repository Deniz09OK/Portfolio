<script setup lang="ts">
const content = usePortfolio()
const career = computed(() => content.value.career)
const edu = computed(() => content.value.edu)
const exp = computed(() => content.value.exp)
</script>

<template>
  <section class="career" id="career">
    <div class="container">
      <h2 class="display">{{ career.title }}</h2>

      <div class="career-grid">
        <div class="career-col">
          <div class="career-col-head">
            <span class="career-col-num">A</span>
            <h3>{{ career.eduLabel }}</h3>
          </div>
          <ol class="timeline">
            <li v-for="(it, i) in edu" :key="i" :class="{ 'is-current': it.current }">
              <div class="timeline-year">{{ it.year }}</div>
              <div class="timeline-school">{{ it.school }}</div>
              <div class="timeline-title">{{ it.title }}</div>
              <div class="timeline-desc">{{ it.desc }}</div>
            </li>
          </ol>
        </div>

        <div class="career-col">
          <div class="career-col-head">
            <span class="career-col-num">B</span>
            <h3>{{ career.expLabel }}</h3>
          </div>
          <ol class="timeline">
            <li v-for="(it, i) in exp" :key="i" :class="{ 'is-current': it.current }">
              <div class="timeline-year">{{ it.year }}</div>
              <div class="timeline-school">{{ it.company }}</div>
              <div class="timeline-title">{{ it.title }}</div>
              <div class="timeline-desc">{{ it.desc }}</div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
