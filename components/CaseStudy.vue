<script setup lang="ts">
import type { CaseStudyListSection, CaseStudySection } from '~/types/portfolio'

// Case study of a project card, also used in the body of the HTB notes modal.
// A section holds a text, or a list of items (CaseStudyListSection, numbered when `ordered`).
defineProps<{ sections: (CaseStudySection | CaseStudyListSection)[] }>()
</script>

<template>
  <dl class="match-case">
    <div v-for="(c, k) in sections" :key="k" class="match-case-row">
      <dt class="match-case-label">{{ c.label }}</dt>
      <dd v-if="'items' in c" class="match-case-text">
        <ol v-if="c.ordered" class="match-case-list match-case-list--ordered">
          <li v-for="(item, i) in c.items" :key="i">{{ item }}</li>
        </ol>
        <ul v-else class="match-case-list">
          <li v-for="(item, i) in c.items" :key="i">{{ item }}</li>
        </ul>
      </dd>
      <dd v-else class="match-case-text">{{ c.text }}</dd>
    </div>
  </dl>
</template>
